(async()=>{
  try {
    const files=['app.part1.txt','app.part2.txt','app.part3.txt','app.part4.txt'];
    const code=(await Promise.all(files.map(async f=>{const r=await fetch(f,{cache:'no-store'});if(!r.ok)throw new Error(f);return r.text()}))).join('');
    new Function(code)();
  } catch (error) {
    console.error(error);
    document.body.innerHTML='<div style="font-family:sans-serif;padding:40px"><h1>載入失敗</h1><p>請重新整理頁面，或確認 GitHub Pages 已完整部署。</p></div>';
  }
})();
