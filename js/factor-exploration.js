(() => {
  'use strict';

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => [...root.querySelectorAll(sel)];
  const card = q('#factorExplorationCard');
  if (!card) return;

  const factorSets = {
    6: { pairs: [[1,6],[2,3],[3,2],[6,1]], factors: '1, 2, 3, dan 6' },
    12: { pairs: [[1,12],[2,6],[3,4],[4,3],[6,2],[12,1]], factors: '1, 2, 3, 4, 6, dan 12' }
  };

  const primeSets = {
    3: [[1,3],[3,1]],
    5: [[1,5],[5,1]]
  };

  let step = 0;
  let compositeNumber = 6;
  let primeNumber = 3;

  const steps = qa('[data-factor-step]', card);
  const dots = qa('[data-factor-step-dot]', card);
  const prevBtn = q('#factorExplorePrev');
  const nextBtn = q('#factorExploreNext');
  const complete = q('#factorExploreComplete');

  function saveDone() {
    try { localStorage.setItem('kpkFpb_factorExploration_done', '1'); } catch (_) {}
  }

  function renderGrid(target, rows, cols, number) {
    const el = q(target);
    if (!el) return;
    el.innerHTML = '';
    el.classList.toggle('compact-array', Math.max(rows, cols) >= 10);
    el.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    el.style.gridTemplateRows = `repeat(${rows}, auto)`;
    el.dataset.rows = rows;
    el.dataset.cols = cols;
    for (let i = 0; i < number; i++) {
      const cell = document.createElement('span');
      cell.className = 'factor-cell';
      cell.style.animationDelay = `${Math.min(i * 35, 280)}ms`;
      el.appendChild(cell);
    }
  }

  function setCaption(target, rows, cols, number) {
    const cap = q(target);
    if (!cap) return;
    cap.innerHTML = `<strong>${rows} × ${cols} = ${number}</strong> &nbsp;•&nbsp; ${number} kotak tersusun tanpa sisa.`;
  }

  function renderFour(rows = 1, cols = 4) {
    renderGrid('#factorFourGrid', rows, cols, 4);
    setCaption('#factorFourCaption', rows, cols, 4);
  }

  function renderCompositeChoices(number) {
    compositeNumber = number;
    const holder = q('#factorCompositeChoices');
    const badge = q('#factorExploreNumberBadge');
    const info = factorSets[number];
    if (!holder || !info) return;
    badge.textContent = number;
    holder.innerHTML = info.pairs.map(([r,c], i) => `<button class="factor-arrangement-btn${i === 0 ? ' active' : ''}" type="button" data-composite-pair data-rows="${r}" data-cols="${c}">${r} × ${c}</button>`).join('');
    q('#factorCompositeFactors').innerHTML = `<strong>Faktor dari ${number}:</strong> ${info.factors}.`;
    const [r,c] = info.pairs[0];
    renderGrid('#factorCompositeGrid', r, c, number);
    setCaption('#factorCompositeCaption', r, c, number);
  }

  function renderPrimeChoices(number) {
    primeNumber = number;
    const holder = q('#primeArrangementChoices');
    const pairs = primeSets[number];
    if (!holder || !pairs) return;
    holder.innerHTML = pairs.map(([r,c], i) => `<button class="factor-arrangement-btn${i === 0 ? ' active' : ''}" type="button" data-prime-pair data-rows="${r}" data-cols="${c}">${r} × ${c}</button>`).join('');
    const [r,c] = pairs[0];
    renderGrid('#primeFactorGrid', r, c, number);
    setCaption('#primeFactorCaption', r, c, number);
    q('#primeConclusion').innerHTML = `<span>⭐</span><div><strong>${number} adalah bilangan prima.</strong><p>Susunan yang mungkin hanya memakai faktor positif <strong>1 dan ${number}</strong>. Jadi ${number} hanya memiliki dua faktor positif.</p></div>`;
  }

  function showStep(next) {
    step = Math.max(0, Math.min(steps.length - 1, next));
    steps.forEach((el, i) => el.classList.toggle('active', i === step));
    dots.forEach((el, i) => {
      el.classList.toggle('active', i === step);
      el.classList.toggle('done', i < step);
    });
    prevBtn.disabled = step === 0;
    nextBtn.textContent = ['Mulai Contoh →','Lanjut Eksplorasi →','Lihat Bilangan Prima →','Selesai Eksplorasi ✓'][step];
    complete.classList.add('hidden');
    if (step === 1) renderFour();
    if (step === 2) renderCompositeChoices(compositeNumber);
    if (step === 3) renderPrimeChoices(primeNumber);
    card.scrollIntoView({behavior:'smooth', block:'start'});
  }

  q('#factorFourChoices')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-factor-number="4"]');
    if (!btn) return;
    qa('.factor-arrangement-btn', q('#factorFourChoices')).forEach(b => b.classList.toggle('active', b === btn));
    const rows = Number(btn.dataset.rows), cols = Number(btn.dataset.cols);
    renderFour(rows, cols);
  });

  q('#factorNumberSwitch')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-explore-number]');
    if (!btn) return;
    qa('button', q('#factorNumberSwitch')).forEach(b => b.classList.toggle('active', b === btn));
    renderCompositeChoices(Number(btn.dataset.exploreNumber));
  });

  q('#factorCompositeChoices')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-composite-pair]');
    if (!btn) return;
    qa('.factor-arrangement-btn', q('#factorCompositeChoices')).forEach(b => b.classList.toggle('active', b === btn));
    const rows = Number(btn.dataset.rows), cols = Number(btn.dataset.cols);
    renderGrid('#factorCompositeGrid', rows, cols, compositeNumber);
    setCaption('#factorCompositeCaption', rows, cols, compositeNumber);
  });

  q('#primeNumberSwitch')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-prime-number]');
    if (!btn) return;
    qa('button', q('#primeNumberSwitch')).forEach(b => b.classList.toggle('active', b === btn));
    renderPrimeChoices(Number(btn.dataset.primeNumber));
  });

  q('#primeArrangementChoices')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-prime-pair]');
    if (!btn) return;
    qa('.factor-arrangement-btn', q('#primeArrangementChoices')).forEach(b => b.classList.toggle('active', b === btn));
    const rows = Number(btn.dataset.rows), cols = Number(btn.dataset.cols);
    renderGrid('#primeFactorGrid', rows, cols, primeNumber);
    setCaption('#primeFactorCaption', rows, cols, primeNumber);
  });

  prevBtn?.addEventListener('click', () => showStep(step - 1));
  nextBtn?.addEventListener('click', () => {
    if (step < steps.length - 1) return showStep(step + 1);
    saveDone();
    dots.forEach(d => { d.classList.remove('active'); d.classList.add('done'); });
    complete.classList.remove('hidden');
    nextBtn.textContent = 'Eksplorasi Selesai ✓';
    nextBtn.disabled = true;
  });

  renderFour();
  renderCompositeChoices(6);
  renderPrimeChoices(3);
})();
