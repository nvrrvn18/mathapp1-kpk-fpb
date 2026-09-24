const ProgressState = {
    STORAGE_KEY: 'kpk_fpb_progress_v1',
    data: {
        currentModule: 0,
        unlockedModule: 0,
        activity1Completed: false,
        activity2Completed: false,
        evalScore: 0
    },

    init() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                this.data = JSON.parse(saved);
            } catch (e) {
                console.error("Gagal membaca progress", e);
            }
        }
        this.updateUI();
    },

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        this.updateUI();
    },

    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        location.reload();
    },

    updateUI() {
        const percentage = Math.round((this.data.unlockedModule / 5) * 100);
        const fill = document.getElementById('progress-fill');
        const text = document.getElementById('progress-percentage');
        
        if (fill) fill.style.width = `${Math.min(percentage, 100)}%`;
        if (text) text.innerText = `${Math.min(percentage, 100)}%`;
    }
};

window.ProgressState = ProgressState;