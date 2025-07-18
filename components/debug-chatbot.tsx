"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, AlertTriangle } from "lucide-react"
import { useChat } from "ai/react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function DebugChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const { language } = useLanguage()
  const t = useTranslation(language)

  const addDebugInfo = (info: string) => {
    console.log("🐛 Debug:", info)
    setDebugInfo((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${info}`])
  }

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: t.chatbotGreeting,
      },
    ],
    onError: (error) => {
      console.error("❌ Erreur useChat:", error)
      addDebugInfo(`Erreur: ${error.message}`)
      // AJOUTEZ CETTE LIGNE POUR VOIR L'OBJET D'ERREUR COMPLET
      console.log("Détails de l'erreur useChat:", error)
    },
    onFinish: (message) => {
      console.log("✅ Message terminé:", message)
      addDebugInfo("Message reçu avec succès")
    },
    onResponse: (response) => {
      console.log("📡 Réponse reçue:", response.status)
      addDebugInfo(`Réponse HTTP: ${response.status}`)
    },
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    addDebugInfo(`Envoi du message: "${input}"`)
    handleSubmit(e)
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] shadow-2xl animate-pulse relative"
          >
            <MessageCircle className="h-8 w-8 text-white" />
            {error && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-3 w-3 text-white" />
              </div>
            )}
          </Button>
        )}
      </div>

     
    </>
  )
}
