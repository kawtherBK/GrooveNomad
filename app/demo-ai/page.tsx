"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea" // Importez Textarea
import { Sparkles, Send, Loader2 } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function DemoAIPage() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendQuery = async () => {
    if (!query.trim()) {
      setError("Merci d'entrer une question.")
      return
    }

    setIsLoading(true)
    setError(null)
    setResponse("⏳ En cours...") // Afficher le message de chargement

    try {
      const res = await fetch("https://huggingface.co/spaces/klydekushy/GrooveNomad_Festivals/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!res.ok) {
        throw new Error(`Erreur HTTP ${res.status}`)
      }

      const data = await res.json()

      if (data.response) {
        setResponse(data.response)
      } else if (data.error) {
        setResponse(`Erreur : ${data.error}`)
      } else {
        setResponse("Réponse inconnue du serveur.")
      }
    } catch (err: any) {
      console.error("Erreur lors de l'appel à l'API Hugging Face:", err)
      setResponse(`Erreur réseau : ${err.message}`)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-[#1C1C3A] text-white flex flex-col">
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
          <Sparkles className="inline-block h-8 w-8 mr-3 text-[#FFB800] animate-pulse" />
          Ask GrooveNomad Festivals
        </h1>
        <p className="text-gray-400">Posez vos questions sur les festivals, les destinations et les voyages.</p>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Card className="bg-white/5 border border-[#00CFC1]/20 text-white rounded-lg shadow-lg p-6">
          <CardContent className="p-0">
            <div className="mb-4">
              <Textarea
                id="query"
                placeholder="Tape ta question ici..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-32 bg-gray-800/50 border-gray-700 text-white focus:border-[#FFB800] focus:ring-[#FFB800]/50 resize-y"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={sendQuery}
              className="w-full bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
              Envoyer
            </Button>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <h2 className="text-xl font-bold text-gray-200 mt-8 mb-4">Réponse :</h2>
            <pre
              id="response"
              className="bg-gray-800/50 border border-gray-700 rounded-md p-4 text-gray-200 whitespace-pre-wrap break-words min-h-[150px]"
              aria-live="polite"
            >
              {response}
            </pre>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
    </>
  )
}
