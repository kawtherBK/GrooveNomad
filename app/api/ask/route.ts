import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Utilisation de l'AI SDK pour générer du texte avec OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"), // Utilisation du modèle gpt-4o
      prompt: `En tant qu'expert en festivals et voyages, réponds à la question suivante de manière concise et utile, en te concentrant sur les festivals, les destinations et les conseils de voyage. Si la question est hors sujet, indique que tu ne peux pas aider. Question: ${query}`,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in /api/ask:", error)
    return NextResponse.json({ error: "Failed to generate response from AI" }, { status: 500 })
  }
}
