import {validateProgress} from '../src/lib/progress';
type Statement={bind:(...args:unknown[])=>Statement;first:<T>()=>Promise<T|null>};
export type CloudEnvironment={DB:{prepare:(sql:string)=>Statement};ASSETS:{fetch:(r:Request)=>Promise<Response>}};
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','Vary':'Cookie','X-Content-Type-Options':'nosniff'}});
export async function handleProgress(request:Request,env:CloudEnvironment):Promise<Response>{
 const user=request.headers.get('oai-authenticated-user-id');if(!user)return json({error:'Sign in to use account sync.'},401);
 if(!env.DB)return json({error:'Account storage is not provisioned yet.'},503);
 if(request.method==='GET'){const row=await env.DB.prepare('SELECT revision,payload,updated_at FROM user_progress WHERE user_id = ?').bind(user).first<{revision:number;payload:string;updated_at:string}>();return json(row?{revision:row.revision,progress:JSON.parse(row.payload),updatedAt:row.updated_at}:{revision:0,progress:null});}
 if(request.method!=='POST')return json({error:'Method not allowed.'},405);
 const origin=request.headers.get('Origin');if(!origin||origin!==new URL(request.url).origin)return json({error:'Same-origin save required.'},403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'Use application/json.'},415);
 if(Number(request.headers.get('Content-Length'))>2_000_000)return json({error:'Progress exceeds the 2 MB sync limit. Export an archive first.'},413);
 const text=await request.text();if(new TextEncoder().encode(text).byteLength>2_000_000)return json({error:'Progress exceeds the 2 MB sync limit.'},413);
 let input:{revision:number;progress:unknown};let progress;try{input=JSON.parse(text);if(!Number.isInteger(input.revision)||input.revision<0)throw new Error('Invalid revision.');progress=validateProgress(input.progress);}catch{return json({error:'Invalid progress snapshot.'},400);}
 const now=new Date().toISOString(),payload=JSON.stringify(progress);
 const result=input.revision===0?await env.DB.prepare('INSERT INTO user_progress (user_id,revision,payload,updated_at) VALUES (?,1,?,?) ON CONFLICT(user_id) DO NOTHING RETURNING revision').bind(user,payload,now).first<{revision:number}>():await env.DB.prepare('UPDATE user_progress SET revision = revision + 1,payload = ?,updated_at = ? WHERE user_id = ? AND revision = ? RETURNING revision').bind(payload,now,user,input.revision).first<{revision:number}>();
 if(!result)return json({error:'Another device saved newer progress. Load it and merge before saving again.',code:'revision-conflict'},409);
 return json({revision:result.revision,updatedAt:now});
}
export default {async fetch(request:Request,env:CloudEnvironment){try{const url=new URL(request.url);if(url.pathname==='/api/progress')return await handleProgress(request,env);if(url.pathname.startsWith('/api/'))return json({error:'Route not found.'},404);return env.ASSETS.fetch(request);}catch{return json({error:'Account sync is temporarily unavailable. Your local progress is preserved.'},503);}}};
