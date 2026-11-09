export const isAndroidApp=()=>location.hostname==='appassets.androidplatform.net';
export async function exportBlob(blob:Blob,name:string){
 const native=(window as unknown as {DataforgeNative?:{save:(data:string,name:string)=>void}}).DataforgeNative;
 if(isAndroidApp()&&native){const data=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('Could not prepare export.'));reader.readAsDataURL(blob);});native.save(data,name);return;}
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
