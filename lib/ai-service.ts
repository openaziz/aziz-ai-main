// خدمة الاتصال بواجهات برمجة الذكاء الاصطناعي

// OpenAI API
export async function callOpenAI(prompt: string, systemMessage = "") {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              systemMessage ||
              "أنت مساعد برمجة ذكي يساعد المستخدمين في كتابة وتصحيح الأكواد البرمجية. أجب بشكل مختصر ومفيد.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error calling OpenAI:", error)
    return "حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي. يرجى التحقق من مفتاح API الخاص بك."
  }
}

// Claude API (Anthropic)
export async function callClaude(prompt: string, systemMessage = "") {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.CLAUDE_API_KEY}`,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        system:
          systemMessage ||
          "أنت مساعد برمجة ذكي يساعد المستخدمين في كتابة وتصحيح الأكواد البرمجية. أجب بشكل مختصر ومفيد.",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    return data.content[0].text
  } catch (error) {
    console.error("Error calling Claude:", error)
    return "حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي. يرجى التحقق من مفتاح API الخاص بك."
  }
}

// واجهة موحدة للاتصال بخدمات الذكاء الاصطناعي
export async function getAIResponse(prompt: string, model = "gpt-4o", systemMessage = "") {
  if (model === "claude") {
    return callClaude(prompt, systemMessage)
  } else {
    return callOpenAI(prompt, systemMessage)
  }
}
