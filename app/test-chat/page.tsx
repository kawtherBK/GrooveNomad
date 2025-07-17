"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TestChatPage() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    setError("")
    setResponse("")

    try {
      console.log("🚀 Envoi de la requête à l'API...")

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: message || "Salut, peux-tu me parler de GrooveNomad ?",
            },
          ],
        }),
      })

      console.log("📡 Statut de la réponse:", res.status)
      console.log("📡 Headers:", Object.fromEntries(res.headers.entries()))

      if (!res.ok) {
        const errorText = await res.text()
        console.error("❌ Erreur HTTP:", errorText)
        setError(`Erreur HTTP ${res.status}: ${errorText}`)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) {
        setError("❌ Pas de reader disponible")
        return
      }

      let fullResponse = ""
      console.log("📖 Lecture du stream...")

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        console.log("📦 Chunk reçu:", chunk)
        fullResponse += chunk
      }

      console.log("✅ Réponse complète:", fullResponse)
      setResponse(fullResponse)
    } catch (err) {
      console.error("💥 Erreur catch:", err)
      setError(`Erreur: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C3A] to-[#00CFC1]/20 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <h1 className="text-2xl font-bold text-[#1C1C3A]">🔧 Test API ChatGPT</h1>
            <p className="text-gray-600">Diagnostic du chatbot GrooveNomad</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Message de test :</label>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Salut, peux-tu me parler de GrooveNomad ?"
                className="w-full"
              />
            </div>

            <Button
              onClick={testAPI}
              disabled={loading}
              className="bg-gradient-to-r from-[#FFB800] to-[#00CFC1] text-white"
            >
              {loading ? "🔄 Test en cours..." : "🚀 Tester l'API"}
            </Button>

            {error && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-red-800 mb-2">❌ Erreur détectée :</h3>
                  <pre className="text-red-700 text-sm whitespace-pre-wrap">{error}</pre>
                </CardContent>
              </Card>
            )}

            {response && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-green-800 mb-2">✅ Réponse reçue :</h3>
                  <pre className="text-green-700 text-sm whitespace-pre-wrap">{response}</pre>
                </CardContent>
              </Card>
            )}

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-800 mb-2">📋 Checklist de diagnostic :</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Vérifiez la console du navigateur (F12)</li>
                  <li>• Vérifiez que OPENAI_API_KEY est configurée</li>
                  <li>• Vérifiez que l'API route existe dans app/api/chat/route.ts</li>
                  <li>• Vérifiez les logs du serveur Next.js</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
