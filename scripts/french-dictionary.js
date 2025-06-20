// French Dictionary Data and Functionality
const frenchDictionary = [
  {
    french: "bonjour",
    english: "hello/good morning",
    pronunciation: "bon-ZHOOR",
    type: "interjection",
    example: "Bonjour! Comment allez-vous?",
  },
  {
    french: "au revoir",
    english: "goodbye",
    pronunciation: "oh ruh-VWAHR",
    type: "interjection",
    example: "Au revoir! À bientôt!",
  },
  {
    french: "merci",
    english: "thank you",
    pronunciation: "mer-SEE",
    type: "interjection",
    example: "Merci beaucoup pour votre aide.",
  },
  {
    french: "s'il vous plaît",
    english: "please",
    pronunciation: "seel voo PLEH",
    type: "phrase",
    example: "Pouvez-vous m'aider, s'il vous plaît?",
  },
  {
    french: "eau",
    english: "water",
    pronunciation: "OH",
    type: "noun",
    example: "Je voudrais un verre d'eau.",
  },
  {
    french: "maison",
    english: "house",
    pronunciation: "meh-ZOHN",
    type: "noun",
    example: "J'habite dans une grande maison.",
  },
  {
    french: "manger",
    english: "to eat",
    pronunciation: "mahn-ZHAY",
    type: "verb",
    example: "J'aime manger des croissants.",
  },
  {
    french: "livre",
    english: "book",
    pronunciation: "LEE-vruh",
    type: "noun",
    example: "Je lis un livre intéressant.",
  },
  {
    french: "école",
    english: "school",
    pronunciation: "ay-KOHL",
    type: "noun",
    example: "Les enfants vont à l'école.",
  },
  {
    french: "famille",
    english: "family",
    pronunciation: "fah-MEEL",
    type: "noun",
    example: "Ma famille est très importante.",
  },
  {
    french: "amour",
    english: "love",
    pronunciation: "ah-MOOR",
    type: "noun",
    example: "L'amour est beau.",
  },
  {
    french: "temps",
    english: "time/weather",
    pronunciation: "tahn",
    type: "noun",
    example: "Je n'ai pas le temps.",
  },
  {
    french: "travail",
    english: "work",
    pronunciation: "trah-VIGH",
    type: "noun",
    example: "Mon travail est intéressant.",
  },
  {
    french: "ami",
    english: "friend",
    pronunciation: "ah-MEE",
    type: "noun",
    example: "Mon ami est très gentil.",
  },
  {
    french: "voiture",
    english: "car",
    pronunciation: "vwah-TOOR",
    type: "noun",
    example: "Ma voiture est bleue.",
  },
]

class FrenchDictionary {
  constructor() {
    this.dictionary = frenchDictionary
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
          entry.french.toLowerCase().includes(this.searchTerm) || entry.english.toLowerCase().includes(this.searchTerm),
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
                        <div class="entry-foreign">${entry.french}</div>
                        <div class="entry-english">${entry.english}</div>
                    </div>
                    <button class="pronunciation-btn" onclick="playFrenchPronunciation('${entry.french}')" data-tooltip="Play pronunciation">
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

function playFrenchPronunciation(word) {
  // Simple text-to-speech implementation
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = "fr-FR"
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
  const dictionary = new FrenchDictionary()

  console.log("🇫🇷 French Dictionary initialized successfully!")
})
