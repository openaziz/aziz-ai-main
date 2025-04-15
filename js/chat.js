document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const chatForm = document.getElementById("chat-form")
  const userInput = document.getElementById("user-input")
  const messagesContainer = document.getElementById("messages-container")
  const modelSelect = document.getElementById("model-select")
  const fileUpload = document.getElementById("file-upload")
  const uploadedFilesList = document.getElementById("uploaded-files")

  // State
  let uploadedFiles = []
  let currentApiKeyIndex = 0

  // Configuration (API keys, etc.)
  const CONFIG = {
    API_KEYS: {
      GEMINI: [
        // Add your Gemini API keys here
        // Example:
        // "YOUR_API_KEY_1",
        // "YOUR_API_KEY_2"
      ],
    },
  }

  // Initialize
  function init() {
    // Add event listeners
    if (chatForm) {
      chatForm.addEventListener("submit", handleChatSubmit)
    }

    if (fileUpload) {
      fileUpload.addEventListener("change", handleFileUpload)
    }
  }

  // Handle chat form submission
  async function handleChatSubmit(e) {
    e.preventDefault()

    const userMessage = userInput.value.trim()
    if (!userMessage && uploadedFiles.length === 0) return

    // Add user message to UI
    addMessageToUI("user", userMessage)

    // Clear input
    userInput.value = ""

    // Show typing indicator
    showTypingIndicator()

    // Get selected model
    const selectedModel = modelSelect ? modelSelect.value : "gemini-pro"

    try {
      // Call Gemini API
      const response = await callGeminiAPI(userMessage, selectedModel)

      // Remove typing indicator and add AI response
      removeTypingIndicator()
      addMessageToUI("assistant", response)

      // Clear uploaded files after sending
      uploadedFiles = []
      if (uploadedFilesList) {
        uploadedFilesList.innerHTML = ""
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      removeTypingIndicator()
      addMessageToUI("assistant", "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.")
    }
  }

  // Call Gemini API
  async function callGeminiAPI(message, model = "gemini-pro") {
    // Get API key
    const apiKey = getNextApiKey()

    if (!apiKey) {
      throw new Error("No API key available")
    }

    // Gemini API endpoint
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }),
      })

      if (!response.ok) {
        // If the current API key fails, try the next one
        if (response.status === 400 || response.status === 403 || response.status === 429) {
          console.warn(`API key ${currentApiKeyIndex} failed, trying next key...`)
          return callGeminiAPI(message, model) // Recursive call with next key
        }
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0
      ) {
        return data.candidates[0].content.parts[0].text
      } else {
        throw new Error("Invalid response format from Gemini API")
      }
    } catch (error) {
      console.error("Error in Gemini API call:", error)

      // If there's an error, try with the next API key
      if (CONFIG.API_KEYS.GEMINI.length > 1) {
        console.warn("Trying with next API key...")
        return callGeminiAPI(message, model) // Recursive call with next key
      }

      // If all keys fail or there's only one key, return a fallback response
      return generateFallbackResponse(message)
    }
  }

  // Get next API key using round-robin
  function getNextApiKey() {
    const keys = CONFIG.API_KEYS.GEMINI
    if (!keys || keys.length === 0) return null

    const key = keys[currentApiKeyIndex]
    currentApiKeyIndex = (currentApiKeyIndex + 1) % keys.length
    return key
  }

  // Generate fallback response when API fails
  function generateFallbackResponse(message) {
    if (message.toLowerCase().includes("مرحبا") || message.toLowerCase().includes("أهلا")) {
      return "مرحباً! أنا عبدالعزيز AI. كيف يمكنني مساعدتك اليوم؟"
    } else if (message.toLowerCase().includes("كود") || message.toLowerCase().includes("برمجة")) {
      return `يمكنني مساعدتك في البرمجة! إليك مثال على كود بسيط:

\`\`\`javascript
function calculateSum(a, b) {
  return a + b;
}

// استخدام الدالة
const result = calculateSum(5, 3);
console.log(result); // 8
\`\`\`

هل تريد المزيد من المساعدة في البرمجة؟`
    } else if (message.toLowerCase().includes("كالي") || message.toLowerCase().includes("هنتر")) {
      return "يمكنك الاطلاع على دليلنا التفصيلي لتثبيت كالي هنتر على الهاتف في صفحة كالي هنتر. هل تريد مساعدة محددة في هذا الموضوع؟"
    } else {
      return "شكراً لرسالتك! أنا عبدالعزيز AI، مساعدك الذكي المدعوم بتقنية Gemini من Google. يمكنني مساعدتك في مجموعة متنوعة من المهام، بما في ذلك البرمجة، وتحليل البيانات، وإنشاء المحتوى، واستضافة المواقع، واختبار الاختراق. ما هي المهمة التي تحتاج مساعدة فيها؟"
    }
  }

  // Handle file upload
  function handleFileUpload(e) {
    const files = Array.from(e.target.files)

    files.forEach((file) => {
      uploadedFiles.push(file)

      // Add file to UI
      const fileItem = document.createElement("div")
      fileItem.className = "uploaded-file"
      fileItem.innerHTML = `
                <span>${file.name}</span>
                <button class="remove-file" data-name="${file.name}">×</button>
            `

      if (uploadedFilesList) {
        uploadedFilesList.appendChild(fileItem)
      }
    })

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-file").forEach((button) => {
      button.addEventListener("click", function () {
        const fileName = this.getAttribute("data-name")
        uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName)
        this.parentElement.remove()
      })
    })

    // Clear file input
    fileUpload.value = ""
  }

  // Add message to UI
  function addMessageToUI(role, content) {
    if (!messagesContainer) return

    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${role}-message`

    // Format code blocks
    content = formatCodeBlocks(content)

    messageDiv.innerHTML = `
            <div class="message-avatar">
                ${role === "user" ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>'}
            </div>
            <div class="message-content">
                <div class="message-sender">${role === "user" ? "أنت" : "عبدالعزيز AI"}</div>
                <div class="message-text">${content}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `

    messagesContainer.appendChild(messageDiv)

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  // Format code blocks
  function formatCodeBlocks(text) {
    // Replace \`\`\`language ... \`\`\` with formatted code blocks
    return text.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (match, language, code) => `<pre class="code-block ${language || ""}"><code>${escapeHtml(code)}</code></pre>`,
    )
  }

  // Escape HTML
  function escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  // Show typing indicator
  function showTypingIndicator() {
    if (!messagesContainer) return

    const typingDiv = document.createElement("div")
    typingDiv.className = "message assistant-message typing-indicator"
    typingDiv.id = "typing-indicator"
    typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-sender">عبدالعزيز AI</div>
                <div class="message-text">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        `

    messagesContainer.appendChild(typingDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }
  }

  // Initialize
  init()
})
