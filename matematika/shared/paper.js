/* מתמטיקה בקצב שלך — תוצאות הדף היומי המודפס: אחסון, ניקוד וסיכום (משותף לדף ההזנה ולדף ההתקדמות) */
window.PAPER=(function(){
var KEY='matematika-paper-v1';
var TOPICS=[["EQ","משוואות"],["BR","סוגריים ומינוס"],["WP","בעיות מילוליות עם משוואה"],["RA","יחס ופרופורציה"],["SC","קנה מידה"],["PC","אחוזים"],["AN","זוויות וישרים מקבילים"],["TR","משולשים"],["PY","משפט פיתגורס"],["ST","סטטיסטיקה"]];
var MARKS=[["ok","✓","נכון עם דרך"],["half","½","נכון בלי דרך / נימוק"],["no","✗","שגוי"],["skip","–","דילג / נתקע"]];
var ERRS=[["sign","סימן"],["brackets","סוגריים"],["setup","בניית המשוואה"],["arith","חשבון"],["misread","קריאת השאלה"],["other","אחר"]];
var SCORE={ok:1,half:0.5,no:0,skip:0};
function read(){try{var o=JSON.parse(localStorage.getItem(KEY));if(o&&o.sheets)return o}catch(e){}return{sheets:{}}}
function write(o){try{localStorage.setItem(KEY,JSON.stringify(o));return true}catch(e){return false}}
function dayKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function heDate(k){var p=k.split('-');return p[2]+'.'+p[1]+'.'+p[0]}
function topicName(t){for(var i=0;i<TOPICS.length;i++)if(TOPICS[i][0]===t)return TOPICS[i][1];return t}
function sym(m){for(var i=0;i<MARKS.length;i++)if(MARKS[i][0]===m)return MARKS[i][1];return '?'}
function errName(e){for(var i=0;i<ERRS.length;i++)if(ERRS[i][0]===e)return ERRS[i][1];return ''}
function sheets(){var s=read().sheets;return Object.keys(s).sort().map(function(k){return s[k]})}
function saveSheet(sh){var o=read();sh.savedAt=new Date().toISOString();o.sheets[sh.date]=sh;return write(o)}
function removeSheet(date){var o=read();delete o.sheets[date];return write(o)}
function getSheet(date){return read().sheets[date]||null}
function sheetScore(sh){var n=sh.items.length,s=0;sh.items.forEach(function(it){s+=SCORE[it.mark]||0});return n?Math.round(s/n*100):null}
/* לפי נושא: כל הרמות יחד + רמת מבחן (2–3) בנפרד */
function byTopic(){
  var per={};
  sheets().forEach(function(sh){sh.items.forEach(function(it){
    var o=per[it.topic]||(per[it.topic]={topic:it.topic,n:0,s:0,n2:0,s2:0,noWork:0,wrong:0});
    var v=SCORE[it.mark]||0;o.n++;o.s+=v;
    if(it.level>=2){o.n2++;o.s2+=v}
    if(it.mark==='half')o.noWork++;
    if(it.mark==='no'||it.mark==='skip')o.wrong++;
  })});
  return Object.keys(per).map(function(t){var o=per[t];o.pct=Math.round(o.s/o.n*100);o.pct2=o.n2?Math.round(o.s2/o.n2*100):null;return o});
}
function weakTopics(){return byTopic().filter(function(o){return o.n>=3&&o.pct<70}).sort(function(a,b){return a.pct-b.pct})}
function streak(){
  var s=read().sheets,n=0,d=new Date();
  if(!s[dayKey(d)])d.setDate(d.getDate()-1);
  while(s[dayKey(d)]){n++;d.setDate(d.getDate()-1)}
  return n;
}
/* טקסט להדבקה לסוכן שמכין את הדפים: הדף הזה + רצף הסימונים לכל תגית ב-14 הימים האחרונים */
function summaryText(date){
  var sh=getSheet(date);if(!sh)return '';
  var L=['תוצאות דף יומי '+heDate(sh.date)+(sh.minutes?' · '+sh.minutes+' דקות':' · זמן לא נרשם')];
  var c={ok:0,half:0,no:0,skip:0};
  sh.items.forEach(function(it){
    c[it.mark]++;
    L.push(it.n+'. '+it.topic+'-'+it.level+' '+sym(it.mark)+(it.mark==='no'&&it.err?' ('+errName(it.err)+')':''));
  });
  L.push('סיכום: '+c.ok+' ✓ · '+c.half+' ½ · '+c.no+' ✗ · '+c.skip+' –');
  var from=new Date(sh.date+'T12:00:00');from.setDate(from.getDate()-13);var fromK=dayKey(from);
  var seq={},order=[];
  sheets().forEach(function(x){
    if(x.date<fromK||x.date>sh.date)return;
    x.items.forEach(function(it){var tag=it.topic+'-'+it.level;if(!seq[tag]){seq[tag]='';order.push(tag)}seq[tag]+=sym(it.mark)});
  });
  order.sort();
  L.push('');
  L.push('מצב מצטבר, 14 ימים אחרונים (מהישן לחדש):');
  order.forEach(function(tag){L.push(tag+': '+seq[tag])});
  return L.join('\n');
}
return{KEY:KEY,TOPICS:TOPICS,MARKS:MARKS,ERRS:ERRS,dayKey:dayKey,heDate:heDate,topicName:topicName,sym:sym,errName:errName,sheets:sheets,saveSheet:saveSheet,removeSheet:removeSheet,getSheet:getSheet,sheetScore:sheetScore,byTopic:byTopic,weakTopics:weakTopics,streak:streak,summaryText:summaryText};
})();
