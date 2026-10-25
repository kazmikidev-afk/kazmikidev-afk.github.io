/* מעקב אביחי — מנוע מעורב: אותם אירועים, אותו endpoint, אותו קוד הסכמה, לפי תחום. בלי הרחבת גילוי. */
window.MIXED_TRACK=(function(){
var KEY='avichai-tracking-v1';
var URL='https://script.google.com/macros/s/AKfycbwlq3_queCzhjr_tVXN7BlsHR1_IK94c3BKra-G2mbI2TbJMhqNYXwZFSPj-kiNpT1NdQ/exec';
var DOM={alg:'אלגבריקה',geo:'גאומטריקה'};
function code(){return localStorage.getItem(KEY)||''}
function consent(){return code().length===32}
function mk(){return{mode:'other',topic:'',since:Date.now(),started:false,ever:false}}
var st={alg:mk(),geo:mk()};
function id(){return Date.now().toString(36)+Math.random().toString(36).slice(2,10)}
function post(dom,e){
 if(!consent())return;
 var payload=JSON.stringify({v:1,code:code(),app:DOM[dom],at:new Date().toISOString(),id:id(),...e});
 try{if(navigator.sendBeacon&&navigator.sendBeacon(URL,new Blob([payload],{type:'text/plain'})))return;
 fetch(URL,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain'},body:payload}).catch(function(){})}catch(_){}
}
function flush(dom){if(!consent())return;var s=st[dom],now=Date.now();
 var sec=Math.min(300,Math.max(0,Math.round((now-s.since)/1000)));
 if(sec>0&&s.started)post(dom,{type:'time',mode:s.mode,topic:s.topic,seconds:sec});s.since=now}
function activate(dom){if(!consent()||document.hidden)return;var s=st[dom];s.ever=true;s.since=Date.now();
 if(!s.started){s.started=true;post(dom,{type:'session_open'})}}
function deactivate(dom){var s=st[dom];if(!s.started)return;flush(dom);post(dom,{type:'session_close'});s.started=false}
document.addEventListener('visibilitychange',function(){
 if(document.hidden){deactivate('alg');deactivate('geo')}
 else{Object.keys(st).forEach(function(d){if(st[d].ever)activate(d)})}
});
window.addEventListener('pagehide',function(){deactivate('alg');deactivate('geo')});
setInterval(function(){if(!document.hidden){if(st.alg.started)flush('alg');if(st.geo.started)flush('geo')}},60000);
return{
 mode:function(dom,m,t){if(!consent())return;activate(dom);flush(dom);var s=st[dom];s.mode=m;s.topic=t||'';s.since=Date.now()},
 milestone:function(dom,type,detail){if(!consent())return;activate(dom);post(dom,{type:type,...(detail||{})})},
 end:function(){deactivate('alg');deactivate('geo')},
 enabled:consent,
 /* כפתור ההסכמה — זהה בזרימה ובנוסח לאפליקציות */
 mountToggle:function(){
  var btn=document.createElement('button');btn.type='button';btn.id='trackingToggle';
  btn.textContent=consent()?'מעקב לאביחי: פעיל · לחצו לכיבוי':'הפעלת מעקב לימוד לאביחי';
  btn.style.cssText='position:fixed;bottom:8px;left:8px;z-index:1000;padding:5px 9px;border-radius:10px;border:1px solid #87b7a6;background:#eefaf3;color:#123c35;font:600 12px Arial;max-width:185px;opacity:.92;cursor:pointer';
  btn.title='הנתונים על שימוש, זמן וציונים נשלחים לגיליון הפרטי של מיקי בחשבון Google שלו';
  btn.onclick=function(){
   if(consent()){if(confirm('לכבות מעקב במכשיר זה?')){deactivate('alg');deactivate('geo');localStorage.removeItem(KEY);btn.textContent='הפעלת מעקב לימוד לאביחי'}}
   else if(confirm('להפעיל מעקב במכשיר של אביחי? זמני שימוש לפי מצב, נושאים וציונים יישלחו לגיליון הפרטי של מיקי ב-Google ולמצב מורה (סיכום התקדמות עדכני בשרת פרטי). אין להפעיל במכשיר אחר.')){
    var entered=prompt('קוד ההפעלה מופיע בלשונית הסבר בגיליון הפרטי של מיקי:');
    if(!entered||!/^[a-f0-9]{32}$/i.test(entered.trim()))return;
    localStorage.setItem(KEY,entered.trim());btn.textContent='מעקב לאביחי: פעיל · לחצו לכיבוי';
   }};
  document.body.appendChild(btn);
 }
};
})();
