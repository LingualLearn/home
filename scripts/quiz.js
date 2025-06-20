// Quiz functionality
const questions = [
  {
    id: 1,
    question: "What does 'Hola' mean in English?",
    options: ["Goodbye", "Hello", "Thank you", "Please"],
    correct: 1,
    language: "Spanish",
    explanation: "'Hola' is the most common way to say 'Hello' in Spanish.",
  },
  {
    id: 2,
    question: "How do you say 'Thank you' in French?",
    options: ["Bonjour", "Au revoir", "Merci", "S'il vous plaît"],
    correct: 2,
    language: "French",
    explanation: "'Merci' means 'Thank you' in French.",
  },
  {
    id: 3,
    question: "What does 'Guten Tag' mean?",
    options: ["Good night", "Good morning", "Good day", "Goodbye"],
    correct: 2,
    language: "German",
    explanation: "'Guten Tag' is a formal way to say 'Good day' in German.",
  },
  {
    id: 4,
    question: "How do you say 'Water' in Spanish?",
    options: ["Agua", "Fuego", "Tierra", "Aire"],
    correct: 0,
    language: "Spanish",
    explanation: "'Agua' means 'Water' in Spanish.",
  },
  {
    id: 5,
    question: "What does 'Je suis' mean in English?",
    options: ["You are", "I am", "He is", "We are"],
    correct: 1,
    language: "French",
    explanation: "'Je suis' means 'I am' in French.",
  },
]
// don't mess this code up, this is crucial
class Quiz {
  constructor() {
    this.currentQuestion = 0
    this.selectedAnswer = null
    this.showResult = false
    this.score = 0
    this.answers = []
    this.quizCompleted = false

    this.init()
  }

  init() {
    this.updateProgressBar()
    this.renderQuestion()
    this.bindEvents()
  }

  bindEvents() {
    const restartBtn = document.getElementById("restart-quiz")
    if (restartBtn) {
      restartBtn.addEventListener("click", () => this.resetQuiz())
    }
  }

  updateProgressBar() {
    const progress = ((this.currentQuestion + 1) / questions.length) * 100
    const progressBar = document.getElementById("progress-bar")
    const currentQuestionSpan = document.getElementById("current-question")
    const totalQuestionsSpan = document.getElementById("total-questions")

    if (progressBar) progressBar.style.width = `${progress}%`
    if (currentQuestionSpan) currentQuestionSpan.textContent = this.currentQuestion + 1
    if (totalQuestionsSpan) totalQuestionsSpan.textContent = questions.length
  }

  renderQuestion() {
    if (this.quizCompleted) {
      this.showResults()
      return
    }

    const question = questions[this.currentQuestion]
    const quizContent = document.getElementById("quiz-content")

    quizContent.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <div>
                        <h2 class="question-text">${question.question}</h2>
                    </div>
                    <span class="language-badge">${question.language}</span>
                </div>
                <div class="options-container">
                    ${question.options
                      .map(
                        (option, index) => `
                        <button class="option-button" data-index="${index}" ${this.showResult ? "disabled" : ""}>
                            <span>${option}</span>
                            <span class="option-icon" id="icon-${index}"></span>
                        </button>
                    `,
                      )
                      .join("")}
                    
                    ${
                      this.showResult
                        ? `
                        <div class="explanation">
                            <p class="explanation-text">
                                <strong>Explanation:</strong> ${question.explanation}
                            </p>
                        </div>
                    `
                        : ""
                    }
                </div>
                <div class="quiz-footer">
                    <div class="score-display">
                        Score: ${this.score}/${this.currentQuestion + (this.showResult ? 1 : 0)}
                    </div>
                    <button id="next-question" class="btn btn-primary" 
                            ${this.selectedAnswer === null || this.showResult ? "disabled" : ""}>
                        ${this.currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                    </button>
                </div>
            </div>
        `

    this.bindQuestionEvents()
    this.updateQuestionStyles()
  }

  bindQuestionEvents() {
    const optionButtons = document.querySelectorAll(".option-button")
    const nextButton = document.getElementById("next-question")

    optionButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (!this.showResult) {
          this.handleAnswerSelect(Number.parseInt(e.currentTarget.dataset.index))
        }
      })
    })

    if (nextButton) {
      nextButton.addEventListener("click", () => this.handleNextQuestion())
    }
  }

  handleAnswerSelect(answerIndex) {
    this.selectedAnswer = answerIndex
    this.updateQuestionStyles()

    const nextButton = document.getElementById("next-question")
    if (nextButton) {
      nextButton.disabled = false
      nextButton.style.opacity = "1"
      nextButton.style.cursor = "pointer"
    }
  }

  updateQuestionStyles() {
    const optionButtons = document.querySelectorAll(".option-button")
    const question = questions[this.currentQuestion]

    optionButtons.forEach((button, index) => {
      button.classList.remove("selected", "correct", "incorrect")

      if (this.selectedAnswer === index) {
        if (this.showResult) {
          if (index === question.correct) {
            button.classList.add("correct")
            document.getElementById(`icon-${index}`).textContent = "✅"
          } else {
            button.classList.add("incorrect")
            document.getElementById(`icon-${index}`).textContent = "❌"
          }
        } else {
          button.classList.add("selected")
        }
      }

      if (this.showResult && index === question.correct && this.selectedAnswer !== index) {
        button.classList.add("correct")
        document.getElementById(`icon-${index}`).textContent = "✅"
      }
    })
  }

  handleNextQuestion() {
    if (this.selectedAnswer === null) return

    const newAnswers = [...this.answers, this.selectedAnswer]
    this.answers = newAnswers

    if (this.selectedAnswer === questions[this.currentQuestion].correct) {
      this.score++
    }

    this.showResult = true
    this.renderQuestion()

    setTimeout(() => {
      if (this.currentQuestion < questions.length - 1) {
        this.currentQuestion++
        this.selectedAnswer = null
        this.showResult = false
        this.updateProgressBar()
        this.renderQuestion()
      } else {
        this.quizCompleted = true
        this.showResults()
      }
    }, 2000)
  }

  showResults() {
    const quizContent = document.getElementById("quiz-content")
    const quizResults = document.getElementById("quiz-results")

    if (quizContent) quizContent.classList.add("hidden")
    if (quizResults) quizResults.classList.remove("hidden")

    const finalScore = document.getElementById("final-score")
    const scorePercentage = document.getElementById("score-percentage")
    const scoreMessage = document.getElementById("score-message")

    const percentage = Math.round((this.score / questions.length) * 100)

    if (finalScore) finalScore.textContent = `${this.score}/${questions.length}`
    if (scorePercentage) scorePercentage.textContent = `You scored ${percentage}%`

    let message = ""
    let messageColor = ""

    if (this.score === questions.length) {
      message = "Perfect score! Excellent work! 🎉"
      messageColor = "#10b981"
    } else if (this.score >= questions.length * 0.8) {
      message = "Great job! You're doing well! 👏"
      messageColor = "#2563eb"
    } else if (this.score >= questions.length * 0.6) {
      message = "Good effort! Keep practicing! 💪"
      messageColor = "#f59e0b"
    } else {
      message = "Keep studying! You'll improve! 📚"
      messageColor = "#ef4444"
    }

    if (scoreMessage) {
      scoreMessage.textContent = message
      scoreMessage.style.color = messageColor
    }

    // Save results to localStorage
    this.saveResults()

    // Show notification
    if (window.LinguaLearn && window.LinguaLearn.showNotification) {
      window.LinguaLearn.showNotification(
        `Quiz completed! You scored ${percentage}%`,
        percentage >= 80 ? "success" : "info",
      )
    }
  }

  resetQuiz() {
    this.currentQuestion = 0
    this.selectedAnswer = null
    this.showResult = false
    this.score = 0
    this.answers = []
    this.quizCompleted = false

    const quizContent = document.getElementById("quiz-content")
    const quizResults = document.getElementById("quiz-results")

    if (quizContent) quizContent.classList.remove("hidden")
    if (quizResults) quizResults.classList.add("hidden")

    this.updateProgressBar()
    this.renderQuestion()

    if (window.LinguaLearn && window.LinguaLearn.showNotification) {
      window.LinguaLearn.showNotification("Quiz restarted! Good luck!", "info")
    }
  }

  saveResults() {
    const results = {
      score: this.score,
      total: questions.length,
      percentage: Math.round((this.score / questions.length) * 100),
      date: new Date().toISOString(),
      answers: this.answers,
    }

    try {
      const previousResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
      previousResults.push(results)

      // Keep only last 10 results
      if (previousResults.length > 10) {
        previousResults.splice(0, previousResults.length - 10)
      }

      localStorage.setItem("quizResults", JSON.stringify(previousResults))
    } catch (error) {
      console.error("Error saving quiz results:", error)
    }
  }

  loadPreviousResults() {
    try {
      const results = JSON.parse(localStorage.getItem("quizResults") || "[]")
      return results
    } catch (error) {
      console.error("Error loading quiz results:", error)
      return []
    }
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const quiz = new Quiz()

  // Add some quiz-specific styles
  const style = document.createElement("style")
  style.textContent = `
        .option-button:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        .option-button.selected {
            border-color: #2563eb;
            background: #eff6ff;
        }
        
        .option-button.correct {
            border-color: #10b981;
            background: #ecfdf5;
            color: #065f46;
        }
        
        .option-button.incorrect {
            border-color: #ef4444;
            background: #fef2f2;
            color: #991b1b;
        }
        
        .quiz-container {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .question-card {
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
    `
  document.head.appendChild(style)

  console.log("🧠 Quiz initialized successfully!")
})
