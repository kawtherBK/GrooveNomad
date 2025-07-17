"use client"

import { TransportSearch } from "@/components/transport-search"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plane, Train, Bus, Sparkles } from "lucide-react"

export default function TransportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C3A] via-[#1C1C3A]/95 to-[#00CFC1]/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <Badge className="bg-white/20 text-white border-0 px-6 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Transport Intelligent
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">Trouve ton Transport Parfait</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Compare les prix et horaires de tous les moyens de transport pour tes aventures clubbing
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12">
        <TransportSearch />

        {/* Informations sur les partenaires */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#FDFBF6] to-[#00CFC1]/5 border-2 border-[#00CFC1]/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Plane className="h-6 w-6 text-[#FFB800]" />
                <h3 className="text-lg font-bold text-[#1C1C3A]">Vols</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">Compare les prix de centaines de compagnies aériennes</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Skyscanner</Badge>
                <Badge variant="outline">Rome2Rio</Badge>
                <Badge variant="outline">Kayak</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FDFBF6] to-[#FFB800]/5 border-2 border-[#FFB800]/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Train className="h-6 w-6 text-[#00CFC1]" />
                <h3 className="text-lg font-bold text-[#1C1C3A]">Trains</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">Réservation directe avec les meilleures compagnies</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Trainline</Badge>
                <Badge variant="outline">SNCF</Badge>
                <Badge variant="outline">Eurostar</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FDFBF6] to-[#FF6B6B]/5 border-2 border-[#FF6B6B]/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bus className="h-6 w-6 text-[#FF6B6B]" />
                <h3 className="text-lg font-bold text-[#1C1C3A]">Bus & Covoiturage</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">Options économiques et écologiques</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">BlaBlaCar</Badge>
                <Badge variant="outline">FlixBus</Badge>
                <Badge variant="outline">Ouibus</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Avantages */}
        <Card className="mt-12 bg-gradient-to-r from-[#1C1C3A]/90 to-[#00CFC1]/20 text-white border-2 border-[#00CFC1]/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Pourquoi utiliser notre comparateur ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Comparaison Complète</h3>
                <p className="text-sm text-gray-300">Tous les moyens de transport en un seul endroit</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#00CFC1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">IA Personnalisée</h3>
                <p className="text-sm text-gray-300">Recommandations basées sur tes préférences</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">€</span>
                </div>
                <h3 className="font-semibold mb-2">Meilleurs Prix</h3>
                <p className="text-sm text-gray-300">Garantie du prix le plus bas</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xs">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Réservation Rapide</h3>
                <p className="text-sm text-gray-300">Réservation en quelques clics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
