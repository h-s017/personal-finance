(async()=>{
  try {
    const files=["chunks/01.b64", "chunks/02.b64", "chunks/03.b64", "chunks/04.b64", "chunks/05.b64", "chunks/06.b64", "chunks/07.b64", "chunks/08.b64", "chunks/09.b64", "chunks/10.b64", "chunks/11.b64", "chunks/12.b64"];
    const decoder=new TextDecoder();
    const code=(await Promise.all(files.map(async f=>{const r=await fetch(f,{cache:'no-store'});if(!r.ok)throw new Error(f);const b=atob(await r.text());const u=Uint8Array.from(b,c=>c.charCodeAt(0));return decoder.decode(u)}))).join('');
    new Function(code)();
  } catch (error) {
    console.error(error);
    document.body.innerHTML='<div style="font-family:sans-serif;padding:40px"><h1>載入失敗</h1><p>請重新整理頁面，或確認 GitHub Pages 已完整部署。</p></div>';
  }
})();
