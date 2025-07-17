"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Search, Loader2 } from "lucide-react"
import { Footer } from "@/components/footer" // Assurez-vous que le footer est importé
import { Header } from "@/components/header"

export default function DemoAIPage() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Veuillez entrer une question.")
      return
    }

    setIsLoading(true)
    setError(null)
    setResponse("") // Clear previous response

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Erreur lors de la récupération de la réponse de l'IA.")
      }

      const data = await res.json()
      setResponse(data.response)
    } catch (err: any) {
      console.error("Error fetching AI response:", err)
      setError(err.message || "Une erreur inattendue est survenue.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-[#1C1C3A] text-white flex flex-col py-20">
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
          <Sparkles className="inline-block h-8 w-8 mr-3 text-[#FFB800] animate-pulse" />
          Recherche de Festivals Intelligente
        </h1>
        <p className="text-gray-400">Posez vos questions sur les festivals, les destinations et les voyages.</p>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Card className="bg-white/5 border border-[#00CFC1]/20 text-white rounded-lg shadow-lg p-6">
          <CardContent className="p-0">
            <div className="flex space-x-3 mb-4">
              <Input
                type="text"
                placeholder="Ex: Festival techno pas cher en Allemagne..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
                className="flex-1 bg-gray-800/50 border-gray-700 text-white focus:border-[#FFB800] focus:ring-[#FFB800]/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white font-bold"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                <span className="ml-2 hidden sm:inline">Rechercher</span>
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div
              className="mt-4 p-4 border border-gray-700 rounded-md bg-gray-800/50 min-h-[100px] whitespace-pre-wrap"
              aria-live="polite"
            >
              {response ? (
                <p className="text-gray-200">{response}</p>
              ) : (
                <p className="text-gray-500">La réponse de l'IA apparaîtra ici...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      
    </div>
    <Footer />
    </>
  )
}
