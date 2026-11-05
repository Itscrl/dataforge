import http from 'node:http';
import {randomUUID,timingSafeEqual} from 'node:crypto';
import {answerSchema,validateInput,groundedMessages,validateAnswer} from './rag/contract.mjs';
const host=process.env.TUTOR_HOST||'127.0.0.1',port=Number(process.env.TUTOR_PORT||8787);
const origin=process.env.APP_ORIGIN||'http://localhost:5173';
const provider=process.env.LLAMA_PROVIDER||'ollama',model=process.env.LLAMA_MODEL||'llama3.1:8b';
const base=(process.env.LLAMA_BASE_URL||(provider==='ollama'?'http://127.0.0.1:11434':'')).replace(/\/$/,'');
const key=process.env.LLAMA_API_KEY,accessToken=process.env.TUTOR_ACCESS_TOKEN;
if(!['127.0.0.1','localhost','::1'].includes(host)&&!accessToken)throw new Error('Non-loopback deployment requires TUTOR_ACCESS_TOKEN and authenticated HTTPS access.');
let active=0;const totals={requests:0,rejected:0,completed:0};
function authorize(header){if(!accessToken)return true;const a=Buffer.from(header||''),b=Buffer.from('Bearer '+accessToken);return a.length===b.length&&timingSafeEqual(a,b);}
async function modelStatus(){if(!base)return {ready:false,reason:'Provider is not configured.'};try{const response=await fetch(base+(provider==='ollama'?'/api/tags':'/models'),{headers:key?{Authorization:'Bearer '+key}:{},signal:AbortSignal.timeout(4000)});if(!response.ok)return {ready:false,reason:`Provider returned ${response.status}.`};const result=await response.json();const names=provider==='ollama'?(result.models||[]).map(m=>m.name):(result.data||[]).map(m=>m.id);const ready=names.includes(model)||names.includes(model+':latest');return {ready,reason:ready?'Configured model is available.':'The configured model was not found at this provider.'};}catch{return {ready:false,reason:'Model service is unreachable.'};}}
async function generate(input,signal){
 const messages=groundedMessages(input.question,input.evidence);
 const payload={model,messages,stream:false,...(provider==='ollama'?{format:answerSchema,options:{temperature:0,num_predict:1800}}:{temperature:0,max_tokens:1800,response_format:{type:'json_schema',json_schema:{name:'source_grounded_tutor',strict:true,schema:answerSchema}}})};
 const response=await fetch(base+(provider==='ollama'?'/api/chat':'/chat/completions'),{method:'POST',headers:{'Content-Type':'application/json',...(key?{Authorization:'Bearer '+key}:{})},body:JSON.stringify(payload),signal});
 if(!response.ok)throw new Error(`Provider returned ${response.status}. Verify model and structured-output support.`);
 const data=await response.json();const raw=provider==='ollama'?data.message?.content:data.choices?.[0]?.message?.content;
 if(typeof raw!=='string'||raw.length>30000)throw new Error('Provider returned an invalid answer.');return raw;
}
export const server=http.createServer(async(req,res)=>{
 const started=performance.now(),requestId=randomUUID();let ownsSlot=false;
 res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');res.setHeader('X-Request-ID',requestId);
 if(req.headers.origin===origin){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');}
 const send=(status,data)=>{res.statusCode=status;res.end(JSON.stringify({...data,requestId}));};
 try{
  if(req.headers.origin&&req.headers.origin!==origin)return send(403,{error:'Origin is not allowed.'});
  if(req.method==='OPTIONS'){res.statusCode=204;return res.end();}
  if(!authorize(req.headers.authorization))return send(401,{error:'Tutor authorization required.'});
  if(req.url==='/health'&&req.method==='GET')return send(200,{provider,model,...await modelStatus(),active,totals});
  if(req.url!=='/api/tutor'||req.method!=='POST')return send(404,{error:'Route not found.'});
  totals.requests++;
  if(active>=1){totals.rejected++;return send(429,{error:'The tutor is handling another request. Try again shortly.'});}
  active++;ownsSlot=true;
  let body='';const readTimer=setTimeout(()=>req.destroy(),15000);
  try{for await(const bytes of req){body+=bytes;if(Buffer.byteLength(body)>64000)return send(413,{error:'Request exceeds 64 KB.'});}}finally{clearTimeout(readTimer);}
  let input;try{input=validateInput(JSON.parse(body));}catch(error){return send(400,{error:error.message});}
  if(!base)return send(503,{error:'Configure a model provider before asking for generated answers.'});
  const deadline=AbortSignal.timeout(120000);const modelStarted=performance.now();const raw=await generate(input,deadline);const modelMs=Math.round(performance.now()-modelStarted);
  let result;try{result=validateAnswer(raw,input.evidence);}catch(error){totals.rejected++;return send(422,{error:error.message,code:'citation-validation-failed',trace:{stage:'validate',modelMs}});}
  totals.completed++;return send(200,{...result,model,trace:{stages:['validate-request','build-evidence-context','generate-structured-answer','verify-quotes','return-citations'],modelMs,totalMs:Math.round(performance.now()-started),evidenceCount:input.evidence.length}});
 }catch(error){if(!res.writableEnded)send(502,{error:error.name==='TimeoutError'?'The model exceeded the two-minute deadline.':error.message?.startsWith('Provider returned')?error.message:'Tutor service could not complete the request. Check model availability.'});}
 finally{if(ownsSlot)active--;console.log(JSON.stringify({event:'tutor-request',requestId,route:req.url?.split('?')[0],status:res.statusCode,durationMs:Math.round(performance.now()-started)}));}
});
server.requestTimeout=20000;server.headersTimeout=10000;
if(process.env.NODE_ENV!=='test')server.listen(port,host,()=>console.log(`Dataforge tutor listening on ${host}:${port}`));
