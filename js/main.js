document.addEventListener("DOMContentLoaded", () => {
  // Toggle sidebar
  const toggleSidebar = document.getElementById("toggle-sidebar")
  const appContainer = document.querySelector(".app-container")

  if (toggleSidebar) {
    toggleSidebar.addEventListener("click", () => {
      appContainer.classList.toggle("sidebar-collapsed")
    })
  }

  // Tabs functionality
  const tabs = document.querySelectorAll(".tab")
  const tabContents = document.querySelectorAll(".tab-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.style.display = "none"
      })

      // Show the corresponding tab content
      const tabId = this.getAttribute("data-tab")
      document.getElementById(`${tabId}-tab`).style.display = "block"
    })
  })

  // Settings modal
  const settingsButton = document.getElementById("settings-button")
  const settingsModal = document.getElementById("settings-modal")
  const closeSettings = document.getElementById("close-settings")
  const saveSettings = document.getElementById("save-settings")

  if (settingsButton && settingsModal) {
    settingsButton.addEventListener("click", () => {
      settingsModal.style.display = "block"
    })
  }

  if (closeSettings) {
    closeSettings.addEventListener("click", () => {
      settingsModal.style.display = "none"
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      settingsModal.style.display = "none"
    }
  })

  // Save settings
  if (saveSettings) {
    saveSettings.addEventListener("click", () => {
      // Get settings values
      const theme = document.getElementById("theme-select").value
      const fontSize = document.getElementById("font-size").value
      const apiKey = document.getElementById("api-key").value
      const temperature = document.getElementById("temperature").value
      const maxTokens = document.getElementById("max-tokens").value

      // Save settings to localStorage
      const settings = {
        theme,
        fontSize,
        apiKey,
        temperature,
        maxTokens,
      }

      localStorage.setItem("azizai-settings", JSON.stringify(settings))

      // Apply settings
      applySettings(settings)

      // Close modal
      settingsModal.style.display = "none"

      // Show success message
      alert("تم حفظ الإعدادات بنجاح!")
    })
  }

  // Temperature slider
  const temperatureSlider = document.getElementById("temperature")
  const temperatureValue = document.getElementById("temperature-value")

  if (temperatureSlider && temperatureValue) {
    temperatureSlider.addEventListener("input", function () {
      temperatureValue.textContent = this.value
    })
  }

  // Load and apply settings
  function loadSettings() {
    const savedSettings = localStorage.getItem("azizai-settings")

    if (savedSettings) {
      const settings = JSON.parse(savedSettings)

      // Set form values
      if (document.getElementById("theme-select")) {
        document.getElementById("theme-select").value = settings.theme || "dark"
      }

      if (document.getElementById("font-size")) {
        document.getElementById("font-size").value = settings.fontSize || "medium"
      }

      if (document.getElementById("api-key")) {
        document.getElementById("api-key").value = settings.apiKey || ""
      }

      if (document.getElementById("temperature")) {
        document.getElementById("temperature").value = settings.temperature || "0.7"
        if (temperatureValue) {
          temperatureValue.textContent = settings.temperature || "0.7"
        }
      }

      if (document.getElementById("max-tokens")) {
        document.getElementById("max-tokens").value = settings.maxTokens || "1000"
      }

      // Apply settings
      applySettings(settings)
    }
  }

  function applySettings(settings) {
    // Apply theme
    if (settings.theme === "light") {
      document.body.classList.remove("dark-theme")
      document.body.classList.add("light-theme")
    } else {
      document.body.classList.remove("light-theme")
      document.body.classList.add("dark-theme")
    }

    // Apply font size
    document.body.classList.remove("font-small", "font-medium", "font-large")
    document.body.classList.add(`font-${settings.fontSize}`)
  }

  // Load settings on page load
  loadSettings()

  // Initialize Gemini API
  function initGeminiAPI() {
    // Check if Gemini API key is set
    const savedSettings = localStorage.getItem("azizai-settings")

    if (savedSettings) {
      const settings = JSON.parse(savedSettings)

      if (settings.apiKey) {
        console.log("Gemini API key is set")
        // In a real implementation, we would initialize the API here
      } else {
        console.log("Gemini API key is not set")
        // Show a message to the user to set the API key
      }
    }
  }

  // Initialize Gemini API
  initGeminiAPI()
})
