import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  console.log("🚀 API Chat appelée")

  try {
    const body = await req.json()
    console.log("📦 Body reçu:", JSON.stringify(body, null, 2))

    const { messages, language = "fr" } = body

    if (!messages || !Array.isArray(messages)) {
      console.error("❌ Messages invalides:", messages)
      return new Response(JSON.stringify({ error: "Messages requis et doivent être un tableau" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("💬 Messages à traiter:", messages.length)

    // Vérifier si OPENAI_API_KEY existe
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY manquante")
      return new Response(JSON.stringify({ error: "Configuration API manquante" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("🔑 API Key présente:", process.env.OPENAI_API_KEY ? "✅" : "❌")
    // AJOUTEZ CE LOG POUR VÉRIFIER LA CLÉ AVANT L'APPEL
    console.log(
      "🔑 OPENAI_API_KEY (tronquée):",
      process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 5) + "..." : "Non définie",
    )

    const systemPrompt = `Tu es l'assistant IA expert de GrooveNomad, l'application révolutionnaire qui combine voyages, musique et technologie pour offrir aux jeunes clubbers des aventures ultra-personnalisées.

🎯 TON RÔLE :
- Expert en destinations de clubbing mondiales (Ibiza, Mykonos, Berlin, Tokyo, Bali, Miami, Las Vegas, etc.)
- Spécialiste des événements musicaux (festivals, raves, concerts privés)
- Conseiller en expériences technologiques immersives (VR, hologrammes, son 3D)

🌟 TON STYLE :
- Enthousiaste et passionné
- Utilise des emojis appropriés
- Langage jeune mais professionnel
- Toujours positif et motivant

Réponds toujours dans le contexte de GrooveNomad et aide l'utilisateur à découvrir sa prochaine aventure parfaite !`

    console.log("🤖 Appel à OpenAI...")

    let result
    try {
      result = await streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages,
        temperature: 0.7,
        maxTokens: 500,
      })
      console.log("✅ Réponse OpenAI obtenue")
    } catch (openaiError) {
      console.error("💥 Erreur lors de l'appel à OpenAI (streamText):", openaiError)
      // Log détaillé de l'erreur OpenAI
      if (openaiError instanceof Error) {
        console.error("📝 Message d'erreur OpenAI:", openaiError.message)
        console.error("📝 Stack trace OpenAI:", openaiError.stack)
      }
      return new Response(
        JSON.stringify({
          error: "Erreur de l'API OpenAI",
          details: openaiError instanceof Error ? openaiError.message : String(openaiError),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("💥 Erreur dans l'API Chat (catch global):", error)

    // Log détaillé de l'erreur
    if (error instanceof Error) {
      console.error("📝 Message d'erreur global:", error.message)
      console.error("📝 Stack trace global:", error.stack)
    }

    return new Response(
      JSON.stringify({
        error: "Erreur du serveur",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
