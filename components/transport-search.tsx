"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Search, Plane, Train, Bus, Car, Clock, Euro, Leaf, ExternalLink, Filter } from "lucide-react"
import type { TransportOption, TransportSearchParams } from "@/lib/transport-apis"

interface TransportSearchProps {
  onResults?: (results: TransportOption[]) => void
}

export function TransportSearch({ onResults }: TransportSearchProps) {
  const [searchParams, setSearchParams] = useState<TransportSearchParams>({
    from: "",
    to: "",
    departureDate: "",
    passengers: 1,
    preferredTypes: [],
  })

  const [results, setResults] = useState<TransportOption[]>([])
  const [recommendations, setRecommendations] = useState<TransportOption[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [preferences, setPreferences] = useState({
    budget: "medium" as "low" | "medium" | "high",
    speed: "medium" as "slow" | "medium" | "fast",
    eco: false,
  })

  const handleSearch = async () => {
    if (!searchParams.from || !searchParams.to || !searchParams.departureDate) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/transport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...searchParams, ...preferences }),
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.options)
        setRecommendations(data.recommendations)
        onResults?.(data.options)
      } else {
        console.error("Erreur de recherche:", data.error)
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTransportIcon = (type: TransportOption["type"]) => {
    const icons = {
      flight: Plane,
      train: Train,
      bus: Bus,
      car: Car,
      rideshare: Car,
    }
    const Icon = icons[type] || Bus
    return <Icon className="h-4 w-4" />
  }

  const getProviderColor = (provider: string) => {
    const colors = {
      trainline: "bg-green-500",
      skyscanner: "bg-blue-500",
      rome2rio: "bg-purple-500",
      blablacar: "bg-blue-400",
      uber: "bg-black",
    }
    return colors[provider as keyof typeof colors] || "bg-gray-500"
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins > 0 ? mins.toString().padStart(2, "0") : ""}`
  }

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Formulaire de recherche */}
      <Card className="bg-gradient-to-br from-[#FDFBF6] to-[#00CFC1]/5 border-2 border-[#00CFC1]/30">
        <CardHeader>
          <h2 className="text-2xl font-bold text-[#1C1C3A] flex items-center">
            <MapPin className="h-6 w-6 mr-2 text-[#00CFC1]" />
            Recherche de Transport
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1C1C3A] mb-1">Départ</label>
              <Input
                placeholder="Paris, France"
                value={searchParams.from}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, from: e.target.value }))}
                className="border-[#00CFC1]/30 focus:border-[#FFB800]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1C1C3A] mb-1">Destination</label>
              <Input
                placeholder="Berlin, Allemagne"
                value={searchParams.to}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, to: e.target.value }))}
                className="border-[#00CFC1]/30 focus:border-[#FFB800]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1C1C3A] mb-1">Date de départ</label>
              <Input
                type="datetime-local"
                value={searchParams.departureDate}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, departureDate: e.target.value }))}
                className="border-[#00CFC1]/30 focus:border-[#FFB800]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1C1C3A] mb-1">Passagers</label>
              <Input
                type="number"
                min="1"
                max="9"
                value={searchParams.passengers}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, passengers: Number.parseInt(e.target.value) }))}
                className="border-[#00CFC1]/30 focus:border-[#FFB800]"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="mr-2 border-[#00CFC1]/30 text-[#1C1C3A]"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-[#FFB800] to-[#00CFC1] text-white flex-1"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Recherche...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="border-t border-[#00CFC1]/20 pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1C1C3A] mb-2">Budget</label>
                  <div className="flex space-x-2">
                    {["low", "medium", "high"].map((budget) => (
                      <Button
                        key={budget}
                        variant={preferences.budget === budget ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreferences((prev) => ({ ...prev, budget: budget as any }))}
                        className={
                          preferences.budget === budget
                            ? "bg-[#FFB800] text-white"
                            : "border-[#00CFC1]/30 text-[#1C1C3A]"
                        }
                      >
                        {budget === "low" ? "€" : budget === "medium" ? "€€" : "€€€"}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1C1C3A] mb-2">Vitesse</label>
                  <div className="flex space-x-2">
                    {["slow", "medium", "fast"].map((speed) => (
                      <Button
                        key={speed}
                        variant={preferences.speed === speed ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreferences((prev) => ({ ...prev, speed: speed as any }))}
                        className={
                          preferences.speed === speed ? "bg-[#00CFC1] text-white" : "border-[#00CFC1]/30 text-[#1C1C3A]"
                        }
                      >
                        {speed === "slow" ? "🐌" : speed === "medium" ? "🚗" : "⚡"}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1C1C3A] mb-2">Écologique</label>
                  <Button
                    variant={preferences.eco ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences((prev) => ({ ...prev, eco: !prev.eco }))}
                    className={preferences.eco ? "bg-green-500 text-white" : "border-[#00CFC1]/30 text-[#1C1C3A]"}
                  >
                    <Leaf className="h-4 w-4 mr-1" />
                    {preferences.eco ? "Activé" : "Désactivé"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommandations */}
      {recommendations.length > 0 && (
        <Card className="bg-gradient-to-br from-[#FFB800]/10 to-[#FF6B6B]/10 border-2 border-[#FFB800]/30">
          <CardHeader>
            <h3 className="text-xl font-bold text-[#1C1C3A] flex items-center">⭐ Recommandations IA</h3>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recommendations.slice(0, 3).map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-4 bg-white/80 rounded-lg border border-[#FFB800]/20"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 ${getProviderColor(option.provider)} rounded-full flex items-center justify-center text-white`}
                    >
                      {getTransportIcon(option.type)}
                    </div>
                    <div>
                      <p className="font-medium text-[#1C1C3A]">
                        {option.from} → {option.to}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(option.departure)} • {formatDuration(option.duration)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#FFB800]">{option.price}€</p>
                    {option.carbonFootprint && (
                      <p className="text-xs text-green-600 flex items-center">
                        <Leaf className="h-3 w-3 mr-1" />
                        {option.carbonFootprint}kg CO₂
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Résultats */}
      {results.length > 0 && (
        <Card className="bg-gradient-to-br from-[#FDFBF6] to-[#00CFC1]/5 border-2 border-[#00CFC1]/30">
          <CardHeader>
            <h3 className="text-xl font-bold text-[#1C1C3A]">Tous les résultats ({results.length})</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((option) => (
                <Card key={option.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 ${getProviderColor(option.provider)} rounded-full flex items-center justify-center text-white`}
                        >
                          {getTransportIcon(option.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {option.provider}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                              {option.type}
                            </Badge>
                            {option.stops === 0 && (
                              <Badge className="bg-green-100 text-green-800 text-xs">Direct</Badge>
                            )}
                          </div>
                          <p className="font-medium text-[#1C1C3A]">
                            {option.from} → {option.to}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDateTime(option.departure)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDuration(option.duration)}
                            </span>
                            {option.stops > 0 && (
                              <span>
                                {option.stops} escale{option.stops > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-[#1C1C3A] flex items-center">
                            <Euro className="h-5 w-5 mr-1" />
                            {option.price}
                          </p>
                          {option.carbonFootprint && (
                            <p className="text-xs text-green-600 flex items-center justify-end">
                              <Leaf className="h-3 w-3 mr-1" />
                              {option.carbonFootprint}kg CO₂
                            </p>
                          )}
                        </div>

                        {option.bookingUrl && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#FFB800] to-[#00CFC1] text-white"
                            onClick={() => window.open(option.bookingUrl, "_blank")}
                          >
                            Réserver
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {option.amenities && option.amenities.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap gap-1">
                          {option.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
