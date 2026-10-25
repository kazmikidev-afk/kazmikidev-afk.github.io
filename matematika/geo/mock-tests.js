const M=s=>'<span class="math" dir="ltr">'+s+'</span>';
window.MOCK_CFG={id:'mock-test-2',title:'מבחן תרגול 2: זוויות בין ישרים מקבילים, דמיון וקנה מידה',minutes:45,
intro:'מבחן תרגול בגאומטריקה: זוויות מתאימות, מתחלפות וחד־צדדיות בין ישרים מקבילים, ודמיון משולשים וקנה מידה.',
getState:()=>appState,save:()=>{try{saveState()}catch(e){}},
viz:{par(q){const L=q.pos||{},t=(k,x,y)=>L[k]?`<text x="${x}" y="${y}" font-size="20" font-weight="700" text-anchor="middle" fill="${L[k]==='?'?'#c44f4f':'#087b83'}">${L[k]==='?'?'?':L[k]+'°'}</text>`:'';
 return `<svg viewBox="0 0 420 240" role="img" aria-label="שני ישרים מקבילים וחותך. הזוויות מסומנות באותיות ובמספרים לא בקנה מידה."><line x1="20" y1="70" x2="400" y2="70" stroke="#17363a" stroke-width="3"/><line x1="20" y1="170" x2="400" y2="170" stroke="#17363a" stroke-width="3"/><line x1="150" y1="10" x2="270" y2="230" stroke="#e26c3d" stroke-width="3"/><path d="M360 55l14 15-14 0M360 155l14 15-14 0" fill="none" stroke="#17363a" stroke-width="2"/><g>${t('pul',150,58)}${t('pur',226,58)}${t('pdl',150,96)}${t('pdr',232,96)}${t('qul',205,158)}${t('qur',266,158)}${t('qdl',196,196)}${t('qdr',272,196)}</g></svg>`}},
mount(open){const t=document.querySelector('.tools');if(t){const b=document.createElement('button');b.className='ghost';b.id='mockHome';b.textContent='מבחן תרגול';b.onclick=()=>{open();history.replaceState(null,'',location.pathname+location.search+'#mock-test-2')};t.append(b)}const h=document.querySelector('.hero-actions');if(h){const b=document.createElement('button');b.className='ghost';b.textContent='מבחן תרגול: זוויות ודמיון 20 שאלות.';b.onclick=()=>{open();history.replaceState(null,'',location.pathname+location.search+'#mock-test-2')};h.append(b)}},
qs:[
{t:'ישרים מקבילים',viz:'par',pos:{pul:'70',qul:'?'},p:'שני ישרים מקבילים נחתכים על ידי חותך. הזווית '+M('70°')+' נמצאת למעלה משמאל בחיתוך העליון. הזווית המסומנת ב־? היא זווית מתאימה לה בחיתוך התחתון. מה גודלה?',a:['70'],u:'מעלות'},
{t:'ישרים מקבילים',viz:'par',pos:{pdr:'65',qul:'?'},p:'הישרים מקבילים. הזווית המסומנת ב־? מתחלפת לזווית '+M('65°')+'. מה גודלה?',a:['65'],u:'מעלות'},
{t:'ישרים מקבילים',viz:'par',pos:{pdl:'110',qul:'?'},p:'הישרים מקבילים. שתי הזוויות נמצאות בין הישרים, באותו צד של החותך חד־צדדיות. מה גודל הזווית המסומנת ב־?',a:['70'],u:'מעלות'},
{t:'ישרים מקבילים',viz:'par',pos:{pul:'48',pdr:'?'},p:'מה גודל הזווית המסומנת ב־? היא נמצאת מול הזווית '+M('48°')+' באותה נקודת חיתוך זוויות קדקודיות.',a:['48'],u:'מעלות'},
{t:'ישרים מקבילים',viz:'par',pos:{pur:'125',pdr:'?'},p:'שתי הזוויות '+M('125°')+' ו־? נמצאות זו לצד זו על ישר אחד זוויות צמודות. מה גודל הזווית המסומנת ב־?',a:['55'],u:'מעלות'},
{t:'ישרים מקבילים',p:'שני ישרים מקבילים נחתכים על ידי חותך. שתי זוויות מתאימות הן '+M('(3x+10)°')+' ו־'+M('70°')+'. מצאו את x.',a:['20']},
{t:'ישרים מקבילים',p:'שני ישרים מקבילים נחתכים על ידי חותך. שתי זוויות מתחלפות הן '+M('(2x−5)°')+' ו־'+M('(x+30)°')+'. מצאו את x.',a:['35']},
{t:'ישרים מקבילים',p:'שני ישרים מקבילים נחתכים על ידי חותך. שתי זוויות חד־צדדיות בין הישרים, באותו צד, הן '+M('4x°')+' ו־'+M('(2x+30)°')+'. מצאו את x.',a:['25']},
{t:'ישרים מקבילים',p:'בשרטוט שני ישרים וחותך. זוויות מתחלפות שנמדדו הן '+M('70°')+' ו־'+M('75°')+'. מה אפשר להסיק?',o:['הישרים מקבילים','הישרים אינם מקבילים','אי אפשר לדעת בלי למדוד עוד זווית','הזוויות מתאימות ולכן הישרים מקבילים'],c:1},
{t:'ישרים מקבילים',p:'במשולש '+M('ABC')+' הנקודה D על AB והנקודה E על AC, ו־'+M('DE ∥ BC')+'. הזווית '+M('∠B')+' היא '+M('50°')+' והזווית '+M('∠C')+' היא '+M('60°')+'. הזווית '+M('∠ADE')+' מתאימה לזווית '+M('∠B')+'. מה גודלה?',a:['50'],u:'מעלות'},
{t:'דמיון משולשים',p:'משולש אחד בעל צלעות 3, 4, 5 ומשולש שני בעל צלעות 6, 8, 10. מה יחס הדמיון קטן:גדול?',a:['1:2']},
{t:'דמיון משולשים',p:'שני משולשים דומים. הצלע 6 במשולש הקטן מתאימה לצלע 9 במשולש הגדול. צלע אחרת במשולש הקטן היא 10. מה אורך הצלע המתאימה לה במשולש הגדול?',a:['15']},
{t:'דמיון משולשים',p:'שני משולשים דומים ביחס דמיון 2:3. היקף המשולש הקטן 24 ס״מ. מה היקף המשולש הגדול?',a:['36'],u:'ס״מ'},
{t:'דמיון משולשים',p:'שתי צורות דומות ביחס דמיון 1:3. מה יחס השטחים שלהן?',o:['1:3','1:6','1:9','1:27'],c:2},
{t:'דמיון משולשים',p:'שטח משולש קטן הוא 20 סמ״ר. משולש דומה לו גדול ביחס דמיון 1:3. מה שטח המשולש הגדול?',a:['180'],u:'סמ״ר'},
{t:'קנה מידה',p:'מקל באורך 1.5 מטר מטיל צל באורך 2 מטר. באותה שעה עץ מטיל צל באורך 12 מטר. מה גובה העץ? המשולשים דומים.',a:['9'],u:'מטר'},
{t:'קנה מידה',p:'מלבן בגודל 6×4 ס״מ מוגדל בקנה מידה, ואורכו החדש 15 ס״מ. מה שטח המלבן החדש?',a:['150'],u:'סמ״ר'},
{t:'קנה מידה',p:'בתוכנית של חדר, קנה המידה הוא 1:200. החדר בתוכנית 5 ס״מ על 3 ס״מ. מה שטח החדר האמיתי במ״ר?',a:['60'],u:'מ״ר'},
{t:'קנה מידה',p:'דגם מטוס באורך 30 ס״מ מייצג מטוס אמיתי באורך 45 מטר. מה קנה המידה דגם:מציאות? כתבו 1:כמה.',a:['1:150']},
{t:'קנה מידה',p:'מלבן א הוא 4×6 ס״מ ומלבן ב הוא 6×9 ס״מ. האם המלבנים דומים?',o:['כן, כי היחס בין הצלעות הוא 2:3 בשניהם','לא, כי השטחים שונים','לא, כי 6 אינו שווה ל־4','כן, כי לשניהם זוויות ישרות בלבד'],c:0}
]};
/* Mock practice test engine (2026-10-10). Self-contained overlay; saves into the app's own progress object and reports through window.avichaiTrack. */
(()=>{
const C=window.MOCK_CFG;if(!C)return;
const clean=x=>String(x).normalize('NFKC').replace(/[\s\u200e\u200f]/g,'').replace(/−|–/g,'-').replace(/[％%]/g,'').replace(/[׳'"״]/g,'');
function same(v,a){
  v=clean(v).replace(/^(\d+),(\d+)$/,'$1.$2');a=clean(a);
  if(v===a)return true;
  const num=/^[-+]?\d+(\.\d+)?$/;
  if(num.test(v)&&num.test(a))return Math.abs(Number(v)-Number(a))<1e-8;
  if(/^\d+:\d+$/.test(v)&&/^\d+:\d+$/.test(a)){const[x,y]=v.split(':').map(Number),[p,q]=a.split(':').map(Number);return y!==0&&q!==0&&x*q===y*p}
  if(/^\d+\/\d+$/.test(v)&&/^\d+\/\d+$/.test(a)){const[x,y]=v.split('/').map(Number),[p,q]=a.split('/').map(Number);return y!==0&&q!==0&&x*q===y*p}
  return false;
}
const grade=(q,v)=>q.o?v===q.o[q.c]:(v!==undefined&&String(v).trim()!==''&&q.a.some(a=>same(v,a)));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const css=`#mockOv{position:fixed;inset:0;z-index:2000;background:#f3f6f5;color:#17302e;overflow:auto;font-family:Heebo,Arial,sans-serif;direction:rtl;-webkit-overflow-scrolling:touch}
#mockOv *{box-sizing:border-box}#mockOv .mw{max-width:820px;margin:0 auto;padding:14px 14px 110px}
#mockOv .mc{background:#fff;border:1px solid #d3e2de;border-radius:16px;padding:16px;margin:12px 0;box-shadow:0 6px 18px rgba(20,67,63,.08)}
#mockOv h2,#mockOv h3{margin:0 0 8px;font-weight:800}#mockOv p{line-height:1.7;margin:6px 0}
#mockOv .mtag{display:inline-block;background:#dff4ef;color:#075e58;border-radius:999px;padding:2px 10px;font-size:13px;font-weight:700}
#mockOv .mq{font-size:18px;line-height:1.8}
#mockOv .mopt{display:flex;gap:10px;align-items:center;border:2px solid #d3e2de;border-radius:12px;padding:10px 12px;margin:8px 0;cursor:pointer;background:#fff;font-size:17px;min-height:46px}
#mockOv .mopt.sel{border-color:#087f78;background:#e6f6f2}
#mockOv input[type=text]{font:inherit;font-size:18px;padding:10px 12px;border:2px solid #bcd0cb;border-radius:12px;width:min(260px,70%);direction:ltr;text-align:center}
#mockOv .mbtn{font:inherit;font-weight:700;border:0;border-radius:12px;padding:12px 18px;background:#087f78;color:#fff;cursor:pointer;min-height:46px}
#mockOv .mbtn.g{background:#fff;color:#087f78;border:2px solid #087f78}
#mockOv .mbar{position:fixed;bottom:0;right:0;left:0;background:#fff;border-top:1px solid #d3e2de;padding:10px 14px;display:flex;gap:10px;align-items:center;justify-content:space-between;z-index:2001}
#mockOv .mprog{flex:1;height:10px;background:#dfe9e6;border-radius:9px;overflow:hidden}#mockOv .mprog i{display:block;height:100%;background:#087f78;width:0}
#mockOv .ok{color:#1d7a50;font-weight:800}#mockOv .bad{color:#b23a3a;font-weight:800}
#mockOv .mres{border-right:6px solid #ccc}#mockOv .mres.ok1{border-color:#278c63}#mockOv .mres.bad1{border-color:#c44f4f}
#mockOv .math{direction:ltr;unicode-bidi:isolate;display:inline-block}#mockOv svg{max-width:100%;height:auto;display:block;margin:8px auto}#mockOv .score{font-size:44px;font-weight:800;color:#087f78;text-align:center}
#mockOv table{border-collapse:collapse;width:100%}#mockOv td,#mockOv th{border-bottom:1px solid #d3e2de;padding:6px 8px;text-align:right}
@media print{#mockOv .mbar{display:none}}`;
let st=document.createElement('style');st.textContent=css;document.head.append(st);
function store(){const o=C.getState();if(!o.mock)o.mock={};if(!o.mock[C.id])o.mock[C.id]={attempts:[]};return o.mock[C.id]}
let ov,qs,ans,t0,timer;
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function close(){clearInterval(timer);if(ov){ov.remove();ov=null}document.body.style.overflow='';window.avichaiTrack?.mode('other','');if(location.hash==='#'+C.id)history.replaceState(null,'',location.pathname+location.search)}
function shell(inner){if(!ov){ov=document.createElement('div');ov.id='mockOv';ov.setAttribute('role','dialog');ov.setAttribute('aria-label',C.title);document.body.append(ov);document.body.style.overflow='hidden'}ov.innerHTML=inner;ov.scrollTop=0}
function intro(){
  window.avichaiTrack?.mode('quiz','mock');
  const h=store().attempts.slice(-5).reverse();
  shell(`<div class="mw"><div style="display:flex;justify-content:space-between;align-items:center"><h2>${C.title}</h2><button class="mbtn g" id="mClose">סגירה</button></div>
  <div class="mc"><p>${C.intro}</p><ul style="line-height:1.9;padding-inline-start:20px"><li>${C.qs.length} שאלות, בערך ${C.minutes} דקות.</li><li>בזמן המבחן אין רמזים ואין משוב. אפשר לחזור ולשנות תשובה עד ההגשה.</li><li>בסוף רואים ציון, תשובה נכונה לכל שאלה ופירוט לפי נושא.</li><li>זה תרגול לקראת מבחן המתמטיקה, ולא מיקוד רשמי של המורה.</li><li>התשובות הכתובות הן מספר, שבר או יחס, למשל 5 או 2:3, ובלי יחידות מידה.</li></ul>
  <button class="mbtn" id="mStart">התחלת המבחן</button></div>
  ${h.length?`<div class="mc"><h3>ניסיונות קודמים</h3><table>${h.map(a=>`<tr><td>${new Date(a.date).toLocaleDateString('he-IL')}</td><td>${a.correct} מתוך ${a.total}</td><td>${Math.round(a.duration/60)} דק׳</td></tr>`).join('')}</table></div>`:''}</div>`);
  ov.querySelector('#mClose').onclick=close;ov.querySelector('#mStart').onclick=start;
}
function start(){
  qs=C.qs.map((q,i)=>({...q,i,show:q.o?shuffle(q.o):null}));ans={};t0=Date.now();
  const body=qs.map((q,i)=>`<section class="mc" data-i="${i}"><span class="mtag">שאלה ${i+1} · ${q.t}</span><div class="mq">${q.p}</div>${q.viz?(C.viz[q.viz]?C.viz[q.viz](q):''):''}${q.o?q.show.map((o,k)=>`<div class="mopt" tabindex="0" role="radio" aria-checked="false" data-k="${k}">${o}</div>`).join(''):`<div><input type="text" inputmode="text" autocomplete="off" aria-label="תשובה לשאלה ${i+1}"> ${q.u?`<span>${q.u}</span>`:''}</div>`}</section>`).join('');
  shell(`<div class="mw"><div style="display:flex;justify-content:space-between;align-items:center"><h2>${C.title}</h2><b id="mTime">00:00</b></div>${body}</div>
  <div class="mbar"><span id="mCount">0 מתוך ${qs.length}</span><div class="mprog"><i id="mProg"></i></div><button class="mbtn" id="mSubmit">סיום והגשה</button></div>`);
  const upd=()=>{const n=Object.keys(ans).filter(k=>String(ans[k]).trim()!=='').length;ov.querySelector('#mCount').textContent=n+' מתוך '+qs.length;ov.querySelector('#mProg').style.width=(n/qs.length*100)+'%'};
  ov.querySelectorAll('section[data-i]').forEach(sec=>{const i=+sec.dataset.i,q=qs[i];
    if(q.o)sec.querySelectorAll('.mopt').forEach(el=>{const pick=()=>{sec.querySelectorAll('.mopt').forEach(x=>{x.classList.remove('sel');x.setAttribute('aria-checked','false')});el.classList.add('sel');el.setAttribute('aria-checked','true');ans[i]=q.show[+el.dataset.k];upd()};el.onclick=pick;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}}});
    else sec.querySelector('input').oninput=e=>{ans[i]=e.target.value;upd()}});
  clearInterval(timer);timer=setInterval(()=>{const s=Math.floor((Date.now()-t0)/1000),el=ov&&ov.querySelector('#mTime');if(el)el.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')},1000);
  ov.querySelector('#mSubmit').onclick=()=>{const n=Object.keys(ans).filter(k=>String(ans[k]).trim()!=='').length;if(n<qs.length&&!confirm('ענית על '+n+' מתוך '+qs.length+' שאלות. להגיש בכל זאת?'))return;finish()};
}
function finish(){
  clearInterval(timer);const dur=Math.round((Date.now()-t0)/1000);
  const res=qs.map(q=>({q,v:ans[q.i],ok:grade(q,ans[q.i])}));const correct=res.filter(r=>r.ok).length;
  const by={};res.forEach(r=>{const b=by[r.q.t]||(by[r.q.t]={n:0,ok:0});b.n++;if(r.ok)b.ok++});
  const wrongByTopic={};res.filter(r=>!r.ok).forEach(r=>wrongByTopic[r.q.t]=(wrongByTopic[r.q.t]||0)+1);
  const s=store();s.attempts.push({date:new Date().toISOString(),correct,total:qs.length,duration:dur,by});C.save();
  window.avichaiTrack?.milestone('quiz_complete',{set:C.id,correct,total:qs.length,wrongByTopic});
  const pct=Math.round(correct/qs.length*100);
  shell(`<div class="mw"><div style="display:flex;justify-content:space-between;align-items:center"><h2>תוצאות: ${C.title}</h2><button class="mbtn g" id="mClose">סגירה</button></div>
  <div class="mc"><div class="score">${correct} מתוך ${qs.length}</div><p style="text-align:center">${pct}% · זמן: ${Math.floor(dur/60)} דק׳</p>
  <table><tr><th>נושא</th><th>נכון</th></tr>${Object.entries(by).map(([k,b])=>`<tr><td>${k}</td><td>${b.ok} מתוך ${b.n}</td></tr>`).join('')}</table>
  <p style="margin-top:12px">ההתקדמות נשמרה. מומלץ לחזור לנושאים שבהם יש טעויות ואז לנסות שוב.</p><button class="mbtn" id="mAgain">מבחן חוזר</button></div>
  ${res.map(r=>`<section class="mc mres ${r.ok?'ok1':'bad1'}"><span class="mtag">שאלה ${r.q.i+1} · ${r.q.t}</span> <b class="${r.ok?'ok':'bad'}">${r.ok?'נכון':'לא נכון'}</b><div class="mq">${r.q.p}</div>${r.q.viz&&C.viz[r.q.viz]?C.viz[r.q.viz](r.q):''}<p>התשובה שלך: <b>${r.v===undefined||r.v===''?'לא נענתה':(r.q.o?r.v:esc(r.v))}</b></p>${r.ok?'':`<p>התשובה הנכונה: <b>${r.q.o?r.q.o[r.q.c]:r.q.a[0]}</b></p>`}</section>`).join('')}</div>`);
  ov.querySelector('#mClose').onclick=close;ov.querySelector('#mAgain').onclick=intro;
}
function open(){if(ov)return;intro()}
window['openMock_'+C.id.replace(/\W/g,'_')]=open;
C.mount(open);
if(location.hash==='#'+C.id)setTimeout(open,0);
window.addEventListener('hashchange',()=>{if(location.hash==='#'+C.id)open()});
})();
