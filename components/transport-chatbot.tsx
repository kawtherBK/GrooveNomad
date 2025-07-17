"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, User, MapPin, Plane, Train } from "lucide-react"
import { useChat } from "ai/react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function TransportChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const t = useTranslation(language)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "transport-welcome",
        role: "assistant",
        content:
          "Salut ! 🚗 Je suis ton expert transport GrooveNomad. Je peux t'aider à trouver les meilleurs trajets pour tes aventures clubbing ! Dis-moi d'où tu pars et où tu veux aller ? ✈️",
      },
    ],
    onFinish: async (message) => {
      // Détecter si le message contient une demande de transport
      if (
        message.content.toLowerCase().includes("transport") ||
        message.content.toLowerCase().includes("voyage") ||
        message.content.toLowerCase().includes("aller")
      ) {
        // Ici on pourrait déclencher une recherche automatique
        console.log("Demande de transport détectée:", message.content)
      }
    },
  })

  const quickTransportQuestions = [
    {
      icon: Plane,
      text: "Vol Paris → Ibiza",
      query: "Je veux aller de Paris à Ibiza pour un festival, quelles sont les meilleures options de vol ?",
    },
    {
      icon: Train,
      text: "Train vers Berlin",
      query: "Comment aller à Berlin en train depuis Paris pour faire la fête ?",
    },
    {
      icon: MapPin,
      text: "Transport économique",
      query: "Quel est le moyen de transport le moins cher pour aller à Amsterdam ?",
    },
  ]

  const handleQuickQuestion = (query: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>

    const inputEvent = {
      target: { value: query },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(inputEvent)
    setTimeout(() => handleSubmit(syntheticEvent), 100)
  }

  return (
    <>
      {/* Transport Chat Button */}
      <div className="fixed bottom-24 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00CFC1] to-[#FFB800] hover:from-[#00b8a9] hover:to-[#e6a600] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <MapPin className="h-6 w-6 text-white" />
          </Button>
        )}
      </div>

      {/* Transport Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px]">
          <Card className="h-full bg-gradient-to-br from-[#FDFBF6] to-[#00CFC1]/5 border-2 border-[#00CFC1]/40 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#00CFC1] to-[#FFB800] text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Transport Expert</h3>
                    <p className="text-xs opacity-90">Trouve ton trajet parfait</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                        message.role === "assistant"
                          ? "bg-gradient-to-br from-[#00CFC1]/15 to-[#FFB800]/10 text-[#1C1C3A] border border-[#00CFC1]/30"
                          : "bg-gradient-to-br from-[#00CFC1] to-[#FFB800] text-white"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {message.role === "assistant" && (
                          <div className="w-6 h-6 bg-gradient-to-r from-[#00CFC1] to-[#FFB800] rounded-full flex items-center justify-center">
                            <MapPin className="h-3 w-3 text-white" />
                          </div>
                        )}
                        {message.role === "user" && (
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-[#00CFC1]/15 to-[#FFB800]/10 p-4 rounded-2xl border border-[#00CFC1]/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#00CFC1] to-[#FFB800] rounded-full flex items-center justify-center">
                          <MapPin className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#00CFC1] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#FFB800] rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-[#00CFC1] rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="p-4 border-t border-[#00CFC1]/20 bg-gradient-to-r from-[#FDFBF6] to-[#00CFC1]/5">
                  <p className="text-xs text-[#1C1C3A]/60 mb-3 font-medium">Questions rapides :</p>
                  <div className="space-y-2">
                    {quickTransportQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickQuestion(question.query)}
                        className="w-full text-xs p-2 h-auto border-[#00CFC1]/30 text-[#1C1C3A] hover:bg-gradient-to-r hover:from-[#00CFC1]/10 hover:to-[#FFB800]/10 hover:border-[#00CFC1]/50 transition-all duration-200 flex items-center justify-start space-x-2"
                      >
                        <question.icon className="h-3 w-3" />
                        <span>{question.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-[#00CFC1]/20 bg-gradient-to-r from-[#FDFBF6] to-[#00CFC1]/5">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="D'où veux-tu partir ?"
                    className="flex-1 border-[#00CFC1]/30 focus:border-[#FFB800] text-[#1C1C3A] bg-white/90"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-[#00CFC1] to-[#FFB800] text-white p-2 shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-[#1C1C3A]/50">Expert Transport IA</p>
                  <Badge className="bg-gradient-to-r from-[#00CFC1]/20 to-[#FFB800]/20 text-[#1C1C3A] border-0 text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    Transport
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
