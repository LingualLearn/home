// Spanish Dictionary Data and Functionality
const spanishDictionary = [
  {
    spanish: "hola",
    english: "hello",
    pronunciation: "OH-lah",
    type: "interjection",
    example: "¡Hola! ¿Cómo estás?",
  },
  {
    spanish: "adiós",
    english: "goodbye",
    pronunciation: "ah-DYOHS",
    type: "interjection",
    example: "¡Adiós! Hasta mañana.",
  },
  {
    spanish: "gracias",
    english: "thank you",
    pronunciation: "GRAH-thyahs",
    type: "interjection",
    example: "Gracias por tu ayuda.",
  },
  {
    spanish: "por favor",
    english: "please",
    pronunciation: "por fah-VOR",
    type: "phrase",
    example: "¿Puedes ayudarme, por favor?",
  },
  {
    spanish: "agua",
    english: "water",
    pronunciation: "AH-gwah",
    type: "noun",
    example: "Necesito un vaso de agua.",
  },
  {
    spanish: "casa",
    english: "house",
    pronunciation: "KAH-sah",
    type: "noun",
    example: "Mi casa es muy grande.",
  },
  {
    spanish: "comer",
    english: "to eat",
    pronunciation: "ko-MER",
    type: "verb",
    example: "Me gusta comer pizza.",
  },
  {
    spanish: "libro",
    english: "book",
    pronunciation: "LEE-bro",
    type: "noun",
    example: "Estoy leyendo un libro interesante.",
  },
  {
    spanish: "escuela",
    english: "school",
    pronunciation: "es-KWEH-lah",
    type: "noun",
    example: "Los niños van a la escuela.",
  },
  {
    spanish: "familia",
    english: "family",
    pronunciation: "fah-MEE-lyah",
    type: "noun",
    example: "Mi familia es muy importante para mí.",
  },
  {
    spanish: "amor",
    english: "love",
    pronunciation: "ah-MOR",
    type: "noun",
    example: "El amor es muy importante.",
  },
  {
    spanish: "tiempo",
    english: "time/weather",
    pronunciation: "TYEM-po",
    type: "noun",
    example: "No tengo tiempo hoy.",
  },
  {
    spanish: "trabajo",
    english: "work",
    pronunciation: "trah-BAH-ho",
    type: "noun",
    example: "Voy al trabajo todos los días.",
  },
  {
    spanish: "amigo",
    english: "friend",
    pronunciation: "ah-MEE-go",
    type: "noun",
    example: "Mi amigo es muy divertido.",
  },
  {
    spanish: "coche",
    english: "car",
    pronunciation: "KO-che",
    type: "noun",
    example: "Mi coche es rojo.",
  },
  {
    spanish: "comida",
    english: "food",
    pronunciation: "ko-MEE-dah",
    type: "noun",
    example: "La comida está deliciosa.",
  },
]

class SpanishDictionary {
  constructor() {
    this.dictionary = spanishDictionary
    this.filteredEntries = [...this.dictionary]
    this.searchTerm = ""

    this.init()
  }

  init() {
    this.renderEntries()
    this.bindEvents()
  }

  bindEvents() {
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value)
      })
    }
  }

  handleSearch(term) {
    this.searchTerm = term.toLowerCase().trim()

    if (this.searchTerm === "") {
      this.filteredEntries = [...this.dictionary]
    } else {
      this.filteredEntries = this.dictionary.filter(
        (entry) =>
          entry.spanish.toLowerCase().includes(this.searchTerm) ||
          entry.english.toLowerCase().includes(this.searchTerm),
      )
    }

    this.renderEntries()
  }

  renderEntries() {
    const entriesContainer = document.getElementById("dictionary-entries")
    const noResults = document.getElementById("no-results")

    if (this.filteredEntries.length === 0) {
      entriesContainer.innerHTML = ""
      noResults.classList.remove("hidden")
      return
    }

    noResults.classList.add("hidden")

    entriesContainer.innerHTML = this.filteredEntries
      .map(
        (entry) => `
            <div class="dictionary-entry">
                <div class="entry-header">
                    <div class="entry-words">
                        <div class="entry-foreign">${entry.spanish}</div>
                        <div class="entry-english">${entry.english}</div>
                    </div>
                    <button class="pronunciation-btn" onclick="playPronunciation('${entry.spanish}')" data-tooltip="Play pronunciation">
                        🔊
                    </button>
                </div>
                <div class="entry-details">
                    <div class="entry-detail">
                        <span class="detail-label">Pronunciation: </span>
                        <span class="detail-value">${entry.pronunciation}</span>
                    </div>
                    <div class="entry-detail">
                        <span class="detail-label">Type: </span>
                        <span class="word-type">${entry.type}</span>
                    </div>
                    <div class="entry-detail">
                        <span class="detail-label">Example: </span>
                        <span class="detail-value example-text">${entry.example}</span>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

function playPronunciation(word) {
  // Simple text-to-speech implementation
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = "es-ES"
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)

    if (window.LinguaLearn && window.LinguaLearn.showNotification) {
      window.LinguaLearn.showNotification(`Playing pronunciation: ${word}`, "info")
    }
  } else {
    console.log(`Playing pronunciation for: ${word}`)
    if (window.LinguaLearn && window.LinguaLearn.showNotification) {
      window.LinguaLearn.showNotification("Speech synthesis not supported in this browser", "error")
    }
  }
}

// Initialize dictionary when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const dictionary = new SpanishDictionary()

  // Add dictionary-specific styles
  const style = document.createElement("style")
  style.textContent = `
        .dictionary-entry {
            animation: fadeInUp 0.3s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .pronunciation-btn:hover {
            transform: scale(1.1);
        }
        
        .search-input:focus {
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
    `
  document.head.appendChild(style)

  console.log("🇪🇸 Spanish Dictionary initialized successfully!")
})
