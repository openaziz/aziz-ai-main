const express = require("express")
const path = require("path")
const app = express()

app.use(express.json())

// إضافة مسار صفحة إنشاء البوت
app.get("/create-bot", (req, res) => {
  res.sendFile(path.join(__dirname, "create-bot.html"))
})

// API لإنشاء بوت جديد
app.post("/api/bots", (req, res) => {
  try {
    const botData = req.body

    // التحقق من البيانات المطلوبة
    if (!botData.name) {
      return res.status(400).json({ error: "اسم البوت مطلوب" })
    }

    // إنشاء معرف فريد للبوت
    const botId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5)

    // إنشاء كائن البوت
    const newBot = {
      id: botId,
      createdAt: new Date().toISOString(),
      ...botData,
    }

    // في تطبيق حقيقي، ستقوم بتخزين البوت في قاعدة البيانات
    // هنا نقوم بإرجاع البوت المنشأ فقط

    res.status(201).json({
      success: true,
      message: "تم إنشاء البوت بنجاح",
      bot: newBot,
    })
  } catch (error) {
    console.error("خطأ في إنشاء البوت:", error)
    res.status(500).json({ error: "حدث خطأ أثناء إنشاء البوت" })
  }
})

// API للحصول على قائمة البوتات
app.get("/api/bots", (req, res) => {
  try {
    // في تطبيق حقيقي، ستقوم بجلب البوتات من قاعدة البيانات
    // هنا نقوم بإرجاع قائمة وهمية

    const bots = [
      {
        id: "bot1",
        name: "عبدالعزيز AI",
        description: "مساعد ذكي لبناء المشاريع البرمجية",
        defaultModel: "gpt-4o",
        createdAt: "2025-04-01T12:00:00Z",
      },
      {
        id: "bot2",
        name: "كالي هنتر",
        description: "مساعد متخصص في أمان المعلومات",
        defaultModel: "claude-3-opus",
        createdAt: "2025-04-05T14:30:00Z",
      },
    ]

    res.json({
      success: true,
      bots: bots,
    })
  } catch (error) {
    console.error("خطأ في جلب البوتات:", error)
    res.status(500).json({ error: "حدث خطأ أثناء جلب البوتات" })
  }
})
