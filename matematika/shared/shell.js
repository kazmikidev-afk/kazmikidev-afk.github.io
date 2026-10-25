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
  /* גיבוי ענן מאוחד — שני מרחבי-השמות המוכחים של האפליקציות (אלגבריקה + גאומטריקה), אותו endpoint, אותו קוד הסכמה, אותן רשימות מפתחות (כולל matematika-mixed-v1), פעם ביום מכל דף מאוחד. */
  try{
    var CB_URL='https://script.google.com/macros/s/AKfycbxmxolfKtSSXUY6ORmRDmK5VxjI6-Px5gNDDNA9fnhQ5-5ta6_NZQvaWj6jXjA46eja/exec';
    var CB_SETS={algebrika:["algebrika-v3","avichai-game-v1","avichai-plan-seen-v1","avichai-teacher-code-v1","avichai-tracking-v1","matematika-mixed-v1"],
                 geometrika:["geometrika-progress-v2","geometrika-theme","avichai-game-v1","avichai-plan-seen-v1","avichai-teacher-code-v1","avichai-tracking-v1","matematika-mixed-v1"]};
    var code=(localStorage.getItem('avichai-tracking-v1')||'').trim();
    if(code.length===32&&location.hash!=='#restore'){
      var today=new Date().toISOString().slice(0,10);
      if(localStorage.getItem('cb_last_matematika')!==today){
        var done=0;
        Object.keys(CB_SETS).forEach(function(appName){
          var ls={};CB_SETS[appName].forEach(function(k){var v=localStorage.getItem(k);if(v!==null)ls[k]=v});
          fetch(CB_URL,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({code:code,app:appName,payload:{format:'shared-backup-v1',app:appName,savedAt:new Date().toISOString(),localStorage:ls}})})
            .then(function(r){return r.json()}).then(function(j){if(j&&j.ok){done++;if(done===2)localStorage.setItem('cb_last_matematika',today)}}).catch(function(){});
        });
      }
    }
  }catch(_){}

})();
