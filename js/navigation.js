const Navigation = {
    totalModules: 6,

    init() {
        this.updateButtons();
    },

    startCourse() {
        this.goToModule(1);
    },

    goToModule(index) {
        if (index < 0 || index > this.totalModules) return;

        // Validasi Progression Lock
        if (index > ProgressState.data.unlockedModule) {
            alert("Selesaikan aktivitas di materi saat ini terlebih dahulu untuk melanjutkan!");
            return;
        }

        document.querySelectorAll('.learning-module').forEach((mod, i) => {
            mod.classList.toggle('active', i === index);
        });

        ProgressState.data.currentModule = index;
        ProgressState.save();

        this.updateDots(index);
        this.updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (index === 5) {
            QuizModule.loadQuiz();
        }
    },

    nextModule() {
        this.goToModule(ProgressState.data.currentModule + 1);
    },

    prevModule() {
        this.goToModule(ProgressState.data.currentModule - 1);
    },

    unlockNext() {
        if (ProgressState.data.unlockedModule < ProgressState.data.currentModule + 1) {
            ProgressState.data.unlockedModule = ProgressState.data.currentModule + 1;
            ProgressState.save();
        }
        this.updateButtons();
    },

    updateButtons() {
        const curr = ProgressState.data.currentModule;
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');

        if (btnPrev) btnPrev.style.display = (curr === 0 || curr === 6) ? 'none' : 'inline-flex';
        if (btnNext) {
            btnNext.style.display = (curr === 0 || curr === 6 || curr === 5) ? 'none' : 'inline-flex';
            btnNext.disabled = (curr >= ProgressState.data.unlockedModule);
        }
    },

    updateDots(index) {
        const dots = document.querySelectorAll('#module-dots .dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
};

window.Navigation = Navigation;