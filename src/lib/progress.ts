export interface Attempt {id:string;item:string;track:string;kind:'quiz'|'sql'|'incident';correct:boolean;at:string;assisted:boolean;dialect?:string}
export interface Review {due:string;interval:number;correct:number;wrong:number}
export interface Progress {version:1;name:string;goal:number;attempts:Attempt[];reviews:Record<string,Review>;bookmarks:string[];projectSteps:string[];notes:Record<string,string>;drafts:Record<string,string>}
export const fresh=():Progress=>({version:1,name:'Engineer',goal:3,attempts:[],reviews:{},bookmarks:[],projectSteps:[],notes:{},drafts:{}});
export function dayKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function validateProgress(value:unknown):Progress {
 if(!value||typeof value!=='object')throw new Error('Not a Dataforge backup.');
 const p=value as Progress;
 if(p.version!==1||typeof p.name!=='string'||p.name.length>60||!Number.isInteger(p.goal)||p.goal<1||p.goal>20||!Array.isArray(p.attempts)||p.attempts.length>50000)throw new Error('Unsupported or invalid backup format.');
 for(const a of p.attempts)if(!a||typeof a.id!=='string'||typeof a.item!=='string'||typeof a.track!=='string'||!['quiz','sql','incident'].includes(a.kind)||typeof a.correct!=='boolean'||typeof a.assisted!=='boolean'||typeof a.at!=='string'||!Number.isFinite(Date.parse(a.at)))throw new Error('Invalid attempt in backup.');
 for(const key of ['bookmarks','projectSteps'] as const)if(!Array.isArray(p[key])||!p[key].every(x=>typeof x==='string'&&x.length<200))throw new Error('Invalid saved list.');
 for(const key of ['notes','drafts'] as const)if(!p[key]||typeof p[key]!=='object'||Array.isArray(p[key])||Object.entries(p[key]).some(([k,v])=>['__proto__','constructor','prototype'].includes(k)||typeof v!=='string'||v.length>20000))throw new Error('Invalid saved text.');
 if(!p.reviews||typeof p.reviews!=='object'||Array.isArray(p.reviews))throw new Error('Invalid review schedule.');
 for(const [k,r] of Object.entries(p.reviews))if(['__proto__','constructor','prototype'].includes(k)||!r||!Number.isFinite(Date.parse(r.due))||![r.interval,r.correct,r.wrong].every(x=>Number.isFinite(x)&&x>=0))throw new Error('Invalid review entry.');
 return p;
}
export function record(p:Progress,entry:Omit<Attempt,'id'|'at'>,now=new Date()):Progress{
 const previous=p.reviews[entry.item]||{interval:0,correct:0,wrong:0,due:now.toISOString()};
 const interval=entry.correct&&!entry.assisted?Math.min(previous.interval?previous.interval*2:1,30):0;
 const due=new Date(now.getTime()+(interval?interval*86400000:600000));
 return {...p,attempts:[...p.attempts,{...entry,id:crypto.randomUUID(),at:now.toISOString()}],reviews:{...p.reviews,[entry.item]:{due:due.toISOString(),interval,correct:previous.correct+Number(entry.correct),wrong:previous.wrong+Number(!entry.correct)}}};
}
export function stats(p:Progress,now=new Date()){
 const solved=new Set(p.attempts.filter(a=>a.correct&&!a.assisted).map(a=>a.item));
 const xp=[...solved].reduce((n,id)=>n+(p.attempts.find(a=>a.item===id)?.kind==='sql'?50:p.attempts.find(a=>a.item===id)?.kind==='incident'?60:20),0);
 const dates=new Set(p.attempts.map(a=>dayKey(new Date(a.at))));
 const cursor=new Date(now);let streak=0;if(!dates.has(dayKey(cursor)))cursor.setDate(cursor.getDate()-1);
 while(dates.has(dayKey(cursor))){streak++;cursor.setDate(cursor.getDate()-1);}
 const today=p.attempts.filter(a=>dayKey(new Date(a.at))===dayKey(now)).length;
 return {solved,xp,streak,today,level:Math.floor(xp/400)+1,due:Object.entries(p.reviews).filter(([,r])=>Date.parse(r.due)<=now.getTime()).map(([id])=>id)};
}
export function pickQuestions<T extends {id:string;track:string}>(questions:T[],p:Progress,limit=5,now=new Date()):T[]{
 const seen=new Set(p.attempts.map(a=>a.item)); const due=new Set(stats(p,now).due);
 const hash=(s:string)=>Array.from(s).reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,5381);
 const day=dayKey(now);
 return [...questions].sort((a,b)=>{
 const rank=(q:T)=>due.has(q.id)?0:!seen.has(q.id)?1:2;
 return rank(a)-rank(b)||hash(day+a.id)-hash(day+b.id);
 }).slice(0,limit);
}
