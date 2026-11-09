import {cp,mkdir,rm,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const target=resolve('android/app/src/main/assets');
if(!target.startsWith(resolve('android')+ '\\')&&!target.startsWith(resolve('android')+'/'))throw Error('Unexpected asset target');
await rm(target,{recursive:true,force:true});await mkdir(target,{recursive:true});await cp('dist/client',target,{recursive:true});
console.log('Bundled built client, SQL engines and licensed PDF references in Android assets.');
