import {build} from 'esbuild';import {mkdir,cp,readFile,writeFile} from 'node:fs/promises';
await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
await build({entryPoints:['worker/cloud.ts'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true});
const hosting=JSON.parse(await readFile('.openai/hosting.json','utf8'));if(hosting.static)throw new Error('Cloud build cannot use the static hosting manifest.');
await writeFile('dist/.openai/hosting.json',JSON.stringify(hosting,null,2));await cp('drizzle','dist/.openai/drizzle',{recursive:true});
await writeFile('dist/server/wrangler.json',JSON.stringify({name:'dataforge',main:'index.js',compatibility_date:'2026-11-01',assets:{directory:'../client',binding:'ASSETS',run_worker_first:['/api/*']},d1_databases:[{binding:'DB',database_name:'dataforge-progress',database_id:'00000000-0000-4000-8000-000000000000'}]},null,2));
console.log('Built authenticated cloud-sync Worker and copied schema migrations.');
