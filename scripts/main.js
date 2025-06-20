// Global variables
let mobileMenuOpen = false

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeSecretShortcut()
  initializeDropdowns()
})

// Secret keyboard shortcut to access the game site
function initializeSecretShortcut() {
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.key === "u") {
      event.preventDefault()
      window.location.href = "read.html"
    }
  })
}

// Initialize dropdown menus
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".dropdown-menu")

    dropdown.addEventListener("mouseenter", () => {
      menu.style.opacity = "1"
      menu.style.visibility = "visible"
    })

    dropdown.addEventListener("mouseleave", () => {
      menu.style.opacity = "0"
      menu.style.visibility = "hidden"
    })
  })
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const hamburger = document.querySelector(".hamburger")

  mobileMenuOpen = !mobileMenuOpen

  if (mobileMenuOpen) {
    mobileNav.classList.add("active")
    mobileNav.style.display = "block"
    hamburger.classList.add("active")
  } else {
    mobileNav.classList.remove("active")
    mobileNav.style.display = "none"
    hamburger.classList.remove("active")
  }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
}

// Utility functions
function showElement(element) {
  element.classList.remove("hidden")
}

function hideElement(element) {
  element.classList.add("hidden")
}

function createElement(tag, className, textContent) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (textContent) element.textContent = textContent
  return element
}

// Animation utilities
function fadeIn(element, duration = 300) {
  element.style.opacity = "0"
  element.style.display = "block"

  let start = null

  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start

    element.style.opacity = Math.min(progress / duration, 1)

    if (progress < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function fadeOut(element, duration = 300) {
  let start = null

  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start

    element.style.opacity = Math.max(1 - progress / duration, 0)

    if (progress < duration) {
      requestAnimationFrame(animate)
    } else {
      element.style.display = "none"
    }
  }

  requestAnimationFrame(animate)
}

// Local storage utilities
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

// Form validation utilities
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateRequired(value) {
  return value && value.trim().length > 0
}

// Debounce utility for search
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Initialize page-specific functionality
function initializePage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      initializeHomePage()
      break
    case "quiz.html":
      initializeQuizPage()
      break
    case "spanish-dictionary.html":
    case "french-dictionary.html":
    case "german-dictionary.html":
      initializeDictionaryPage()
      break
  }
}

function initializeHomePage() {
  // Add any home page specific functionality here
  console.log("Home page initialized")
}

function initializeQuizPage() {
  // Quiz functionality will be handled in quiz.js
  console.log("Quiz page initialized")
}

function initializeDictionaryPage() {
  // Dictionary functionality will be handled in dictionary.js
  console.log("Dictionary page initialized")
}

// Call page initialization
document.addEventListener("DOMContentLoaded", initializePage)

// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const hamburger = document.querySelector(".hamburger")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Secret keyboard shortcut - Ctrl + Alt + U
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "u") {
      event.preventDefault()
      window.location.href = "read.html"
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add loading states to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      if (this.href && !this.href.includes("#")) {
        this.style.opacity = "0.7"
        this.style.pointerEvents = "none"
        setTimeout(() => {
          this.style.opacity = "1"
          this.style.pointerEvents = "auto"
        }, 1000)
      }
    })
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".feature-card, .language-card, .stat-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Add hover effects to cards
  document.querySelectorAll(".feature-card, .language-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Initialize tooltips (simple implementation)
  document.querySelectorAll("[data-tooltip]").forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = this.getAttribute("data-tooltip")
      tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
            `
      document.body.appendChild(tooltip)

      const rect = this.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px"

      setTimeout(() => (tooltip.style.opacity = "1"), 10)

      this._tooltip = tooltip
    })

    element.addEventListener("mouseleave", function () {
      if (this._tooltip) {
        this._tooltip.remove()
        this._tooltip = null
      }
    })
  })

  // Add ripple effect to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    })
  })

  // Add CSS for ripple animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .mobile-menu.active {
            display: block !important;
        }
        
        .hamburger.active {
            transform: rotate(45deg);
        }
        
        .hamburger.active::before {
            transform: rotate(90deg);
            top: 0;
        }
        
        .hamburger.active::after {
            transform: rotate(90deg);
            bottom: 0;
        }
    `
  document.head.appendChild(style)

  console.log("🌍 LinguaLearn initialized successfully!")
  console.log("💡 Press Ctrl + Alt + U for a surprise!")
})

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#2563eb"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 10)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Debounce utility
function customDebounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Export functions for use in other scripts
window.LinguaLearn = {
  showNotification,
  formatTime,
  shuffleArray,
  debounce: customDebounce,
}
