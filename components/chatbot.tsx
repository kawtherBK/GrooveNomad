"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { useChat } from "ai/react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const t = useTranslation(language)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: t.chatbotGreeting,
      },
    ],
  })

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse hover:scale-110"
          >
            <MessageCircle className="h-8 w-8 text-white drop-shadow-lg" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96">
          <Card className="h-full bg-gradient-to-br from-[#FDFBF6] to-[#FDFBF6]/90 border-2 border-[#00CFC1]/40 shadow-2xl backdrop-blur-md">
            <CardHeader className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Assistant GrooveNomad</h3>
                    <p className="text-xs opacity-90 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      {t.online}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-transparent to-[#00CFC1]/5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
                        message.role === "assistant"
                          ? "bg-gradient-to-br from-[#00CFC1]/15 via-[#FFB800]/10 to-[#FF6B6B]/10 text-[#1C1C3A] border border-[#00CFC1]/20"
                          : "bg-gradient-to-br from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white shadow-lg"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === "assistant" && <Bot className="h-4 w-4 mt-0.5 text-[#00CFC1]" />}
                        {message.role === "user" && <User className="h-4 w-4 mt-0.5 text-white" />}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-[#00CFC1]/15 via-[#FFB800]/10 to-[#FF6B6B]/10 p-3 rounded-2xl border border-[#00CFC1]/20">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-[#00CFC1]" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#00CFC1] rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-[#FFB800] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#00CFC1]/20 bg-gradient-to-r from-[#FDFBF6] to-[#00CFC1]/5">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder={t.chatbotPlaceholder}
                    className="flex-1 border-[#00CFC1]/30 focus:border-[#FFB800] text-[#1C1C3A] bg-white/80 backdrop-blur-sm"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white p-2 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
