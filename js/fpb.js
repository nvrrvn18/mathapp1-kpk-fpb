(() => {
  let initialized=false; const $=id=>document.getElementById(id);
  const feedback=(id,ok,msg)=>{const el=$(id);if(!el)return;el.className='feedback '+(ok?'correct':'wrong');el.textContent=msg;};
  function renderFruit(){if($('oranges'))$('oranges').innerHTML='🍊'.repeat(12);if($('apples'))$('apples').innerHTML='🍎'.repeat(18);renderPackageDemo();}
  function renderPackageDemo(){const root=$('packageDemo');if(!root)return;root.innerHTML=Array.from({length:6},(_,i)=>`<div class="demo-package" style="animation-delay:${i*.07}s">📦<span>🍊🍊</span><span>🍎🍎🍎</span></div>`).join('');}
  function groupFruit(){const root=$('fruitPackages');root.classList.remove('hidden');root.innerHTML=Array.from({length:6},(_,i)=>`<div class="fruit-package" style="animation-delay:${i*.08}s"><strong>Paket ${i+1}</strong><span>🍊🍊</span><span>🍎🍎🍎</span></div>`).join('');LearnProgress.setFlag('meeting2','grouped');}
  function highlightFactors(){document.querySelectorAll('.factor-number-row span').forEach(el=>{if([1,2,3,6].includes(Number(el.textContent)))el.classList.add('common-factor')});$('factorCommon').classList.remove('hidden');LearnProgress.setFlag('meeting2','factors');}
  const conceptItems=[
    {q:'Dua alarm berbunyi setiap 4 dan 10 menit. Kapan bersama lagi?',a:'kpk'},
    {q:'24 buku dibagi ke kelompok sama besar sebanyak mungkin.',a:'fpb'},
    {q:'Dua jadwal kegiatan berulang setiap 6 dan 9 hari. Kapan bertemu lagi?',a:'kpk'}
  ];
  const conceptAnswers={};
  function renderConceptQuiz(){const root=$('conceptCards');if(!root)return;root.innerHTML=conceptItems.map((it,i)=>`<div class="concept-question"><span>${it.q}</span><div class="choice-row"><button class="choice-btn" data-concept-index="${i}" data-value="kpk" type="button">KPK</button><button class="choice-btn" data-concept-index="${i}" data-value="fpb" type="button">FPB</button></div></div>`).join('');}
  function handleConceptChoice(btn){const i=Number(btn.dataset.conceptIndex),value=btn.dataset.value;conceptAnswers[i]=value;document.querySelectorAll(`[data-concept-index="${i}"]`).forEach(b=>{b.classList.remove('selected','correct','wrong');if(b===btn)b.classList.add(value===conceptItems[i].a?'correct':'wrong')});if(Object.keys(conceptAnswers).length===conceptItems.length&&conceptItems.every((it,j)=>conceptAnswers[j]===it.a))LearnProgress.setFlag('meeting2','concepts');}
  function breadChoice(){
    let selected=null;
    document.querySelectorAll('#breadChoice .choice-btn').forEach(btn=>btn.addEventListener('click',()=>{selected=btn.dataset.value;document.querySelectorAll('#breadChoice .choice-btn').forEach(b=>b.classList.toggle('selected',b===btn));$('breadChoice').dataset.selected=selected;}));
    $('checkBreadChoice')?.addEventListener('click',()=>{
      const value=$('breadChoice').dataset.selected,reason=ChoiceUI.selectedValue('breadReason');
      if(!value){feedback('breadFeedback',false,'Pilih KPK atau FPB terlebih dahulu.');return;}
      const ok=value==='fpb'&&reason==='groups';
      feedback('breadFeedback',ok,ok?'✓ Tepat. FPB digunakan karena kita mencari jumlah paket sama banyak yang paling banyak.':value!=='fpb'?'Masalah ini tentang membagi benda menjadi paket yang sama, bukan mencari waktu pertemuan.':'Pilihan FPB sudah tepat. Sekarang pilih alasan yang sesuai.');
      if(ok)LearnProgress.setFlag('meeting2','challenge');
    });
  }
  function updateA2Flow(){const s=LearnProgress.get().activity2,keys=['grouping','factors','strategy','stories'];document.querySelectorAll('#activity2Flow span').forEach((el,i)=>{if(i===0||s[keys[i-1]])el.classList.add('done');else el.classList.remove('done')});if(s.completed){$('activity2Complete')?.classList.remove('hidden');$('activity2Next').disabled=false;}}
  function renderObjectGrouping(pack){const root=$('objectGrouping');root.innerHTML='';for(let i=0;i<pack;i++){const pencil=12%pack===0?'✏️'.repeat(12/pack):'Tidak rata';const eraser=18%pack===0?'🧽'.repeat(18/pack):'Tidak rata';root.insertAdjacentHTML('beforeend',`<div class="object-pack"><strong>Paket ${i+1}</strong><div>${pencil}</div><div>${eraser}</div></div>`);}document.querySelectorAll('#packageOptions button').forEach(b=>b.classList.toggle('selected',Number(b.dataset.pack)===pack));}
  function checkGrouping(){
    const visualPack=Number(document.querySelector('#packageOptions button.selected')?.dataset.pack||0);
    const ok=visualPack===6&&Number(ChoiceUI.selectedValue('a2PackCount'))===6&&Number(ChoiceUI.selectedValue('a2PencilEach'))===2&&Number(ChoiceUI.selectedValue('a2EraserEach'))===3;
    feedback('a2GroupingFeedback',ok,ok?'✓ Benar. 6 paket adalah jumlah terbanyak, masing-masing berisi 2 pensil dan 3 penghapus.':'Belum tepat. Coba pilih jumlah paket pada visual, lalu cocokkan isi setiap paket.');
    if(ok){LearnProgress.setFlag('activity2','grouping');updateA2Flow();}
  }
  function checkFactors(){
    const p=KPKModule.parseProduct;
    const ok=p($('a2f24').value)===24&&p($('a2f36').value)===36&&ChoiceUI.sameValues('a2list24',[1,2,3,4,6,8,12,24])&&ChoiceUI.sameValues('a2list36',[1,2,3,4,6,9,12,18,36])&&Number(ChoiceUI.selectedValue('a2fpb2436'))===12&&p($('a2f18').value)===18&&p($('a2f30').value)===30&&ChoiceUI.sameValues('a2list18',[1,2,3,6,9,18])&&ChoiceUI.sameValues('a2list30',[1,2,3,5,6,10,15,30])&&Number(ChoiceUI.selectedValue('a2fpb1830'))===6;
    feedback('a2FactorsFeedback',ok,ok?'✓ Faktor, faktorisasi prima, dan pilihan FPB sudah benar.':'Periksa kartu faktor prima, ketuk hanya bilangan yang benar-benar membagi tanpa sisa, lalu pilih FPB terbesar.');
    if(ok){LearnProgress.setFlag('activity2','factors');updateA2Flow();}
  }
  const strategies=[{q:'Dua alarm berbunyi setiap 4 menit dan 10 menit. Kapan berbunyi bersama lagi?',a:'KPK'},{q:'20 kue dan 30 permen dibagi ke paket yang sama banyak.',a:'FPB'},{q:'Dua petugas bekerja setiap 6 hari dan 9 hari. Kapan bekerja bersama lagi?',a:'KPK'}];
  const strategyAnswers={};
  function renderStrategyQuiz(){const root=$('strategyQuiz');root.innerHTML=strategies.map((s,i)=>`<div class="strategy-row"><span>${s.q}</span><div class="choice-row"><button class="choice-btn" data-strategy="${i}" data-value="KPK" type="button">KPK</button><button class="choice-btn" data-strategy="${i}" data-value="FPB" type="button">FPB</button></div></div>`).join('');}
  function strategyClick(btn){const i=Number(btn.dataset.strategy),v=btn.dataset.value;strategyAnswers[i]=v;document.querySelectorAll(`[data-strategy="${i}"]`).forEach(b=>{b.classList.remove('correct','wrong','selected');if(b===btn)b.classList.add(v===strategies[i].a?'correct':'wrong')});const all=strategies.every((s,j)=>strategyAnswers[j]===s.a);feedback('strategyFeedback',all,all?'✓ Ketiga strategi sudah tepat.':'Gunakan KPK untuk kejadian berulang yang bertemu lagi, FPB untuk membagi sama banyak sebanyak mungkin.');if(all){LearnProgress.setFlag('activity2','strategy');updateA2Flow();}}
  function checkStories(){
    const bus=Number(ChoiceUI.selectedValue('a2BusAnswer')),pack=Number(ChoiceUI.selectedValue('a2PackAnswer')),s1=ChoiceUI.selectedValue('a2BusStrategy'),s2=ChoiceUI.selectedValue('a2PackStrategy');
    const ok=bus===24&&pack===12&&s1==='KPK'&&s2==='FPB';
    feedback('a2StoriesFeedback',ok,ok?'✓ Kedua masalah sudah dipasangkan dengan strategi dan hasil yang tepat.':'Cocokkan dulu jenis masalahnya: kejadian berulang memakai KPK, pembagian paket terbanyak memakai FPB.');
    if(ok){LearnProgress.setFlag('activity2','stories');updateA2Flow();}
  }
  function saveReflection(){
    const rows=[...document.querySelectorAll('#a2Reflection [data-reflection-row]')];
    const answered=rows.every(row=>row.querySelector('.tap-choice-group')?.dataset.selected);
    const ok=answered&&rows.every(row=>row.querySelector('.tap-choice-group')?.dataset.selected===row.dataset.answer);
    rows.forEach(row=>{const group=row.querySelector('.tap-choice-group');const pass=group?.dataset.selected===row.dataset.answer;row.classList.toggle('match-correct',!!group?.dataset.selected&&pass);row.classList.toggle('match-wrong',!!group?.dataset.selected&&!pass);});
    feedback('a2ReflectionFeedback',ok,ok?'✓ Semua pasangan tepat. Ringkasan konsep ditampilkan di bawah.':answered?'Masih ada pasangan yang tertukar. Ingat: KPK untuk bertemu kembali, FPB untuk membagi sama banyak.':'Lengkapi semua pasangan KPK atau FPB.');
    if(ok){$('reflectionSummary').classList.remove('hidden');LearnProgress.setFlag('activity2','reflection');updateA2Flow();if(LearnProgress.get().activity2.completed)AppUtilities?.confetti?.();}
  }
  function bind(){
    renderFruit();renderConceptQuiz();renderStrategyQuiz();breadChoice();
    $('groupFruitBtn')?.addEventListener('click',groupFruit);$('highlightFactorsBtn')?.addEventListener('click',highlightFactors);
    document.addEventListener('click',e=>{const c=e.target.closest('[data-concept-index]');if(c)handleConceptChoice(c);const s=e.target.closest('[data-strategy]');if(s)strategyClick(s);const p=e.target.closest('#packageOptions [data-pack]');if(p)renderObjectGrouping(Number(p.dataset.pack));});
    $('checkA2Grouping')?.addEventListener('click',checkGrouping);$('checkA2Factors')?.addEventListener('click',checkFactors);$('checkA2Stories')?.addEventListener('click',checkStories);$('saveA2Reflection')?.addEventListener('click',saveReflection);updateA2Flow();
  }
  function init(){if(initialized)return;initialized=true;bind();}
  window.FPBModule={init,updateA2Flow};
})();
