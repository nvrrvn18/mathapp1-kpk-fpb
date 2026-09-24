const App = {
    soundEnabled: true,

    init() {
        ProgressState.init();
        Navigation.init();
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('btn-reset')?.addEventListener('click', () => {
            if (confirm("Reset seluruh hasil belajar dari awal?")) {
                ProgressState.reset();
            }
        });

        document.getElementById('btn-sound')?.addEventListener('click', (e) => {
            this.soundEnabled = !this.soundEnabled;
            e.currentTarget.classList.toggle('disabled', !this.soundEnabled);
        });
    },

    playAudio(type) {
        if (!this.soundEnabled) return;
        const audio = document.getElementById(`sfx-${type}`);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;