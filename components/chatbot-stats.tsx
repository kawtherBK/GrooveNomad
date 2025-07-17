"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Zap, Globe } from "lucide-react"

export function ChatbotStats() {
  const [stats, setStats] = useState({
    totalChats: 0,
    activeUsers: 0,
    responseTime: 0,
    languages: 5,
  })

  useEffect(() => {
    // Simuler des statistiques en temps réel
    const interval = setInterval(() => {
      setStats((prev) => ({
        totalChats: prev.totalChats + Math.floor(Math.random() * 3),
        activeUsers: 150 + Math.floor(Math.random() * 50),
        responseTime: 0.8 + Math.random() * 0.4,
        languages: 5,
      }))
    }, 5000)

    // Initialiser avec des valeurs de base
    setStats({
      totalChats: 12847,
      activeUsers: 187,
      responseTime: 1.2,
      languages: 5,
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <Card className="bg-gradient-to-br from-[#1C1C3A]/90 to-[#00CFC1]/20 border border-[#00CFC1]/30 backdrop-blur-md shadow-xl">
        <CardContent className="p-3">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1 text-white">
              <MessageCircle className="h-3 w-3 text-[#FFB800]" />
              <span>{stats.totalChats.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 text-white">
              <Users className="h-3 w-3 text-[#00CFC1]" />
              <span>{stats.activeUsers}</span>
            </div>
            <div className="flex items-center space-x-1 text-white">
              <Zap className="h-3 w-3 text-[#FF6B6B]" />
              <span>{stats.responseTime.toFixed(1)}s</span>
            </div>
            <Badge className="bg-gradient-to-r from-[#FFB800]/20 to-[#00CFC1]/20 text-white border-0 text-xs">
              <Globe className="h-3 w-3 mr-1" />
              {stats.languages} langues
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
