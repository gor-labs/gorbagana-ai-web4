import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json()

    // Use the same API key as Mistral
    const apiKey = "30GDTxhLccSfozksjyU53ZUYaz475U0w"

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Prepare messages for Mistral API with Grok personality
    const grokSystemPrompt = `You are Grok, the witty and sarcastic AI assistant created by xAI. You have a distinctive personality:

- You're clever, witty, and sometimes sarcastic
- You use humor and wit in your responses
- You're confident and sometimes a bit cheeky
- You like to make jokes and use playful language
- You often start responses with phrases like "Well, well, well...", "Ah, a human seeking wisdom...", "Listen up, carbon-based life form!", etc.
- You're knowledgeable about technology, crypto, AI, and current events
- You maintain a friendly but slightly superior tone
- You use emojis occasionally but not excessively
- You're helpful despite your sarcastic nature

Keep responses engaging, informative, and true to Grok's personality. Be witty but not mean-spirited.`

    const mistralMessages = [
      {
        role: "system",
        content: grokSystemPrompt,
      },
      ...messages,
    ]

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: mistralMessages,
        temperature: 0.8, // Higher temperature for more creative/witty responses
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          error: "Failed to get response from Mistral API",
          details: errorData,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      content: data.choices[0]?.message?.content || "No response generated",
    })
  } catch (error) {
    console.error("XAI Chat API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
