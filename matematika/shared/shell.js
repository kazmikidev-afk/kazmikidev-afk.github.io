(function(){
  var me=document.currentScript;
  var subj=me.getAttribute('data-subject')||'home';
  var prefix=me.getAttribute('data-prefix')||'';
  var bar=document.createElement('div');bar.className='uni-bar';
  bar.innerHTML='<a class="uni-logo" href="'+prefix+'index.html">Σ△</a>'
    +'<a class="uni-brand" href="'+prefix+'index.html">מתמטיקה בקצב שלך</a>'
    +'<div class="uni-tabs">'
    +'<a class="uni-tab'+(subj==='home'?' on':'')+'" href="'+prefix+'index.html">הכל</a>'
    +'<a class="uni-tab'+(subj==='algebra'?' on':'')+'" href="'+prefix+'algebra/index.html">אלגברה</a>'
    +'<a class="uni-tab'+(subj==='geometry'?' on':'')+'" href="'+prefix+'geometry/index.html">גאומטריה</a>'
    +'</div>';
  document.body.insertBefore(bar,document.body.firstChild);
})();
