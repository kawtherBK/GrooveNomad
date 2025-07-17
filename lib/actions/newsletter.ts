export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  // Validation basique
  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Adresse email invalide",
    }
  }

  // Simulation d'une inscription (tu peux intégrer avec Mailchimp, ConvertKit, etc.)
  try {
    // Ici tu peux ajouter l'intégration avec ton service de newsletter
    console.log("Nouvelle inscription newsletter:", email)

    // Simulation d'un délai
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "🎉 Inscription réussie ! Prépare-toi pour des aventures épiques !",
    }
  } catch (error) {
    return {
      success: false,
      message: "Erreur lors de l'inscription. Réessaie plus tard.",
    }
  }
}
