(async()=>{
  try {
    const files=Array.from({length:7},(_,i)=>`payload/${String(i+1).padStart(2,'0')}.txt`);
    const encoded=(await Promise.all(files.map(async file=>{
      const response=await fetch(file,{cache:'no-store'});
      if(!response.ok) throw new Error(`無法載入 ${file}`);
      return response.text();
    }))).join('');
    const binary=atob(encoded);
    const compressed=Uint8Array.from(binary,char=>char.charCodeAt(0));
    const stream=new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
    const code=await new Response(stream).text();
    new Function(code)();
  } catch(error) {
    console.error(error);
    document.body.innerHTML='<div style="font-family:sans-serif;padding:40px"><h1>載入失敗</h1><p>請重新整理頁面，或確認 GitHub Pages 已完整部署。</p></div>';
  }
})();
