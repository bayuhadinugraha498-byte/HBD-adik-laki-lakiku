(function(){
var $=function(i){return document.getElementById(i)};
var defMsg=$('msg').textContent;
var st={n:'',a:'',f:'',m:''};

function load(){
  try{var h=location.hash.slice(1);if(h){var p=new URLSearchParams(h);st.n=p.get('n')||'';st.a=p.get('a')||'';st.f=p.get('f')||'';st.m=p.get('m')||'';}}catch(e){}
  try{if(!st.n){var s=JSON.parse(localStorage.getItem('bday')||'null');if(s)st=s;}}catch(e){}
}
function render(){
  $('nm').textContent=st.n||'Adikku';
  document.title='Selamat Ulang Tahun, '+(st.n||'Adikku')+'!';
  $('ageTag').textContent=st.a?('Usia '+st.a+', level baru'):'Usia baru, level baru';
  $('msg').textContent=st.m||defMsg;
  $('from').textContent=st.f?('Dari '+st.f):'Dari kakakmu';
  $('inName').value=st.n;$('inAge').value=st.a;$('inFrom').value=st.f;$('inMsg').value=st.m||defMsg;
}
load();render();

$('apply').onclick=function(){
  st={n:$('inName').value.trim(),a:$('inAge').value.trim(),f:$('inFrom').value.trim(),m:$('inMsg').value.trim()};
  if(st.m===defMsg)st.m='';
  try{localStorage.setItem('bday',JSON.stringify(st))}catch(e){}
  render();$('eh').textContent='Sudah diperbarui.';
};
$('copy').onclick=function(){
  var p=new URLSearchParams();
  if(st.n)p.set('n',st.n);if(st.a)p.set('a',st.a);if(st.f)p.set('f',st.f);if(st.m)p.set('m',st.m);
  var url=location.href.split('#')[0]+'#'+p.toString();
  var done=function(){$('eh').textContent='Tautan disalin. Kirim ke adikmu.'};
  try{navigator.clipboard.writeText(url).then(done,function(){$('eh').textContent=url})}catch(e){$('eh').textContent=url}
};

/* confetti */
var cv=$('fx'),cx=cv.getContext('2d'),parts=[],run=false;
function size(){cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio}
size();addEventListener('resize',size);
var cols=['#ffd23f','#ff5d8f','#4d6bff','#fff8ec','#ff9f1c'];
function burst(x,y,n){
  for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,s=4+Math.random()*9;
    parts.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,w:6+Math.random()*7,h:4+Math.random()*5,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[i%cols.length],l:120+Math.random()*60});}
  if(!run){run=true;requestAnimationFrame(tick)}
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);var d=devicePixelRatio;
  parts=parts.filter(function(p){return p.l>0&&p.y<innerHeight+40});
  parts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.vx*=.99;p.r+=p.vr;p.l--;
    cx.save();cx.translate(p.x*d,p.y*d);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w*d/2,-p.h*d/2,p.w*d,p.h*d);cx.restore();});
  if(parts.length)requestAnimationFrame(tick);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function party(x,y,n){if(!reduce)burst(x,y,n)}

/* tiup lilin */
$('blow').onclick=function(){
  var w=$('cakeWrap'),out=w.classList.contains('out');
  if(!out){w.classList.add('out');$('blow').textContent='Nyalakan lagi';
    $('hint').textContent='Semoga permintaanmu terkabul! 🎉';
    party(innerWidth/2,innerHeight*.35,160);
    setTimeout(function(){party(innerWidth*.2,innerHeight*.5,80);party(innerWidth*.8,innerHeight*.5,80)},350);
  }else{
    w.classList.remove('out');$('blow').textContent='Tiup lilinnya!';
    $('hint').textContent='Buat permintaan baru, lalu tiup lagi.';
  }
};

/* kado */
var gifts=['Kamu dapat voucher traktiran makan dari kakak. Tagih kapan saja!','Kamu dapat satu hari bebas dari cuci piring. Berlaku hari ini saja.','Kamu dapat pelukan virtual dari kakak. Terima dengan bangga.','Kamu dapat hak pilih film di malam keluarga. Pakai dengan bijak.'];
var gi=0;
$('gift').onclick=function(e){
  $('sur').textContent=gifts[gi++%gifts.length];
  var r=e.currentTarget.getBoundingClientRect();party(r.left+r.width/2,r.top,90);
};
})();