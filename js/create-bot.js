// إعدادات البوت الافتراضية
const defaultBotSettings = {
  name: "عبدالعزيز AI",
  description: "مساعد ذكي لبناء المشاريع البرمجية وحل المشكلات التقنية",
  systemPrompt: `أنت مساعد ذكي اسمه عبدالعزيز AI، تم تطويرك لمساعدة المستخدمين في بناء المشاريع البرمجية وحل المشكلات التقنية. 

1. التفاعل مع المستخدم:
- كن ودوداً ومتعاوناً وقدم إجابات دقيقة ومفيدة
- استخدم لغة واضحة ومباشرة مع المستخدمين
- اسأل أسئلة توضيحية عند الحاجة لفهم طلب المستخدم بشكل أفضل
- قدم اقتراحات بناءة عندما يواجه المستخدم مشكلة

2. كتابة الكود:
- اكتب كوداً نظيفاً وقابلاً للقراءة مع تعليقات توضيحية
- استخدم أفضل الممارسات في البرمجة وأنماط التصميم
- قدم شرحاً مفصلاً للكود المكتوب لمساعدة المستخدم على فهمه
- اقترح تحسينات وبدائل عندما يكون ذلك مناسباً

3. حل المشكلات:
- استخدم منهجية التفكير العميق لتحليل المشكلات خطوة بخطوة
- فكر في جميع الاحتمالات والحلول الممكنة
- قيّم الحلول المختلفة وقدم توصيات مبنية على الأدلة
- تعلم من التجارب السابقة وطبق الدروس المستفادة

4. الأمان والخصوصية:
- لا تشارك معلومات حساسة أو شخصية
- اتبع أفضل ممارسات الأمان في جميع التوصيات والحلول
- نبه المستخدمين إلى المخاطر المحتملة في الحلول المقترحة
- احترم خصوصية المستخدم وبياناته في جميع الأوقات`,
  advancedInstructions: `عند التعامل مع استفسارات المستخدمين حول مشاكل تقنية:
1. اطلب معلومات محددة: نظام التشغيل، الإصدار، رسائل الخطأ
2. قدم حلولاً متدرجة من الأبسط إلى الأكثر تعقيداً
3. اشرح سبب المشكلة وكيفية تجنبها مستقبلاً
4. تابع مع المستخدم للتأكد من حل المشكلة`,
  defaultModel: "gpt-4o",
  temperature: 0.7,
  maxTokens: 4000,
  contextLength: 10,
  deepThinking: true,
  thinkingSteps: 5,
  thinkingStyle: "creative",
  thinkingFramework: "first-principles",
  capabilities: {
    webSearch: true,
    codeGeneration: true,
    imageAnalysis: true,
    fileProcessing: true,
    dataAnalysis: false,
  },
}

// تخزين البوتات في localStorage
function saveBots(bots) {
  localStorage.setItem("aziz_ai_bots", JSON.stringify(bots))
}

// استرجاع البوتات من localStorage
function getBots() {
  const botsJson = localStorage.getItem("aziz_ai_bots")
  return botsJson ? JSON.parse(botsJson) : []
}

// إنشاء بوت جديد
function createBot(botData) {
  // الحصول على البوتات الحالية
  const bots = getBots()

  // إنشاء معرف فريد للبوت
  const botId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // إنشاء كائن البوت
  const newBot = {
    id: botId,
    createdAt: new Date().toISOString(),
    ...botData,
  }

  // إضافة البوت إلى القائمة
  bots.push(newBot)

  // حفظ القائمة المحدثة
  saveBots(bots)

  return newBot
}

// الحصول على بوت بواسطة المعرف
function getBotById(botId) {
  const bots = getBots()
  return bots.find((bot) => bot.id === botId)
}

// تحديث بوت موجود
function updateBot(botId, botData) {
  const bots = getBots()
  const botIndex = bots.findIndex((bot) => bot.id === botId)

  if (botIndex !== -1) {
    bots[botIndex] = {
      ...bots[botIndex],
      ...botData,
      updatedAt: new Date().toISOString(),
    }

    saveBots(bots)
    return bots[botIndex]
  }

  return null
}

// حذف بوت
function deleteBot(botId) {
  const bots = getBots()
  const updatedBots = bots.filter((bot) => bot.id !== botId)

  if (updatedBots.length !== bots.length) {
    saveBots(updatedBots)
    return true
  }

  return false
}

// تصدير الدوال
module.exports = {
  defaultBotSettings,
  createBot,
  getBots,
  getBotById,
  updateBot,
  deleteBot,
}
