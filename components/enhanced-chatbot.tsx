"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button" // Assurez-vous que le chemin est correct
import { MessageCircle, Sparkles, Bot, User } from "lucide-react" // Assurez-vous que le chemin est correct
import Link from "next/link" // Import de Link
// import { useTranslation } from "react-i18next" // Commenté si non utilisé

export function EnhancedChatbot() {
  // const [isOpen, setIsOpen] = useState(false) // Supprimé car le bouton redirige
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const currentQuestions = [
    { query: "Question 1", text: "Text 1", icon: Bot },
    { query: "Question 2", text: "Text 2", icon: User },
  ]
  // const { t } = useTranslation() // Commenté si non utilisé

  const handleQuickQuestion = (query: string) => {
    // Handle quick question logic here
    console.log("Quick question:", query)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle submit logic here
    console.log("Input submitted:", input)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const reload = () => {
    // Reload logic here
    console.log("Reload chat")
  }

  const stop = () => {
    // Stop logic here
    console.log("Stop chat")
  }

  return (
    <>
      {/* Chat Button transformé en lien vers la démo AI */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Link href="/demo-ai">
            <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse hover:scale-110 group">
              <MessageCircle className="h-8 w-8 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          {/* Notification Badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FF6B6B] to-[#FFB800] rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>

      {/* Le reste du code du chatbot est commenté ou supprimé si le bouton ne l'ouvre plus directement */}
      {/* Si vous voulez que le chatbot s'ouvre sur la page /demo-ai, vous devrez déplacer ce bloc là-bas */}
      {/* Pour l'instant, il est supprimé d'ici pour correspondre à la demande de "simple lien" */}
    </>
  )
}
