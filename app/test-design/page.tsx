"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle } from "lucide-react"

export default function TestDesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C3A] to-[#00CFC1]/20 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header de test */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-[#00CFC1]/30">
          <CardHeader>
            <h1 className="text-3xl font-bold text-[#1C1C3A] text-center">🎨 Test du Design GrooveNomad</h1>
            <p className="text-center text-gray-600">Cette page teste si Tailwind CSS fonctionne correctement</p>
          </CardHeader>
        </Card>

        {/* Tests visuels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test des couleurs */}
          <Card className="bg-gradient-to-br from-[#FFB800]/10 to-[#FF6B6B]/10 border-2 border-[#FFB800]/30">
            <CardHeader>
              <h2 className="text-xl font-bold text-[#1C1C3A] flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Test des Couleurs
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full h-4 bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] rounded"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-[#FFB800] rounded-full"></div>
                <div className="w-8 h-8 bg-[#FF6B6B] rounded-full"></div>
                <div className="w-8 h-8 bg-[#00CFC1] rounded-full"></div>
                <div className="w-8 h-8 bg-[#1C1C3A] rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600">Si tu vois les couleurs ci-dessus, Tailwind fonctionne ! ✅</p>
            </CardContent>
          </Card>

          {/* Test des composants */}
          <Card className="bg-gradient-to-br from-[#00CFC1]/10 to-[#FFB800]/10 border-2 border-[#00CFC1]/30">
            <CardHeader>
              <h2 className="text-xl font-bold text-[#1C1C3A] flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Test des Composants
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="bg-gradient-to-r from-[#FFB800] to-[#00CFC1] text-white w-full">
                Bouton Gradient GrooveNomad
              </Button>
              <div className="flex space-x-2">
                <Badge className="bg-[#FFB800] text-white">Badge 1</Badge>
                <Badge className="bg-[#FF6B6B] text-white">Badge 2</Badge>
                <Badge className="bg-[#00CFC1] text-white">Badge 3</Badge>
              </div>
              <p className="text-sm text-gray-600">Si les boutons et badges sont stylés, shadcn/ui fonctionne ! ✅</p>
            </CardContent>
          </Card>
        </div>

        {/* Test des animations */}
        <Card className="bg-gradient-to-r from-[#1C1C3A]/90 to-[#00CFC1]/20 text-white border-2 border-[#00CFC1]/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-[#FFB800]" />
              Test des Animations
            </h2>
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-4 h-4 bg-[#FFB800] rounded-full animate-bounce"></div>
              <div
                className="w-4 h-4 bg-[#FF6B6B] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-4 h-4 bg-[#00CFC1] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] rounded-full mx-auto animate-pulse"></div>
            <p className="mt-4 text-sm text-gray-300">
              Si tu vois les animations ci-dessus, tout fonctionne parfaitement ! 🎉
            </p>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-4">📋 Que faire si le design ne s'affiche pas ?</h3>
            <div className="space-y-2 text-yellow-700 text-sm">
              <p>
                <strong>1.</strong> Ouvre la console (F12) et regarde s'il y a des erreurs
              </p>
              <p>
                <strong>2.</strong> Vérifie que le fichier <code>app/globals.css</code> existe
              </p>
              <p>
                <strong>3.</strong> Redémarre le serveur : <code>npm run dev</code>
              </p>
              <p>
                <strong>4.</strong> Vide le cache : <code>rm -rf .next</code>
              </p>
              <p>
                <strong>5.</strong> Réinstalle : <code>npm install</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Diagnostic automatique */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-800 mb-4">🔧 Diagnostic Automatique</h3>
            <Button
              onClick={() => {
                console.log("🔍 DIAGNOSTIC CSS:")
                console.log("- Tailwind classes détectées:", document.querySelector(".bg-gradient-to-r") ? "✅" : "❌")
                console.log("- Animations fonctionnelles:", document.querySelector(".animate-bounce") ? "✅" : "❌")
                console.log(
                  "- Variables CSS:",
                  getComputedStyle(document.documentElement).getPropertyValue("--background") ? "✅" : "❌",
                )
                alert("Regarde la console (F12) pour le diagnostic complet !")
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              🚀 Lancer le Diagnostic
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
