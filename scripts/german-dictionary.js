// German Dictionary Data and Functionality
const germanDictionary = [
  {
    german: "hallo",
    english: "hello",
    pronunciation: "HAH-loh",
    type: "interjection",
    example: "Hallo! Wie geht es dir?",
  },
  {
    german: "auf wiedersehen",
    english: "goodbye",
    pronunciation: "owf VEE-der-zayn",
    type: "interjection",
    example: "Auf Wiedersehen! Bis morgen!",
  },
  {
    german: "danke",
    english: "thank you",
    pronunciation: "DAHN-kuh",
    type: "interjection",
    example: "Danke für deine Hilfe.",
  },
  {
    german: "bitte",
    english: "please/you're welcome",
    pronunciation: "BIT-tuh",
    type: "interjection",
    example: "Kannst du mir bitte helfen?",
  },
  {
    german: "wasser",
    english: "water",
    pronunciation: "VAH-ser",
    type: "noun",
    example: "Ich möchte ein Glas Wasser.",
  },
  {
    german: "haus",
    english: "house",
    pronunciation: "HOWS",
    type: "noun",
    example: "Mein Haus ist sehr groß.",
  },
  {
    german: "essen",
    english: "to eat",
    pronunciation: "ES-sen",
    type: "verb",
    example: "Ich esse gerne Pizza.",
  },
  {
    german: "buch",
    english: "book",
    pronunciation: "BOOKH",
    type: "noun",
    example: "Ich lese ein interessantes Buch.",
  },
  {
    german: "schule",
    english: "school",
    pronunciation: "SHOO-luh",
    type: "noun",
    example: "Die Kinder gehen zur Schule.",
  },
  {
    german: "familie",
    english: "family",
    pronunciation: "fah-MEE-lee-uh",
    type: "noun",
    example: "Meine Familie ist sehr wichtig.",
  },
  {
    german: "liebe",
    english: "love",
    pronunciation: "LEE-buh",
    type: "noun",
    example: "Die Liebe ist wunderbar.",
  },
  {
    german: "zeit",
    english: "time",
    pronunciation: "TSIGHT",
    type: "noun",
    example: "Ich habe keine Zeit.",
  },
  {
    german: "arbeit",
    english: "work",
    pronunciation: "AR-bite",
    type: "noun",
    example: "Meine Arbeit macht Spaß.",
  },
  {
    german: "freund",
    english: "friend",
    pronunciation: "FROYNT",
    type: "noun",
    example: "Mein Freund ist sehr nett.",
  },
  {
    german: "auto",
    english: "car",
    pronunciation: "OW-toh",
    type: "noun",
    example: "Mein Auto ist neu.",
  },
]

class GermanDictionary {
  constructor() {
    this.dictionary = germanDictionary
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
          entry.german.toLowerCase().includes(this.searchTerm) || entry.english.toLowerCase().includes(this.searchTerm),
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
                        <div class="entry-foreign">${entry.german}</div>
                        <div class="entry-english">${entry.english}</div>
                    </div>
                    <button class="pronunciation-btn" onclick="playGermanPronunciation('${entry.german}')" data-tooltip="Play pronunciation">
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

function playGermanPronunciation(word) {
  // Simple text-to-speech implementation
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = "de-DE"
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
  const dictionary = new GermanDictionary()

  console.log("🇩🇪 German Dictionary initialized successfully!")
})
