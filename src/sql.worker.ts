import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { fixture, challenges, type Dialect } from './content/sql';
import {compare,errorAdvice,type Table,type Cell} from './lib/grading';
async function main(data:{query:string;challengeId:string;seed:number;dialect:Dialect;submit:boolean}){
 const challenge=challenges.find(c=>c.id===data.challengeId);if(!challenge)throw new Error('Challenge not found.');
 if(data.query.length>20000)throw new Error('Query exceeds 20,000 characters.');
 const stripped=data.query.replace(/--[^\n]*/g,'').replace(/\/\*[\s\S]*?\*\//g,'').trim();
 if(!/^(SELECT|WITH)\b/i.test(stripped))throw new Error('Use a single read-only SELECT or WITH query.');
 const seeds=data.submit?[data.seed,data.seed+41,data.seed+137]:[data.seed];
 let first:Table|undefined;let expected:Table|undefined;let passed=0;let mismatch;let failingSeed;
 let pg:import('@electric-sql/pglite').PGlite|undefined;
 const SQL=data.dialect==='sqlite'?await initSqlJs({locateFile:()=>wasmUrl}):undefined;
 if(data.dialect==='postgres'){const {PGlite}=await import('@electric-sql/pglite');pg=await PGlite.create();}
 try{
 for(const seed of seeds){
  let run:(q:string)=>Promise<Table>;let cleanup:()=>Promise<void>;
  if(SQL){const db=new SQL.Database();db.run(fixture(seed));db.run('PRAGMA query_only = ON');
   run=async(q)=>{const statements=db.iterateStatements(q);let count=0;let result:Table={columns:[],values:[]};for(const stmt of statements){count++;if(count>1)throw new Error('Use one SQL statement per run.');result.columns=stmt.getColumnNames();while(stmt.step()){if(result.values.length>=2000)throw new Error('Result exceeds 2,000 rows. Narrow the query.');result.values.push(stmt.get() as Cell[]);}}return result;};cleanup=async()=>db.close();
  }else{const db=pg!;await db.exec('DROP TABLE IF EXISTS payments, events, products, orders, customers;');await db.exec(fixture(seed));await db.exec("SET statement_timeout = '3000ms'; BEGIN READ ONLY;");
   run=async(q)=>{const r=await db.query<Record<string,Cell>>(q);if(r.rows.length>2000)throw new Error('Result exceeds 2,000 rows. Narrow the query.');return {columns:r.fields.map(f=>f.name),values:r.rows.map(row=>r.fields.map(f=>row[f.name]))};};cleanup=async()=>{await db.exec('ROLLBACK;');};
  }
  try{const actual=await run(data.query);if(!first)first=actual;if(data.submit){const exp=await run(challenge.query);if(!expected)expected=exp;const cmp=compare(actual,exp,challenge.ordered);if(cmp.correct)passed++;else if(!mismatch){mismatch=cmp;failingSeed=seed;}}}finally{await cleanup();}
 }
 return {table:first,expected,passed,total:seeds.length,correct:data.submit?passed===seeds.length:undefined,mismatch,failingSeed};
 }finally{await pg?.close();}
}
self.onmessage=async(event)=>{try{self.postMessage(await main(event.data));}catch(error){const message=error instanceof Error?error.message:String(error);self.postMessage({error:message,advice:errorAdvice(message)});}};

