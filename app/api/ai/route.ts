import { type NextRequest, NextResponse } from "next/server"
import { getAIResponse } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, systemMessage } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "يجب توفير نص السؤال" }, { status: 400 })
    }

    // تم إزالة التحقق من مفاتيح API هنا

    const response = await getAIResponse(prompt, model, systemMessage)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in AI API route:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء معالجة الطلب" }, { status: 500 })
  }
}
