import type {Comparison, Table} from './grading';
import type {Dialect} from '../content/sql';
export interface RunResult {table?:Table;expected?:Table;passed?:number;total?:number;correct?:boolean;mismatch?:Comparison;failingSeed?:number;error?:string;advice?:string}
export function runSQL(query:string,challengeId:string,seed:number,dialect:Dialect,submit:boolean):{promise:Promise<RunResult>;cancel:()=>void}{
 const worker=new Worker(new URL('../sql.worker.ts',import.meta.url),{type:'module'});let finish:(r:RunResult)=>void;
 const promise=new Promise<RunResult>(resolve=>{finish=resolve;});
 const end=(r:RunResult)=>{clearTimeout(timer);worker.terminate();finish(r);};
 const timer=setTimeout(()=>end({error:'The SQL engine exceeded the 30-second limit.',advice:'Try again after the engine finishes downloading, or simplify the query. Cross joins and unbounded recursion can create huge intermediate results.'}),30000);
 worker.onmessage=e=>end(e.data);worker.onerror=e=>end({error:e.message||'The SQL engine could not start.',advice:'Check your connection for the first load, then retry. SQLite uses less memory than PostgreSQL.'});
 worker.postMessage({query,challengeId,seed,dialect,submit});
 return {promise,cancel:()=>end({error:'Query cancelled.',advice:'Your query draft is saved. Edit it and run again.'})};
}
