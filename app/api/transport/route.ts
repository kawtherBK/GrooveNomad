import type { NextRequest } from "next/server"
import { TransportService, type TransportSearchParams } from "@/lib/transport-apis"

export async function POST(req: NextRequest) {
  try {
    const body: TransportSearchParams = await req.json()

    // Validation des paramètres
    if (!body.from || !body.to || !body.departureDate) {
      return Response.json({ error: "Paramètres manquants: from, to, departureDate requis" }, { status: 400 })
    }

    const transportService = new TransportService()
    const options = await transportService.searchAllTransports(body)

    // Recommandations intelligentes si demandées
    const preferences = {
      budget: body.budget as any,
      speed: body.speed as any,
      eco: body.eco,
    }

    const recommendations = transportService.getSmartRecommendations(options, preferences)

    return Response.json({
      success: true,
      total: options.length,
      options,
      recommendations,
      searchParams: body,
    })
  } catch (error) {
    console.error("Transport API Error:", error)
    return Response.json({ error: "Erreur lors de la recherche de transports" }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({
    message: "Transport API - Utilisez POST pour rechercher des trajets",
    endpoints: {
      search: "POST /api/transport",
      parameters: {
        from: "string (required)",
        to: "string (required)",
        departureDate: "string ISO (required)",
        returnDate: "string ISO (optional)",
        passengers: "number (default: 1)",
        preferredTypes: "array of transport types (optional)",
        budget: "low|medium|high (optional)",
        speed: "slow|medium|fast (optional)",
        eco: "boolean (optional)",
      },
    },
  })
}
