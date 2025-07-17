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

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px]">
          <Card className="h-full bg-white border-2 border-[#00CFC1]/40 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#FFB800] to-[#00CFC1] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <div>
                    <h3 className="font-bold">Debug Chatbot</h3>
                    <p className="text-xs opacity-90">
                      {error ? "❌ Erreur" : isLoading ? "⏳ Chargement..." : "✅ En ligne"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-gradient-to-r from-[#FFB800] to-[#00CFC1] text-white"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === "assistant" && <Bot className="h-4 w-4 mt-0.5" />}
                        {message.role === "user" && <User className="h-4 w-4 mt-0.5" />}
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-medium text-sm">Erreur de connexion</p>
                        <p className="text-red-600 text-xs">{error.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Debug Info */}
              {debugInfo.length > 0 && (
                <div className="border-t bg-gray-50 p-2 max-h-24 overflow-y-auto">
                  <p className="text-xs font-medium text-gray-600 mb-1">🐛 Debug:</p>
                  {debugInfo.slice(-3).map((info, index) => (
                    <p key={index} className="text-xs text-gray-500">
                      {info}
                    </p>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleFormSubmit} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Tape ton message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {error ? "❌ Erreur de connexion" : "✅ Prêt à discuter"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
