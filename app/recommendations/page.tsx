import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, RefreshCw, Heart, CalendarDays, MapPin, Sparkles, Users } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { UserCard } from "@/components/user-card"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import { Header } from "@/components/header"

export default function RecommendationsPage() {
  // Données d'exemple pour les préférences analysées
  const analyzedPreferences = {
    interests: ["Technologie", "Sport", "Voyage"],
    availability: "Soirées et week-ends",
    location: "Paris, France",
  }

  // Données d'exemple pour les événements recommandés
  const recommendedEvents = [
    {
      imageSrc: "/placeholder.svg?height=96&width=96",
      title: "Festival de la Musique",
      description: "Découvrez les musique du moment",
      date: "15 Août 2025",
      location: "Paris",
      compatibility: 95,
    },
    {
      imageSrc: "/placeholder.svg?height=96&width=96",
      title: "Nuit Électro Berlin",
      description: "Plongez dans la scène techno underground",
      date: "22 Septembre 2025",
      location: "Berlin",
      compatibility: 88,
    },
    {
      imageSrc: "/placeholder.svg?height=96&width=96",
      title: "Beach Party Ibiza",
      description: "Soleil, sable et sons house",
      date: "10 Juillet 2025",
      location: "Ibiza",
      compatibility: 92,
    },
    {
      imageSrc: "/placeholder.svg?height=96&width=96",
      title: "Rave Secrète Londres",
      description: "Une expérience immersive unique",
      date: "05 Octobre 2025",
      location: "Londres",
      compatibility: 85,
    },
  ]

  // Données d'exemple pour les connexions suggérées
  const suggestedConnections = [
    {
      avatarSrc: "/placeholder.svg?height=64&width=64",
      name: "Thomas Dubois",
      description: "Coach Sportif, Passionné de Musique",
      interests: ["Sport", "Musique"],
      affinity: 95,
    },
    {
      avatarSrc: "/placeholder.svg?height=64&width=64",
      name: "Léa Martin",
      description: "Organisatrice d'événements, Ambianceuse",
      interests: ["Voyage", "Fête"],
      affinity: 90,
    },
    {
      avatarSrc: "/placeholder.svg?height=64&width=64",
      name: "Marc Dupont",
      description: "DJ Amateur, Explorateur Urbain",
      interests: ["Techno", "Découverte"],
      affinity: 87,
    },
    {
      avatarSrc: "/placeholder.svg?height=64&width=64",
      name: "Sophie Lefevre",
      description: "Artiste Visuelle, Fan de Festivals",
      interests: ["Art", "Festival"],
      affinity: 89,
    },
  ]

  return (
    <>
   <Header/>
    
    
    <div className="min-h-screen bg-[#1C1C3A] text-white">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Recommandation Personnalisées</h1>
            <p className="text-gray-400 mt-1">Basées sur vos préférences et votre profil d'utilisateur</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="bg-white/10 text-white border-[#00CFC1]/50 hover:bg-white/20">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
            <Button className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Analyzed Preferences */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-200 mb-4">Vos préférences Analysées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/5 border border-[#00CFC1]/20 text-white rounded-lg shadow-lg p-4 flex flex-col items-start">
              <Heart className="h-6 w-6 text-[#FFB800] mb-2" />
              <h3 className="font-semibold text-lg mb-2">Centre d'intérêt</h3>
              <div className="flex flex-wrap gap-2">
                {analyzedPreferences.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    className="bg-[#1C1C3A]/50 text-gray-300 border border-[#1C1C3A]/70 text-xs px-3 py-1 rounded-full"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>
            <Card className="bg-white/5 border border-[#FF6B6B]/20 text-white rounded-lg shadow-lg p-4 flex flex-col items-start">
              <CalendarDays className="h-6 w-6 text-[#FF6B6B] mb-2" />
              <h3 className="font-semibold text-lg mb-2">Disponibilité</h3>
              <p className="text-sm text-gray-300">{analyzedPreferences.availability}</p>
            </Card>
            <Card className="bg-white/5 border border-[#FFB800]/20 text-white rounded-lg shadow-lg p-4 flex flex-col items-start">
              <MapPin className="h-6 w-6 text-[#00CFC1] mb-2" />
              <h3 className="font-semibold text-lg mb-2">Localisation</h3>
              <p className="text-sm text-gray-300">{analyzedPreferences.location}</p>
            </Card>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Events */}
        <div>
          <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-[#FFB800]" />
            Événements Recommandés
            <span className="text-sm font-normal text-gray-400 ml-2">Basé sur vos intérêts</span>
          </h2>
          <div className="space-y-4">
            {recommendedEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>

        {/* Suggested Connections */}
        <div>
          <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-[#FF6B6B]" />
            Connexions Suggérées
            <span className="text-sm font-normal text-gray-400 ml-2">Profils Similaires</span>
          </h2>
          <div className="space-y-4">
            {suggestedConnections.map((user, index) => (
              <UserCard key={index} {...user} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </>
  )
}
