"use server"

import { z } from "zod"
import { redirect } from "next/navigation"

// Schéma de validation pour les données d'inscription
const registerSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères."),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  age: z.coerce.number().min(18, "Vous devez avoir au moins 18 ans.").max(99, "L'âge maximum est de 99 ans."),
  gender: z.enum(["male", "female", "non-binary", "prefer-not-to-say"]).refine(val => !!val, {
    message: "Veuillez sélectionner un genre.",
  }),
})

export async function registerUser(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    age: formData.get("age"),
    gender: formData.get("gender"),
  }

  console.log("Attempting to register user with data:", data)

  try {
    // Valider les données avec Zod
    const validatedData = registerSchema.parse(data)
    console.log("Validated data:", validatedData)

    // Simuler un délai réseau pour l'enregistrement initial
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // --- Début de l'intégration Airtable ---
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Registrations" // Nom de votre table Airtable

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error("❌ Variables d'environnement Airtable manquantes.")
      return { success: false, message: "Erreur de configuration Airtable." }
    }

    const airtableRecord = {
      fields: {
        Email: validatedData.email,
        "Nom": validatedData.firstName, // Assurez-vous que les noms de colonnes correspondent à Airtable
        "Prénom": validatedData.lastName,
        Age: validatedData.age,
        Sexe: validatedData.gender,
        // N'envoyez PAS le mot de passe à Airtable pour des raisons de sécurité
      },
    }

    console.log("Sending data to Airtable:", airtableRecord)

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [airtableRecord] }),
      },
    )

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json()
      console.error("❌ Erreur Airtable:", airtableResponse.status, errorData)
      return {
        success: false,
        message: `Erreur lors de l'enregistrement Airtable: ${errorData.error?.message || airtableResponse.statusText}`,
      }
    }

    console.log("✅ Données enregistrées dans Airtable avec succès.")
    return { success: true }
    // --- Fin de l'intégration Airtable ---


// Ne rien retourner après redirect

  } catch (error: any) {
    console.error("❌ Erreur d'inscription:", error)

    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce((acc: Record<string, string>, err) => {
        if (err.path.length > 0) {
          acc[err.path[0]] = err.message
        }
        return acc
      }, {})
      return { success: false, message: "Erreur de validation.", errors: fieldErrors }
    }

    return { success: false, message: "Une erreur inattendue est survenue. Veuillez réessayer." }
  }
}
