/* מתמטיקה בקצב שלך — שכבת ליבה משותפת: כתיבה למפתחות הילידיים, חישוב חולשות, שעון המשחק */
window.MIXED=(function(){
var GK='avichai-game-v1',GOAL=1200,MK='matematika-mixed-v1';
function f2(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function rd(k,def){try{var o=JSON.parse(localStorage.getItem(k));return o==null?def:o}catch(e){return def}}
function wr(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function rdG(){var o=rd(GK,null)||{};if(typeof o.points!=='number')o.points=0;o.days=o.days||{};o.base=o.base||{};return o}
function dayOf(g,k){k=k||f2(new Date());return g.days[k]||(g.days[k]={secs:0,ans:0,ok:0,done:0})}
/* --- כתיבה במבנה הילידי של אלגבריקה: נסיון ראשון נרשם ב-first, קליק שגוי ב-attempts+mistakes --- */
function algFirst(q,ok){var st=rd('algebrika-v3',null)||{};st.first=st.first||{};if(!(q.id in st.first))st.first[q.id]=ok;wr('algebrika-v3',st)}
function algWrong(q){var st=rd('algebrika-v3',null)||{};st.attempts=st.attempts||{};st.mistakes=st.mistakes||{};st.attempts[q.id]=(st.attempts[q.id]||0)+1;st.mistakes[q.topic]=(st.mistakes[q.topic]||0)+1;wr('algebrika-v3',st)}
function algRight(q){var st=rd('algebrika-v3',null)||{};st.answers=st.answers||{};st.answers[q.id]=true;wr('algebrika-v3',st)}
function algHint(q,n){var st=rd('algebrika-v3',null)||{};st.hints=st.hints||{};st.hints[q.id]=(st.hints[q.id]||0)+(n||1);wr('algebrika-v3',st)}
/* --- כתיבה במבנה הילידי של גאומטריקה --- */
function geoFinish(q,wrongClicks,hints){var gs=rd('geometrika-progress-v2',null)||{};gs.answers=gs.answers||{};var old=gs.answers[q.id]||{id:q.id,topic:q.topic,difficulty:q.diffEn,attempts:0,correct:0,hints:0};old.attempts++;old.correct++;old.hints+=hints;old.last=new Date().toISOString();gs.answers[q.id]=old;wr('geometrika-progress-v2',gs)}
/* --- נקודות חולשה (אותם כללים כמו בעמוד ההתקדמות) --- */
function weakTopics(){
 var out={alg:[],geo:[]};
 var st=rd('algebrika-v3',null)||{};var first=st.first||{};
 if(window.ALG_QMAP){var per={};Object.keys(first).forEach(function(id){var t=window.ALG_QMAP[id];if(!t)return;per[t]=per[t]||{s:0,c:0};per[t].s++;if(first[id]===true)per[t].c++});
 Object.keys(per).forEach(function(t){if(per[t].s>=3&&per[t].c/per[t].s<0.7)out.alg.push({id:t,acc:Math.round(per[t].c/per[t].s*100)})});}
 var gs=rd('geometrika-progress-v2',null)||{};var ans=gs.answers||{};var gp={};
 Object.keys(ans).forEach(function(id){var r=ans[id];if(!r||!r.topic)return;gp[r.topic]=gp[r.topic]||{a:0,c:0};gp[r.topic].a+=r.attempts||0;gp[r.topic].c+=r.correct||0});
 Object.keys(gp).forEach(function(t){if(gp[t].a>=2&&gp[t].c/gp[t].a<0.7)out.geo.push({id:t,acc:Math.round(gp[t].c/gp[t].a*100)})});
 return out;
}
/* --- שעון המשחק: זהה ללוגיקה בשתי האפליקציות (אותם מפתחות base — אין ספירה כפולה) --- */
function countsAlg(){var st=rd('algebrika-v3',null)||{};var f=Object.values(st.first||{});return{ans:f.length+Object.values(st.attempts||{}).reduce(function(x,y){return x+y},0),ok:f.filter(Boolean).length}}
function countsGeo(){var gs=rd('geometrika-progress-v2',null)||{};var r=Object.values(gs.answers||{});return{ans:r.reduce(function(n,x){return n+(x.attempts||0)},0),ok:r.reduce(function(n,x){return n+(x.correct||0)},0)}}
var lastAct=Date.now(),started=false;
function startGameClock(){
 if(started)return;started=true;
 ['pointerdown','keydown','scroll','touchstart'].forEach(function(ev){document.addEventListener(ev,function(){lastAct=Date.now()},{passive:true,capture:true})});
 setInterval(function(){
  if(document.hidden)return;
  var now=Date.now();if(now-lastAct>=45000)return;
  var g=rdG(),d=dayOf(g);
  d.secs++;
  if(d.secs>=GOAL&&!d.done){d.done=1;g.points+=20}
  [['אלגבריקה',countsAlg()],['גאומטריקה',countsGeo()]].forEach(function(pair){
   var app=pair[0],c=pair[1],b=g.base[app];
   if(!b||c.ans<b.ans||c.ok<b.ok){g.base[app]=c;return}
   var da=c.ans-b.ans,dk=c.ok-b.ok;
   if(da>0){g.points+=dk*10+(da-dk)*2;d.ans+=da;d.ok+=dk;g.base[app]=c}
  });
  wr(GK,g);
 },1000);
}
/* --- היסטוריית מבחנים/משימות של המנוע המעורב --- */
function readMixed(){var o=rd(MK,null)||{};o.exams=o.exams||[];o.missions=o.missions||{};return o}
function saveExam(rec){var o=readMixed();o.exams.unshift(rec);o.exams=o.exams.slice(0,30);wr(MK,o)}
function saveMission(res){var o=readMixed();o.missions[f2(new Date())]=res;wr(MK,o)}
function missionToday(){return readMixed().missions[f2(new Date())]||null}
return{f2:f2,rd:rd,wr:wr,rdG:rdG,dayOf:dayOf,
 algFirst:algFirst,algWrong:algWrong,algRight:algRight,algHint:algHint,geoFinish:geoFinish,
 weakTopics:weakTopics,startGameClock:startGameClock,
 readMixed:readMixed,saveExam:saveExam,saveMission:saveMission,missionToday:missionToday};
})();
