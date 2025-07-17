"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { languages, type Language } from "@/lib/i18n"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-white hover:bg-white/10 flex items-center space-x-2"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{languages[language]}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-40 bg-[#1C1C3A]/95 border-[#00CFC1]/30 backdrop-blur-sm z-50">
          <CardContent className="p-2">
            {Object.entries(languages).map(([code, name]) => (
              <Button
                key={code}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLanguage(code as Language)
                  setIsOpen(false)
                }}
                className={`w-full justify-start text-left ${
                  language === code
                    ? "bg-gradient-to-r from-[#FFB800]/20 to-[#FF6B6B]/20 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {name}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
