const FpbModule = {
    selectedP2Choice: null,

    runFruitSimulation() {
        const result = document.getElementById('fruit-sim-result');
        result.classList.remove('hidden');
        App.playAudio('success');
        Navigation.unlockNext();
    },

    selectP2Choice(choice) {
        this.selectedP2Choice = choice;
        document.getElementById('p2-btn-kpk').className = choice === 'KPK' ? 'btn btn-primary' : 'btn btn-outline';
        document.getElementById('p2-btn-fpb').className = choice === 'FPB' ? 'btn btn-primary' : 'btn btn-outline';
        document.getElementById('p2-explanation-box').classList.remove('hidden');
    },

    checkP2Quiz() {
        const feedback = document.getElementById('p2-feedback');
        feedback.classList.remove('hidden');

        if (this.selectedP2Choice === 'FPB') {
            feedback.className = 'feedback-box correct';
            feedback.innerHTML = 'Tepat sekali! Membagi barang menjadi paket sama rata menggunakan FPB.';
            App.playAudio('success');
            Navigation.unlockNext();
        } else {
            feedback.className = 'feedback-box incorrect';
            feedback.innerHTML = 'Kurang tepat. Mengelompokkan barang sama rata membutuhkan FPB.';
            App.playAudio('error');
        }
    },

    checkActivity2A() {
        const pkt = parseInt(document.getElementById('act2-paket-ans').value);
        const pen = parseInt(document.getElementById('act2-pensil-ans').value);
        const pgh = parseInt(document.getElementById('act2-penghapus-ans').value);

        const feedback = document.getElementById('act2a-feedback');
        feedback.classList.remove('hidden');

        if (pkt === 6 && pen === 2 && pgh === 3) {
            feedback.className = 'feedback-box correct';
            feedback.innerHTML = 'Sangat baik! 6 paket berisi masing-masing 2 pensil dan 3 penghapus.';
            App.playAudio('success');
        } else {
            feedback.className = 'feedback-box incorrect';
            feedback.innerHTML = 'Hitungan paket atau isinya belum pas.';
            App.playAudio('error');
        }
    },

    answerStrategy(num, choice, btnEl) {
        const parent = btnEl.parentElement;
        parent.querySelectorAll('button').forEach(b => b.className = 'btn btn-sm btn-outline');
        
        const correctAnswers = { 1: 'KPK', 2: 'FPB', 3: 'KPK' };

        if (choice === correctAnswers[num]) {
            btnEl.className = 'btn btn-sm btn-primary';
            App.playAudio('success');
        } else {
            btnEl.className = 'btn btn-sm btn-outline danger';
            App.playAudio('error');
        }
    },

    checkActivity2D() {
        const ans = parseInt(document.getElementById('act2-problem-ans').value);
        const feedback = document.getElementById('act2d-feedback');
        feedback.classList.remove('hidden');

        if (ans === 12) {
            feedback.className = 'feedback-box correct';
            feedback.innerHTML = 'Tepat! FPB(24, 36) = 12 paket.';
            App.playAudio('success');
        } else {
            feedback.className = 'feedback-box incorrect';
            feedback.innerHTML = 'Belum tepat. Cari faktor persekutuan terbesar dari 24 dan 36.';
            App.playAudio('error');
        }
    },

    completeActivity2() {
        ProgressState.data.activity2Completed = true;
        Navigation.unlockNext();
        Navigation.goToModule(5);
    }
};

window.FpbModule = FpbModule;