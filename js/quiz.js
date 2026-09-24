const QuizModule = {
    questions: [],
    currentIndex: 0,
    userAnswers: [],

    async loadQuiz() {
        try {
            const resp = await fetch('data/questions.json');
            this.questions = await resp.json();
            this.currentIndex = 0;
            this.userAnswers = new Array(this.questions.length).fill(null);
            this.renderQuestion();
        } catch (e) {
            console.error("Gagal memuat soal evaluasi", e);
        }
    },

    renderQuestion() {
        const q = this.questions[this.currentIndex];
        const container = document.getElementById('quiz-card-container');

        document.getElementById('quiz-current-num').innerText = this.currentIndex + 1;
        document.getElementById('quiz-total-num').innerText = this.questions.length;
        
        const fill = document.getElementById('quiz-progress-fill');
        if (fill) fill.style.width = `${((this.currentIndex + 1) / this.questions.length) * 100}%`;

        let optionsHTML = '';
        if (q.type === 'multiple_choice') {
            optionsHTML = q.options.map((opt, i) => `
                <button class="btn btn-outline w-full text-left mb-2 ${this.userAnswers[this.currentIndex] === i ? 'btn-primary' : ''}" 
                        onclick="QuizModule.selectOption(${i})">
                    ${String.fromCharCode(65 + i)}. ${opt}
                </button>
            `).join('');
        } else {
            optionsHTML = `
                <input type="number" id="quiz-num-input" class="inline-input mb-2" 
                       value="${this.userAnswers[this.currentIndex] !== null ? this.userAnswers[this.currentIndex] : ''}" 
                       placeholder="Jawaban...">
                <button class="btn btn-secondary" onclick="QuizModule.submitNumberInput()">Simpan Jawaban</button>
            `;
        }

        container.innerHTML = `
            <h3>Soal Evaluasi #${q.id} (${q.category})</h3>
            <p class="mb-3">${q.question}</p>
            <div class="options-group">${optionsHTML}</div>
            <div class="nav-quiz-actions mt-4 flex justify-between">
                <button class="btn btn-outline" ${this.currentIndex === 0 ? 'disabled' : ''} onclick="QuizModule.prevQ()">Kiri</button>
                <button class="btn btn-primary" onclick="QuizModule.nextQ()">
                    ${this.currentIndex === this.questions.length - 1 ? 'Kumpulkan' : 'Selanjutnya'}
                </button>
            </div>
        `;
    },

    selectOption(idx) {
        this.userAnswers[this.currentIndex] = idx;
        this.renderQuestion();
    },

    submitNumberInput() {
        const val = parseInt(document.getElementById('quiz-num-input').value);
        if (!isNaN(val)) {
            this.userAnswers[this.currentIndex] = val;
            App.playAudio('success');
        }
    },

    nextQ() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderQuestion();
        } else {
            this.calculateScore();
        }
    },

    prevQ() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderQuestion();
        }
    },

    calculateScore() {
        let correctCount = 0;
        this.questions.forEach((q, i) => {
            if (q.type === 'multiple_choice') {
                if (this.userAnswers[i] === q.answer) correctCount++;
            } else {
                if (this.userAnswers[i] === q.answer) correctCount++;
            }
        });

        const finalScore = Math.round((correctCount / this.questions.length) * 100);
        ProgressState.data.evalScore = finalScore;
        ProgressState.save();

        document.getElementById('final-score-val').innerText = finalScore;
        const label = document.getElementById('grade-label');

        if (finalScore >= 80) {
            label.innerText = "Sangat Baik!";
            label.style.color = "#15803d";
        } else if (finalScore >= 70) {
            label.innerText = "Baik, sedikit lagi!";
            label.style.color = "#0284c7";
        } else {
            label.innerText = "Ayo pelajari kembali bagian yang belum dikuasai.";
            label.style.color = "#b91c1c";
        }

        Navigation.goToModule(6);
    },

    restartQuiz() {
        Navigation.goToModule(5);
    }
};

window.QuizModule = QuizModule;