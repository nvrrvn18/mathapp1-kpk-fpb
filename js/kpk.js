(() => {
  let initialized=false;
  const $=id=>document.getElementById(id);
  const feedback=(id,ok,msg)=>{const el=$(id); if(!el)return; el.className='feedback '+(ok?'correct':'wrong'); el.textContent=msg;};
  const numbers=text=>(text.match(/\d+/g)||[]).map(Number);
  const hasMultiples=(text,base,count=3)=>{const vals=numbers(text);return vals.length>=count&&vals.slice(0,count).every(v=>v>0&&v%base===0)};
  function parseProduct(text){
    if(!text) return NaN;
    let s=String(text).toLowerCase().replace(/\s/g,'').replace(/×|x/g,'*').replace(/²/g,'^2').replace(/³/g,'^3');
    const parts=s.split('*').filter(Boolean); let product=1;
    for(const p of parts){const m=p.match(/^(\d+)(?:\^(\d+))?$/); if(!m)return NaN; product*=Math.pow(Number(m[1]),Number(m[2]||1));}
    return product;
  }
  function renderNumberLine(id,step,max=24){
    const root=$(id); if(!root)return; root.innerHTML='';
    for(let n=0;n<=max;n+=step){const p=document.createElement('span');p.className='number-point'+(n===12?' common':'');p.textContent=n;root.appendChild(p);}
  }
  function updateA1Flow(){
    const state=LearnProgress.get().activity1; const keys=['jump','multiples','prime','application'];
    document.querySelectorAll('#activity1Flow span').forEach((el,i)=>{if(i===0||state[keys[i-1]])el.classList.add('done');else el.classList.remove('done')});
    if(state.completed){$('activity1Complete')?.classList.remove('hidden'); $('activity1Next').disabled=false;}
  }
  function startLampSimulation(){
    const btn=$('startLampSimulation'); if(btn.disabled)return; btn.disabled=true; $('lampResult').classList.add('hidden'); let t=0;
    const step=()=>{
      $('lampTimer').textContent=t; const a=t%4===0,b=t%6===0;
      $('lampA').classList.toggle('on',a);$('lampB').classList.toggle('on',b);
      $('lampStatus').textContent=a&&b?(t===0?'Keduanya mulai bersama.':'Keduanya menyala bersama!'):a?'Lampu A menyala.':b?'Lampu B menyala.':'Amati kelipatannya...';
      if((a||b)&&window.AppUtilities?.beep) AppUtilities.beep(a&&b?660:460,.055);
      if(t===12){clearInterval(timer);setTimeout(()=>{$('lampResult').classList.remove('hidden');LearnProgress.setFlag('meeting1','simulation');btn.disabled=false;btn.textContent='↻ Ulangi Simulasi';},300);}
      t++;
    };
    step(); const timer=setInterval(step,320);
  }
  function animateLines(){
    const pts=[...document.querySelectorAll('#lineFour .number-point,#lineSix .number-point')];pts.forEach(p=>p.classList.remove('visible'));
    pts.forEach((p,i)=>setTimeout(()=>p.classList.add('visible'),i*120));
    setTimeout(()=>LearnProgress.setFlag('meeting1','pattern'),Math.min(1600,pts.length*120));
  }
  function checkJump(){
    const inputs=[...document.querySelectorAll('#jumpFour input,#jumpSix input')];let ok=true;
    inputs.forEach(inp=>{const pass=Number(inp.value)===Number(inp.dataset.answer);inp.classList.toggle('valid',pass);inp.classList.toggle('invalid',!pass);ok&&=pass;});
    feedback('jumpFeedback',ok,ok?'✓ Pola lompatanmu benar. Titik pertemuan pertama ada di 12.':'Belum tepat. Perhatikan besar lompatan +4 dan +6 dari angka sebelumnya.');
    if(ok){LearnProgress.setFlag('activity1','jump');updateA1Flow();}
  }
  function checkMultiples(){
    const ok=hasMultiples($('a1m3').value,3)&&hasMultiples($('a1m5').value,5)&&Number($('a1kpk35').value)===15&&hasMultiples($('a1m6').value,6)&&hasMultiples($('a1m9').value,9)&&Number($('a1kpk69').value)===18;
    feedback('a1MultiplesFeedback',ok,ok?'✓ Daftar kelipatan dan KPK sudah tepat.':'Periksa lagi: tulis sedikitnya tiga kelipatan yang benar, lalu pilih kelipatan persekutuan terkecil.');
    if(ok){LearnProgress.setFlag('activity1','multiples');updateA1Flow();}
  }
  function checkPrime(){
    const ok=parseProduct($('a1f8').value)===8&&parseProduct($('a1f12').value)===12&&Number($('a1kpk812').value)===24&&parseProduct($('a1f10').value)===10&&parseProduct($('a1f15').value)===15&&Number($('a1kpk1015').value)===30;
    feedback('a1PrimeFeedback',ok,ok?'✓ Faktorisasi dan KPK benar.':'Belum tepat. Pecah bilangan menjadi faktor prima, lalu ambil setiap faktor dengan pangkat terbesar.');
    if(ok){LearnProgress.setFlag('activity1','prime');updateA1Flow();}
  }
  function checkBus(){
    const strategy=$('a1Strategy').value.trim(),answer=Number($('a1BusAnswer').value); const ok=strategy.length>=5&&answer===24;
    feedback('a1BusFeedback',ok,ok?'✓ Benar. KPK dari 6 dan 8 adalah 24 menit.':answer!==24?'Belum tepat. Cari kelipatan pertama yang sama dari 6 dan 8.':'Tuliskan juga strategi atau langkah penyelesaianmu.');
    if(ok){LearnProgress.setFlag('activity1','application');updateA1Flow();}
  }
  function saveReflection(){
    const ok=$('a1Reflection').value.trim().length>=8;feedback('a1ReflectionFeedback',ok,ok?'✓ Refleksi tersimpan.':'Tuliskan setidaknya satu kalimat singkat tentang caramu menemukan KPK.');
    if(ok){LearnProgress.setFlag('activity1','reflection');updateA1Flow(); if(LearnProgress.get().activity1.completed) AppUtilities?.confetti?.();}
  }
  function bindMeeting1(){
    renderNumberLine('lineFour',4);renderNumberLine('lineSix',6);
    $('startLampSimulation')?.addEventListener('click',startLampSimulation);$('animateNumberLines')?.addEventListener('click',animateLines);
    $('checkAlarmAnswer')?.addEventListener('click',()=>{const ok=Number($('alarmAnswer').value)===40;feedback('alarmFeedback',ok,ok?'✓ Benar! Kelipatan pertama yang sama dari 5 dan 8 adalah 40.':'Belum tepat. Coba tuliskan beberapa kelipatan dari 5 dan 8.');if(ok)LearnProgress.setFlag('meeting1','challenge');});
    $('alarmHintBtn')?.addEventListener('click',()=>feedback('alarmFeedback',false,'Petunjuk: tulis 5, 10, 15, ... dan 8, 16, 24, ... sampai menemukan angka yang sama.'));
  }
  function bindActivity1(){
    document.querySelector('[data-check-group="jump"]')?.addEventListener('click',checkJump);$('checkA1Multiples')?.addEventListener('click',checkMultiples);$('checkA1Prime')?.addEventListener('click',checkPrime);$('checkA1Bus')?.addEventListener('click',checkBus);$('saveA1Reflection')?.addEventListener('click',saveReflection);
    updateA1Flow();
  }
  function init(){if(initialized)return;initialized=true;bindMeeting1();bindActivity1();}
  window.KPKModule={init,updateA1Flow,parseProduct};
})();
