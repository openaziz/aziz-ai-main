// إعدادات التطبيق
const CONFIG = {
  // مفاتيح API
  API_KEYS: {
    GEMINI: [
      "
    ],
  },

  // معلومات المستخدم
  USER: {
    NAME: "عبدالعزيز",
    EMAIL: "sa6aa6116@gmail.com",
  },

  // إعدادات الواجهة
  UI: {
    DEFAULT_THEME: "dark",
    DEFAULT_FONT_SIZE: "medium",
  },

  // إعدادات Gemini
  GEMINI: {
    DEFAULT_MODEL: "gemini-pro",
    DEFAULT_TEMPERATURE: 0.7,
    DEFAULT_MAX_TOKENS: 1000,
  },
}

// وظيفة للحصول على مفتاح API عشوائي من المفاتيح المتاحة
function getRandomAPIKey(service = "GEMINI") {
  const keys = CONFIG.API_KEYS[service]
  if (!keys || keys.length === 0) return null

  const randomIndex = Math.floor(Math.random() * keys.length)
  return keys[randomIndex]
}
