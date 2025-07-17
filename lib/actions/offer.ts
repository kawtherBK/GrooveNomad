"use server"

import { z } from "zod"
import { redirect } from "next/navigation"

// Schéma de validation pour les données de personnalisation de l'offre
const offerSchema = z.object({
  musicalGenres: z.array(z.string()).min(1, "Veuillez sélectionner au moins un genre musical."),
  soloOrGroup: z.enum(["solo", "group"]),
  eventTypes: z.array(z.string()).min(1, "Veuillez sélectionner au moins un type d'événement."),
  country: z.string().min(1, "Veuillez sélectionner un pays de destination."),
  // Nouveaux champs
  budget: z.enum(["low", "medium", "high"]).refine(val => !!val, { message: "Veuillez sélectionner un budget." }),
  departureDate: z.string().min(1, "Veuillez sélectionner une date de départ."),
  returnDate: z.string().optional(), // Optionnel
  travelModes: z.array(z.string()).min(1, "Veuillez sélectionner au moins un mode de transport."),
  accommodationType: z.enum(["hotel", "camping"]).refine(val => !!val, { message: "Veuillez sélectionner un type de logement." }),
})

export async function generatePersonalizedOffer(prevState: any, formData: FormData) {
  const musicalGenres = formData.getAll("musicalGenres") as string[]
  const soloOrGroup = formData.get("soloOrGroup") as string
  const eventTypes = formData.getAll("eventTypes") as string[]
  const country = formData.get("country") as string
  // Nouveaux champs
  const budget = formData.get("budget") as string
  const departureDate = formData.get("departureDate") as string
  const returnDate = formData.get("returnDate") as string | undefined
  const travelModes = formData.getAll("travelModes") as string[]
  const accommodationType = formData.get("accommodationType") as string

  const data = {
    musicalGenres,
    soloOrGroup,
    eventTypes,
    country,
    budget,
    departureDate,
    returnDate: returnDate || undefined, // S'assurer que c'est undefined si vide
    travelModes,
    accommodationType,
  }

  console.log("Attempting to generate personalized offer with data:", data)

  try {
    // Valider les données avec Zod
    const validatedData = offerSchema.parse(data)
    console.log("Validated offer data:", validatedData)

    // Simuler un délai réseau pour la génération de l'offre
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Ici, tu intégrerais la logique complexe de génération d'offre
    // basée sur les préférences de l'utilisateur.
    // Pour l'instant, nous allons juste loguer les informations et rediriger.
    console.log("🎉 Offre personnalisée générée avec succès (simulation) pour :", validatedData)

    // Rediriger vers la page de recommandations
    redirect("/recommendations")

    // Note: Le code après redirect() ne sera pas exécuté.
  } catch (error: any) {
    console.error("❌ Erreur de génération d'offre:", error)

    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce((acc: Record<string, string>, err) => {
        if (err.path.length > 0) {
          acc[err.path[0]] = err.message
        }
        return acc
      }, {})
      return { success: false, message: "Erreur de validation. Veuillez vérifier vos sélections.", errors: fieldErrors }
    }

    return {
      success: false,
      message: "Une erreur inattendue est survenue lors de la génération de l'offre. Veuillez réessayer.",
    }
  }
}
