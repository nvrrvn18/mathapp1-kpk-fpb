const KpkModule = {
    runLampSimulation() {
        const btn = document.getElementById('btn-start-lamp');
        const timerText = document.getElementById('lamp-timer');
        const lampA = document.getElementById('lamp-a');
        const lampB = document.getElementById('lamp-b');
        const resultBanner = document.getElementById('lamp-result');

        btn.disabled = true;
        let time = 0;
        resultBanner.classList.add('hidden');

        const interval = setInterval(() => {
            time++;
            timerText.innerText = time;

            lampA.classList.toggle('active', time % 4 === 0);
            lampB.classList.toggle('active', time % 6 === 0);

            if (time >= 12) {
                clearInterval(interval);
                btn.disabled = false;
                resultBanner.classList.remove('hidden');
                App.playAudio('success');
                Navigation.unlockNext();
            }
        }, 500);
    },

    switchTab(evt, tabId) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        evt.currentTarget.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    },

    checkP1Quiz() {
        const val = parseInt(document.getElementById('quiz-p1-input').value);
        const feedback = document.getElementById('p1-feedback');
        feedback.classList.remove('hidden');

        if (val === 40) {
            feedback.className = 'feedback-box correct';
            feedback.innerHTML = '<i class="fas fa-check-circle"></i> Benar! Kelipatan persekutuan pertama dari 5 dan 8 adalah 40.';
            App.playAudio('success');
            Navigation.unlockNext();
        } else {
            feedback.className = 'feedback-box incorrect';
            feedback.innerHTML = '<i class="fas fa-times-circle"></i> Belum tepat. Coba tuliskan kelipatan 5 dan 8.';
            App.playAudio('error');
        }
    },

    toggleP1Hint() {
        document.getElementById('p1-hint').classList.toggle('hidden');
    },

    checkActivity1A() {
        const p1 = parseInt(document.getElementById('act1-pattern-1').value);
        const p2 = parseInt(document.getElementById('act1-pattern-2').value);
        const p3 = parseInt(document.getElementById('act1-pattern-3').value);
        const p4 = parseInt(document.getElementById('act1-pattern-4').value);
        const p5 = parseInt(document.getElementById('act1-pattern-5').value);

        const feedback = document.getElementById('act1a-feedback');
        feedback.classList.remove('hidden');

        if (p1 === 8 && p2 === 12 && p3 === 24 && p4 === 12 && p5 === 18) {
            feedback.className = 'feedback-box correct';
            feedback.innerHTML = 'Luar biasa! Semua angka lompatan sudah tepat.';
            App.playAudio('success');
        } else {
            feedback.className = 'feedback-box incorrect';
            feedback.innerHTML = 'Masih ada pola yang keliru. Periksa kembali pertambahan nilainya.';
            App.playAudio('error');
        }
    },

    checkActivity1B() {
        const ans = parseInt(document.getElementById('act1-b1-ans').value);
        const feedback = document.getElementById('act1b-feedback');
        feedback.classList.remove('hidden');

        if (ans === 15) {
            feedback.className = 'feedback-box correct';
            feedback.innerHTML = 'Tepat! KPK dari 3 dan 5 adalah 15.';
            App.playAudio('success');
        } else {
            feedback.className = 'feedback-box incorrect';
            feedback.innerHTML = 'Jawaban KPK (3,5) kurang tepat.';
            App.playAudio('error');
        }
    },

    checkActivity1D() {
        const ans = parseInt(document.getElementById('act1-bus-ans').value);
        const feedback = document.getElementById('act1d-feedback');
        feedback.classList.remove('hidden');

        if (ans === 24) {
            feedback.className = 'feedback-box correct';
            feedback.innerHTML = 'Benar! Bus akan datang bersamaan lagi pada menit ke-24.';
            App.playAudio('success');
        } else {
            feedback.className = 'feedback-box incorrect';
            feedback.innerHTML = 'Jawaban belum tepat. Cari KPK dari 6 dan 8.';
            App.playAudio('error');
        }
    },

    completeActivity1() {
        ProgressState.data.activity1Completed = true;
        Navigation.unlockNext();
        Navigation.goToModule(3);
    }
};

window.KpkModule = KpkModule;