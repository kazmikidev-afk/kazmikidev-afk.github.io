/* גליל וחרוט: לוגיקה טהורה (בנייה, בדיקה, מחולל שאלות, אחסון). בלי מפתחות תשובה לשאלות הרשמיות: כל המספרים נוצרים כאן. */
window.SOLIDS=(function(){
var KEY='matematika-solids-v1';
function rint(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
/* ---------- אחסון ---------- */
function read(){try{var o=JSON.parse(localStorage.getItem(KEY));if(o&&o.v===1)return o}catch(e){}return{v:1,leitner:{},calc:{},sessions:[]}}
function write(o){try{localStorage.setItem(KEY,JSON.stringify(o));return true}catch(e){return false}}
var DAY=86400000,GAPS=[0,0,DAY,3*DAY,7*DAY];
function leitnerSet(id,ok){var o=read(),c=o.leitner[id]||{b:1,due:0};c.b=ok?Math.min(4,c.b+1):1;c.due=Date.now()+GAPS[c.b];o.leitner[id]=c;return write(o)}
function isDue(id){var c=read().leitner[id];return !c||c.due<=Date.now()}
function calcSet(type,ok){var o=read(),c=o.calc[type]||{n:0,ok:0};c.n++;if(ok)c.ok++;o.calc[type]=c;return write(o)}
function sessionAdd(kind,score,total){var o=read();o.sessions.push({t:new Date().toISOString(),kind:kind,score:score,total:total});o.sessions=o.sessions.slice(-30);return write(o)}
/* ---------- בנייה של נוסחאות מאסימונים ---------- */
function canon(tokens){
  var terms=[[]];
  tokens.forEach(function(t){
    if(t==='+'){terms.push([]);return}
    if(t==='r²'){terms[terms.length-1].push('r','r');return}
    terms[terms.length-1].push(t);
  });
  if(terms.some(function(x){return !x.length}))return null;
  return terms.map(function(x){return x.slice().sort().join('·')}).sort().join(' + ');
}
var TARGETS=[
 {id:'circ',name:'היקף מעגל',sym:'P',unit:'ס״מ',ans:['2','π','r'],extra:['h','⅓'],
  steps:[{q:'היקף המעגל הוא…',o:['האורך של הקו סביב המעגל','האורך של הקו שעובר במרכז','השטח שבתוך המעגל'],ok:0},
         {q:'כמה רדיוסים יש בקוטר?',o:['1','2','3'],ok:1},
         {q:'היקף = π × ___',o:['קוטר','רדיוס','שטח'],ok:0}]},
 {id:'circarea',name:'שטח מעגל',sym:'S',unit:'סמ״ר',ans:['π','r²'],extra:['2','h'],
  steps:[{q:'ריבוע שצלעו r (הרדיוס) הוא שטח של…',o:['r · r','2 · r','π · r'],ok:0},
         {q:'שטח המעגל הוא בערך כמה ריבועי רדיוס?',o:['בערך 3.14, זה π','בערך 2','בערך 6'],ok:0}]},
 {id:'cyllat',name:'שטח המעטפת של גליל',sym:'S',unit:'סמ״ר',ans:['2','π','r','h'],extra:['r²','⅓'],
  steps:[{q:'כשפורסים את המעטפת של הגליל מתקבל…',o:['מלבן','משולש','מעגל'],ok:0},
         {q:'רוחב המלבן הפרוש הוא…',o:['היקף הבסיס, 2πr','שטח הבסיס, πr²','הרדיוס, r'],ok:0},
         {q:'גובה המלבן הפרוש הוא…',o:['גובה הגליל, h','הרדיוס, r','פי 2 מהגובה'],ok:0}]},
 {id:'cyltot',name:'שטח הפנים הכולל של גליל',sym:'S',unit:'סמ״ר',ans:['2','π','r','h','+','2','π','r²'],extra:['⅓','h'],
  steps:[{q:'כמה בסיסים (מעגלים) יש לגליל?',o:['1','2','3'],ok:1},
         {q:'שטח הפנים הכולל הוא…',o:['מעטפת + בסיס אחד','מעטפת + שני בסיסים','מעטפת בלבד'],ok:1},
         {q:'שטח המעטפת הוא…',o:['2πrh','πr²h','πr²'],ok:0}]},
 {id:'cylvol',name:'נפח גליל',sym:'V',unit:'סמ״ק',ans:['π','r²','h'],extra:['2','⅓'],
  steps:[{q:'את הגליל אפשר לבנות מ…',o:['שכבות זהות, כל אחת בגודל הבסיס','שכבות של מעטפת','קטרים'],ok:0},
         {q:'שטח הבסיס הוא…',o:['πr²','2πr','2πrh'],ok:0},
         {q:'כמה שכבות של סנטימטר אחד יש בגובה h?',o:['h שכבות','r שכבות','2 שכבות'],ok:0}]},
 {id:'conevol',name:'נפח חרוט',sym:'V',unit:'סמ״ק',ans:['⅓','π','r²','h'],extra:['2','+'],
  steps:[{q:'כמה חרוטים מלאים (אותו בסיס ואותו גובה) ממלאים גליל אחד?',o:['2','3','4'],ok:1},
         {q:'לכן נפח החרוט הוא…',o:['פי 3 מנפח הגליל','שליש מנפח הגליל','חצי מנפח הגליל'],ok:1},
         {q:'נפח הגליל עם אותו בסיס וגובה הוא…',o:['πr²h','2πrh','πrh'],ok:0}]}
];
function target(id){for(var i=0;i<TARGETS.length;i++)if(TARGETS[i].id===id)return TARGETS[i]}
function pool(t){var p=t.ans.slice();
  /* משלימים 2 מסיחים שלא מופיעים כבר במלואם */
  var ex=shuffle(t.extra).slice(0,2);return shuffle(p.concat(ex))}
function check(t,tokens){return canon(tokens)===canon(t.ans)}
function show(tokens){return tokens.join('·').replace(/·\+·/g,' + ')}
/* ---------- שאלות מושגים ויחידות ---------- */
var CONCEPTS=[
 {id:'u-vol',q:'באיזו יחידה נמדד נפח, כשהמידות בס״מ?',o:['ס״מ','סמ״ר','סמ״ק'],ok:2},
 {id:'u-area',q:'באיזו יחידה נמדד שטח המעטפת, כשהמידות בס״מ?',o:['ס״מ','סמ״ר','סמ״ק'],ok:1},
 {id:'u-circ',q:'באיזו יחידה נמדד היקף הבסיס, כשהמידות בס״מ?',o:['ס״מ','סמ״ר','סמ״ק'],ok:0},
 {id:'c-roll',q:'מגלגלים דף מלבני לצינור. מה מייצג הצלע שמקיפה את הצינור?',o:['את היקף הבסיס','את הרדיוס','את שטח הבסיס'],ok:0},
 {id:'c-slant',q:'הקשר בין הרדיוס, הגובה והקו הצדדי של חרוט הוא לפי…',o:['משפט פיתגורס','שטח מעגל','נפח גליל'],ok:0},
 {id:'c-axial',q:'חתך צירי של גליל הוא…',o:['מלבן, רוחבו 2r וגובהו h','משולש','מעגל'],ok:0}
];
/* ---------- מחולל תרגילים ---------- */
var TRIPLES=[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[12,16,20]];
var PI_NOTE='ענו כמספר שלפני ה-π';
function g_cylvol(){var r=rint(2,9),h=rint(2,12);return{type:'cylvol',pi:true,unit:'סמ״ק',text:'גליל: רדיוס הבסיס '+r+' ס״מ וגובהו '+h+' ס״מ. מהו נפחו? '+PI_NOTE+'.',ans:r*r*h,sol:'V = π·r²·h = π·'+r+'²·'+h+' = '+r*r*h+'π'}}
function g_cyllat(){var r=rint(2,9),h=rint(2,12);return{type:'cyllat',pi:true,unit:'סמ״ר',text:'גליל: רדיוס '+r+' ס״מ וגובה '+h+' ס״מ. מהו שטח המעטפת? '+PI_NOTE+'.',ans:2*r*h,sol:'S = 2π·r·h = 2π·'+r+'·'+h+' = '+2*r*h+'π'}}
function g_cyltot(){var r=rint(2,8),h=rint(2,12);return{type:'cyltot',pi:true,unit:'סמ״ר',text:'גליל: רדיוס '+r+' ס״מ וגובה '+h+' ס״מ. מהו שטח הפנים הכולל (מעטפת ושני בסיסים)? '+PI_NOTE+'.',ans:2*r*h+2*r*r,sol:'מעטפת 2π·'+r+'·'+h+' = '+2*r*h+'π; שני בסיסים 2·π·'+r+'² = '+2*r*r+'π; יחד '+(2*r*h+2*r*r)+'π'}}
function g_cylrevh(){var r=rint(2,8),h=rint(2,12),V=r*r*h;return{type:'cylrev',pi:false,unit:'ס״מ',text:'נפח גליל הוא '+V+'π סמ״ק ורדיוס בסיסו '+r+' ס״מ. מהו גובהו?',ans:h,sol:'V = π·r²·h ← '+V+' = '+r+'²·h ← h = '+V+' ÷ '+r*r+' = '+h}}
function g_cylrevr(){var r=rint(2,8),h=rint(2,12),V=r*r*h;return{type:'cylrev',pi:false,unit:'ס״מ',text:'נפח גליל הוא '+V+'π סמ״ק וגובהו '+h+' ס״מ. מהו רדיוס בסיסו?',ans:r,sol:'V = π·r²·h ← '+V+' = r²·'+h+' ← r² = '+r*r+' ← r = '+r}}
function conepair(){var r,h;do{r=rint(2,9);h=rint(2,12)}while((r*r*h)%3!==0);return[r,h]}
function g_conevol(){var p=conepair(),r=p[0],h=p[1];return{type:'conevol',pi:true,unit:'סמ״ק',text:'חרוט: רדיוס הבסיס '+r+' ס״מ וגובהו '+h+' ס״מ. מהו נפחו? '+PI_NOTE+'.',ans:r*r*h/3,sol:'V = ⅓·π·r²·h = ⅓·π·'+r+'²·'+h+' = '+r*r*h/3+'π'}}
function g_slant(){var t=pick(TRIPLES),k=rint(0,1);if(k===0)return{type:'slant',pi:false,unit:'ס״מ',text:'חרוט: רדיוס הבסיס '+t[0]+' ס״מ וגובהו '+t[1]+' ס״מ. מהו אורך הקו הצדדי (הצלע של החרוט)?',ans:t[2],sol:'l² = r² + h² = '+t[0]*t[0]+' + '+t[1]*t[1]+' = '+t[2]*t[2]+' ← l = '+t[2]};
  return{type:'slant',pi:false,unit:'ס״מ',text:'חרוט: רדיוס הבסיס '+t[0]+' ס״מ והקו הצדדי '+t[2]+' ס״מ. מהו גובה החרוט?',ans:t[1],sol:'h² = l² − r² = '+t[2]*t[2]+' − '+t[0]*t[0]+' = '+t[1]*t[1]+' ← h = '+t[1]}}
function g_coneh(){var p=conepair(),r=p[0],h=p[1],V=r*r*h/3;return{type:'conerev',pi:false,unit:'ס״מ',text:'נפח חרוט הוא '+V+'π סמ״ק ורדיוס בסיסו '+r+' ס״מ. מהו גובהו?',ans:h,sol:'V = ⅓·π·r²·h ← '+V+' = ⅓·'+r*r+'·h ← h = 3·'+V+' ÷ '+r*r+' = '+h}}
function g_axial(){var r=rint(2,9),h=rint(3,12),c=rint(0,1);if(c===0)return{type:'axial',pi:false,unit:'סמ״ר',text:'חותכים חרוט לאורך הציר דרך הקודקוד. רדיוס הבסיס '+r+' ס״מ וגובה '+h+' ס״מ. מהו שטח משולש החתך?',ans:r*h,sol:'בסיס המשולש הוא הקוטר 2r = '+2*r+', הגובה h = '+h+'. שטח = '+2*r+'·'+h+' ÷ 2 = '+r*h};
  return{type:'axial',pi:false,unit:'סמ״ר',text:'חותכים גליל לאורך הציר. רדיוס הבסיס '+r+' ס״מ וגובה '+h+' ס״מ. מהו שטח מלבן החתך?',ans:2*r*h,sol:'רוחב המלבן הוא הקוטר 2r = '+2*r+', גובהו h = '+h+'. שטח = '+2*r+'·'+h+' = '+2*r*h}}
function g_roll(){var s=pick([[30,21],[20,10],[24,18],[30,21]]),a=s[0],b=s[1],sw=rint(0,1),c=sw?b:a,hh=sw?a:b,pi=3.14,r=c/(2*pi),V=pi*r*r*hh;
  return{type:'roll',pi:false,unit:'סמ״ק',tol:0.02,text:'גוללים דף מלבני '+a+'×'+b+' ס״מ לצינור (בלי חפיפה), כך שהצלע של '+c+' ס״מ מקיפה את הצינור והצלע של '+hh+' ס״מ היא הגובה. מהו נפח הצינור? (π = 3.14. מספיק מספר שלם, מתקבלת סטייה של עד 2%.)',ans:V,sol:'היקף הבסיס '+c+' = 2πr ← r = '+c+' ÷ 6.28 ≈ '+r.toFixed(2)+'. V = π·r²·h ≈ 3.14·'+(r*r).toFixed(2)+'·'+hh+' ≈ '+Math.round(V)}}
function g_scale(){var k=pick([2,3]),kind=pick(['r','h','both']),cone=pick([0,1]),nm=cone?'חרוט':'גליל',f=kind==='r'?k*k:kind==='h'?k:k*k*k,
  what=kind==='r'?'הרדיוס גדל פי '+k+' והגובה לא משתנה':kind==='h'?'הגובה גדל פי '+k+' והרדיוס לא משתנה':'הרדיוס והגובה גדלים שניהם פי '+k;
  var why=kind==='r'?'הרדיוס מופיע בריבוע: '+k+'² = '+f:kind==='h'?'הגובה מופיע פעם אחת: פי '+k:'הרדיוס בריבוע וגם הגובה: '+k+'²·'+k+' = '+f;
  return{type:'scale',pi:false,unit:'פעמים',text:nm+': '+what+'. פי כמה גדל הנפח?',ans:f,sol:why+(cone?' (גם בחרוט, כי ⅓ לא משתנה)':'')}}
function g_price(){var r1=rint(2,5),h1=rint(3,8),r2=rint(2,5),h2=rint(3,8),v1=r1*r1*h1,v2=r2*r2*h2,p1,p2;
  var guard=0;do{p1=rint(8,30)*5;p2=rint(8,30)*5;guard++}while((Math.abs(p1/v1-p2/v2)<0.15*Math.min(p1/v1,p2/v2))&&guard<200);
  var a=p1/v1<p2/v2;
  return{type:'price',mc:true,text:'שתי קופסאות שימורים בצורת גליל. א: רדיוס '+r1+' וגובה '+h1+', מחיר '+p1+' ש״ח. ב: רדיוס '+r2+' וגובה '+h2+', מחיר '+p2+' ש״ח. איזו משתלמת יותר לפי מחיר ליחידת נפח?',opts:['א','ב'],ok:a?0:1,sol:'נפח א = π·'+r1+'²·'+h1+' = '+v1+'π, מחיר ליחידה '+(p1/v1).toFixed(2)+'/π. נפח ב = '+v2+'π, מחיר ליחידה '+(p2/v2).toFixed(2)+'/π. '+(a?'א':'ב')+' זולה יותר ליחידה.'}}
function g_coneslant(){var t=pick(TRIPLES),r=t[0],h=t[1],l=t[2];return{type:'coneslant',pi:true,unit:'סמ״ק',hard:true,text:'חרוט: רדיוס הבסיס '+r+' ס״מ והקו הצדדי '+l+' ס״מ. מהו נפחו? '+PI_NOTE+'.',ans:r*r*h/3,sol:'h² = l² − r² = '+l*l+' − '+r*r+' = '+h*h+' ← h = '+h+'. V = ⅓·π·r²·h = ⅓·π·'+r*r+'·'+h+' = '+r*r*h/3+'π'}}
function g_latvol(){var r=rint(2,8),h=rint(3,12),L=2*r*h;return{type:'latvol',pi:true,unit:'סמ״ק',hard:true,text:'שטח המעטפת של גליל הוא '+L+'π סמ״ר ורדיוס בסיסו '+r+' ס״מ. מהו נפחו? '+PI_NOTE+'.',ans:r*r*h,sol:'2π·r·h = '+L+'π ← '+2*r+'·h = '+L+' ← h = '+h+'. V = π·r²·h = π·'+r*r+'·'+h+' = '+r*r*h+'π'}}
function g_opencan(){var r=rint(2,8),h=rint(2,12);return{type:'opencan',pi:true,unit:'סמ״ר',hard:true,text:'כוס גלילית פתוחה למעלה (בלי מכסה): רדיוס '+r+' ס״מ וגובה '+h+' ס״מ. כמה חומר דרוש (מעטפת ובסיס אחד)? '+PI_NOTE+'.',ans:2*r*h+r*r,sol:'מעטפת 2π·'+r+'·'+h+' = '+2*r*h+'π; בסיס אחד π·'+r+'² = '+r*r+'π; יחד '+(2*r*h+r*r)+'π'}}
function g_axvol(){var p=conepair(),r=p[0],h=p[1],A=r*h;return{type:'axvol',pi:true,unit:'סמ״ק',hard:true,text:'שטח משולש החתך הצירי של חרוט הוא '+A+' סמ״ר, ורדיוס בסיסו '+r+' ס״מ. מהו נפח החרוט? '+PI_NOTE+'.',ans:r*r*h/3,sol:'שטח החתך = 2r·h ÷ 2 = r·h ← '+r+'·h = '+A+' ← h = '+h+'. V = ⅓·π·'+r*r+'·'+h+' = '+r*r*h/3+'π'}}
function g_pour(){var r=rint(2,6),h=pick([12,24]),big=pick([1,2]);var R=big===1?r:2*r;return{type:'pour',pi:false,unit:'ס״מ',hard:true,text:'חרוט מלא מים: רדיוס בסיסו '+r+' ס״מ וגובהו '+h+' ס״מ. שופכים את כל המים לגליל ריק שרדיוס בסיסו '+R+' ס״מ. מהו גובה המים בגליל?',ans:big===1?h/3:h/12,sol:'נפח המים = ⅓·π·'+r*r+'·'+h+' = '+r*r*h/3+'π. בגליל: π·'+R*R+'·x = '+r*r*h/3+'π ← x = '+(big===1?h/3:h/12)}}
function g_totrev(){var r=rint(2,7),h=rint(2,12),T=2*r*h+2*r*r;return{type:'totrev',pi:false,unit:'ס״מ',hard:true,text:'שטח הפנים הכולל של גליל הוא '+T+'π סמ״ר ורדיוס בסיסו '+r+' ס״מ. מהו גובהו?',ans:h,sol:'2π·r·h + 2π·r² = '+T+'π ← '+2*r+'h + '+2*r*r+' = '+T+' ← '+2*r+'h = '+2*r*h+' ← h = '+h}}
var GENS={cylvol:g_cylvol,cyllat:g_cyllat,cyltot:g_cyltot,cylrev:function(){return Math.random()<.5?g_cylrevh():g_cylrevr()},conevol:g_conevol,slant:g_slant,conerev:g_coneh,coneslant:g_coneslant,latvol:g_latvol,opencan:g_opencan,axvol:g_axvol,pour:g_pour,totrev:g_totrev,axial:g_axial,roll:g_roll,scale:g_scale,price:g_price};
var HARD_SET=['coneslant','latvol','opencan','axvol','pour','totrev','roll','scale','price','cylrev','conerev','axial','cyltot'],BASIC_SET=['cylvol','cyllat','cyltot','cylrev','conevol','slant','conerev','axial','roll','scale','price'];
var TYPE_NAMES={cylvol:'נפח גליל',cyllat:'מעטפת גליל',cyltot:'שטח כולל של גליל',cylrev:'גליל: מציאת גובה או רדיוס',conevol:'נפח חרוט',slant:'פיתגורס בחרוט',conerev:'חרוט: מציאת גובה',coneslant:'נפח חרוט מקו צדדי',latvol:'נפח גליל ממעטפת',opencan:'כוס פתוחה',axvol:'נפח חרוט מחתך צירי',pour:'שפיכה בין גוף לגוף',totrev:'גובה משטח כולל',axial:'חתך צירי',roll:'גלילת דף',scale:'שינוי מידות',price:'מחיר ליחידת נפח'};
function genSet(n,types){var ts=types&&types.length?types:HARD_SET,out=[],last='';
  var order=shuffle(ts);
  for(var i=0;i<n;i++){var t=order[i%order.length];if(i>0&&i%order.length===0)order=shuffle(ts);out.push(GENS[t]())}return out}
function parseNum(s){s=String(s).trim().replace(',','.').replace(/\s+/g,'');if(!s)return NaN;var m=/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(s);if(m)return parseFloat(m[1])/parseFloat(m[2]);if(!/^-?\d+(?:\.\d+)?$/.test(s))return NaN;return parseFloat(s)}
function checkNum(q,input){var v=parseNum(input);if(isNaN(v))return false;var tol=q.tol||0.0001;return Math.abs(v-q.ans)<=Math.max(tol*Math.abs(q.ans),0.0001)}
return{KEY:KEY,TARGETS:TARGETS,CONCEPTS:CONCEPTS,TYPE_NAMES:TYPE_NAMES,HARD_SET:HARD_SET,BASIC_SET:BASIC_SET,GENS:GENS,target:target,pool:pool,check:check,canon:canon,show:show,genSet:genSet,checkNum:checkNum,parseNum:parseNum,shuffle:shuffle,read:read,leitnerSet:leitnerSet,isDue:isDue,calcSet:calcSet,sessionAdd:sessionAdd,rint:rint};
})();
