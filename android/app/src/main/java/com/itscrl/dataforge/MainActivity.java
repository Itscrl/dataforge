package com.itscrl.dataforge;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.webkit.*;
import android.widget.Toast;
import androidx.webkit.WebViewAssetLoader;
import java.io.OutputStream;

/** Local HTTPS assets, scoped file picker and user-directed exports. No broad storage access. */
public class MainActivity extends Activity {
 private WebView web;
 private ValueCallback<Uri[]> upload;
 private byte[] pendingExport;
 private static final int PICK=10, SAVE=11;
 private static final String HOST="appassets.androidplatform.net";
 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  web=new WebView(this);setContentView(web);
  web.setOnApplyWindowInsetsListener((v,insets)->{v.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());return insets.consumeSystemWindowInsets();});
  WebSettings settings=web.getSettings();settings.setJavaScriptEnabled(true);settings.setDomStorageEnabled(true);
  settings.setAllowFileAccess(false);settings.setAllowContentAccess(false);settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
  settings.setSupportMultipleWindows(false);
  WebViewAssetLoader loader=new WebViewAssetLoader.Builder().addPathHandler("/",new WebViewAssetLoader.AssetsPathHandler(this)).build();
  web.addJavascriptInterface(new ExportBridge(),"DataforgeNative");
  web.setWebViewClient(new WebViewClient(){
   @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest request){return loader.shouldInterceptRequest(request.getUrl());}
   @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request){
    Uri uri=request.getUrl();if("https".equals(uri.getScheme())&&HOST.equals(uri.getHost()))return false;
    if(request.isForMainFrame()&&"https".equals(uri.getScheme())){try{startActivity(new Intent(Intent.ACTION_VIEW,uri));}catch(Exception e){message("No browser is available to open this link.");}}
    return true;
   }
   @Override public void onPageFinished(WebView view,String url){
    if(!url.startsWith("https://"+HOST+"/"))return;
    view.evaluateJavascript("if(!window.dataforgeExportReady){window.dataforgeExportReady=true;document.addEventListener('click',async function(e){const a=e.target.closest('a');if(!a)return;if(a.href.startsWith('blob:')&&a.download){e.preventDefault();try{const b=await(await fetch(a.href)).blob();const r=new FileReader();r.onload=()=>DataforgeNative.save(r.result,a.download);r.readAsDataURL(b);}catch(e){alert('Export failed. Try again.');}}else if(a.target==='_blank'&&a.href.startsWith('https://')){e.preventDefault();location.href=a.href;}},true);}",null);
   }
  });
  web.setWebChromeClient(new WebChromeClient(){
   @Override public boolean onShowFileChooser(WebView view,ValueCallback<Uri[]> callback,FileChooserParams params){
    if(upload!=null)upload.onReceiveValue(null);upload=callback;
    Intent intent=new Intent(Intent.ACTION_OPEN_DOCUMENT);intent.addCategory(Intent.CATEGORY_OPENABLE);intent.setType("*/*");intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    try{startActivityForResult(intent,PICK);}catch(Exception e){upload.onReceiveValue(null);upload=null;message("No file picker is available.");}return true;
   }
  });
  if(state==null||web.restoreState(state)==null)web.loadUrl("https://"+HOST+"/index.html");
 }
 private void message(String text){Toast.makeText(this,text,Toast.LENGTH_LONG).show();}
 public class ExportBridge {
  @JavascriptInterface public void save(String data,String name){
   if(data==null||data.length()>70_000_000||!data.startsWith("data:"))return;
   runOnUiThread(()->{if(web.getUrl()==null||!web.getUrl().startsWith("https://"+HOST+"/"))return;
    if(pendingExport!=null){message("Finish or cancel the current export first.");return;}
    try{int comma=data.indexOf(',');if(comma<0||!data.substring(0,comma).endsWith(";base64"))return;pendingExport=Base64.decode(data.substring(comma+1),Base64.DEFAULT);
     String safe=(name==null?"dataforge-export":name).replaceAll("[^a-zA-Z0-9._-]","_");if(safe.length()>150)safe=safe.substring(0,150);
     Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType(safe.endsWith(".pdf")?"application/pdf":"application/json").putExtra(Intent.EXTRA_TITLE,safe);startActivityForResult(intent,SAVE);
    }catch(Exception e){pendingExport=null;message("Export could not start. Try again.");}
   });
  }
 }
 @Override protected void onActivityResult(int request,int result,Intent data){super.onActivityResult(request,result,data);
  if(request==PICK&&upload!=null){upload.onReceiveValue(result==RESULT_OK&&data!=null&&data.getData()!=null?new Uri[]{data.getData()}:null);upload=null;}
  if(request==SAVE){byte[] bytes=pendingExport;pendingExport=null;if(result==RESULT_OK&&data!=null&&data.getData()!=null&&bytes!=null){try(OutputStream stream=getContentResolver().openOutputStream(data.getData())){if(stream==null)throw new Exception();stream.write(bytes);message("Export saved.");}catch(Exception e){message("Export failed. Choose a writable location and retry.");}}}
 }
 @Override protected void onSaveInstanceState(Bundle state){super.onSaveInstanceState(state);web.saveState(state);}
 @Override public void onBackPressed(){if(web.canGoBack())web.goBack();else super.onBackPressed();}
 @Override protected void onDestroy(){if(upload!=null)upload.onReceiveValue(null);web.removeJavascriptInterface("DataforgeNative");web.destroy();super.onDestroy();}
}
