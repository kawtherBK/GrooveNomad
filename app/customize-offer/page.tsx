"use client"

import { useState } from "react" // useActionState n'est plus nécessaire
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Music,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  Plane,
  Train,
  Bus,
  Car,
  Hotel,
  Tent,
  PartyPopper,
  Wallet,
  CalendarDays,
  MapPin,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CustomizeOfferPage() {
  // const [state, formAction, isPending] = useActionState(generatePersonalizedOffer, null) // Supprimé
  const [currentStep, setCurrentStep] = useState(1)

  // États locaux pour les sélections visuelles
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [soloOrGroup, setSoloOrGroup] = useState<string>("solo")
  const [selectedBudget, setSelectedBudget] = useState<string>("medium")
  const [selectedTravelModes, setSelectedTravelModes] = useState<string[]>([])
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>("hotel")
  const [departureDate, setDepartureDate] = useState<string>("")
  const [returnDate, setReturnDate] = useState<string>("")

  const totalSteps = 4 // Nombre total d'étapes

  const musicalGenres = [
    "Techno",
    "House",
    "Trance",
    "Drum & Bass",
    "Electro",
    "Hip-Hop",
    "Pop",
    "Rock",
    "Reggae",
    "Autre",
  ]
  const eventTypes = ["Festival", "Concert", "Club", "Rave", "Afterparty", "Privé"]
  const countries = [
    "France",
    "Espagne",
    "Allemagne",
    "Royaume-Uni",
    "Pays-Bas",
    "États-Unis",
    "Japon",
    "Australie",
    "Brésil",
    "Italie",
    "Grèce",
    "Autre",
  ]
  const travelModes = [
    { value: "plane", label: "Avion", icon: Plane },
    { value: "train", label: "Train", icon: Train },
    { value: "bus", label: "Bus", icon: Bus },
    { value: "carpooling", label: "Covoiturage", icon: Car },
  ]

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const handleEventTypeChange = (type: string) => {
    setSelectedEventTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleTravelModeChange = (mode: string) => {
    setSelectedTravelModes((prev) => (prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Tes Vibes & Compagnons"
      case 2:
        return "Ton Événement & Destination"
      case 3:
        return "Ton Budget & Quand Partir"
      case 4:
        return "Comment tu bouges & où tu dors"
      default:
        return "Personnalise Ton Aventure"
    }
  }
  return (
    <>
    <Header/>
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C1C3A] via-[#1C1C3A]/90 to-[#00CFC1]/20 p-4 sm:p-8">
      <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-lg border-2 border-[#00CFC1]/40 shadow-3xl rounded-xl overflow-hidden">
        <CardHeader className="text-center p-8 bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white rounded-t-xl relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("/placeholder.svg?height=200&width=800")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <h1 className="text-4xl font-extrabold drop-shadow-lg relative z-10">
            <Sparkles className="inline-block h-8 w-8 mr-3 text-white animate-pulse" />
            Crée Ton Voyage Ultime
            <Sparkles className="inline-block h-8 w-8 ml-3 text-white animate-pulse" />
          </h1>
          <p className="text-lg opacity-90 mt-2 relative z-10">{getStepTitle(currentStep)}</p>
          {/* Progress Bar */}
          <div className="w-full bg-white/30 rounded-full h-2.5 mt-4 relative z-10">
            <div
              className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm opacity-90 mt-2 relative z-10">
            Étape {currentStep} sur {totalSteps}
          </p>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-10">
          {/* Suppression de la balise <form> */}
          <div className="space-y-8">
            {/* Step 1: Ta Vibe */}
            {currentStep === 1 && (
              <div className="bg-gradient-to-br from-[#FDFBF6] to-[#00CFC1]/5 p-6 rounded-lg shadow-inner border border-[#00CFC1]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-[#1C1C3A] mb-6 flex items-center">
                  <Music className="h-6 w-6 mr-3 text-[#FFB800]" />
                  Ta Vibe
                </h2>
                {/* Genre Musical */}
                <div className="mb-6">
                  <Label className="block text-lg font-semibold text-[#1C1C3A] mb-3">
                    Quel est ton rythme ? (Genre Musical Préféré)
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {musicalGenres.map((genre) => (
                      <Button
                        key={genre}
                        type="button"
                        onClick={() => handleGenreChange(genre)}
                        className={`w-full justify-start px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                          selectedGenres.includes(genre)
                            ? "bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white shadow-md scale-105"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        <Checkbox
                          id={`genre-${genre}`}
                          name="musicalGenres"
                          value={genre}
                          checked={selectedGenres.includes(genre)}
                          className="mr-2 hidden" // Cache la checkbox par défaut, le bouton agit comme indicateur visuel
                        />
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Solo ou en Groupe */}
                <div>
                  <Label className="block text-lg font-semibold text-[#1C1C3A] mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-[#FF6B6B]" />
                    Voyages-tu plutôt...
                  </Label>
                  <RadioGroup
                    defaultValue="solo"
                    onValueChange={setSoloOrGroup}
                    value={soloOrGroup}
                    name="soloOrGroup"
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="solo"
                        id="solo"
                        className="border-[#00CFC1] data-[state=checked]:bg-[#FFB800] data-[state=checked]:border-[#FFB800] h-5 w-5"
                      />
                      <Label htmlFor="solo" className="text-base font-medium text-gray-700">
                        Seul(e)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="group"
                        id="group"
                        className="border-[#00CFC1] data-[state=checked]:bg-[#FFB800] data-[state=checked]:border-[#FFB800] h-5 w-5"
                      />
                      <Label htmlFor="group" className="text-base font-medium text-gray-700">
                        En groupe
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 2: Événement & Destination */}
            {currentStep === 2 && (
              <div className="bg-gradient-to-br from-[#FDFBF6] to-[#FF6B6B]/5 p-6 rounded-lg shadow-inner border border-[#FF6B6B]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-[#1C1C3A] mb-6 flex items-center">
                  <PartyPopper className="h-6 w-6 mr-3 text-[#00CFC1]" />
                  Ton Événement & Destination
                </h2>
                {/* Type d'événement */}
                <div className="mb-6">
                  <Label className="block text-lg font-semibold text-[#1C1C3A] mb-3">
                    Quel type d'événement recherches-tu ?
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {eventTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        onClick={() => handleEventTypeChange(type)}
                        className={`w-full justify-start px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                          selectedEventTypes.includes(type)
                            ? "bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white shadow-md scale-105"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        <Checkbox
                          id={`event-${type}`}
                          name="eventTypes"
                          value={type}
                          checked={selectedEventTypes.includes(type)}
                          className="mr-2 hidden" // Cache la checkbox par défaut
                        />
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Pays */}
                <div>
                  <Label
                    htmlFor="country"
                    className="block text-lg font-semibold text-[#1C1C3A] mb-3 flex items-center"
                  >
                    <MapPin className="h-5 w-5 mr-2 text-[#FFB800]" />
                    Où veux-tu faire la fête ? (Pays de Destination)
                  </Label>
                  <Select onValueChange={setSelectedCountry} value={selectedCountry} name="country">
                    <SelectTrigger className="w-full pl-12 py-2 h-12 text-base border-[#00CFC1]/30 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/50 rounded-lg">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                      <SelectValue placeholder="Sélectionner un pays" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#00CFC1]/30 rounded-lg shadow-lg">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country} className="py-2 text-base">
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Dates */}
            {currentStep === 3 && (
              <div className="bg-gradient-to-br from-[#FDFBF6] to-[#FFB800]/5 p-6 rounded-lg shadow-inner border border-[#FFB800]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-[#1C1C3A] mb-6 flex items-center">
                  <Wallet className="h-6 w-6 mr-3 text-[#FF6B6B]" />
                  Ton Budget & Quand Partir
                </h2>
                {/* Budget */}
                <div className="mb-6">
                  <Label className="block text-lg font-semibold text-[#1C1C3A] mb-3">Quel est ton budget ?</Label>
                  <RadioGroup
                    defaultValue="medium"
                    onValueChange={setSelectedBudget}
                    value={selectedBudget}
                    name="budget"
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="low"
                        id="budget-low"
                        className="border-[#00CFC1] data-[state=checked]:bg-[#FFB800] data-[state=checked]:border-[#FFB800] h-5 w-5"
                      />
                      <Label htmlFor="budget-low" className="text-base font-medium text-gray-700">
                        Économique (€)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="medium"
                        id="budget-medium"
                        className="border-[#00CFC1] data-[state=checked]:bg-[#FFB800] data-[state=checked]:border-[#FFB800] h-5 w-5"
                      />
                      <Label htmlFor="budget-medium" className="text-base font-medium text-gray-700">
                        Standard (€€)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="high"
                        id="budget-high"
                        className="border-[#00CFC1] data-[state=checked]:bg-[#FFB800] data-[state=checked]:border-[#FFB800] h-5 w-5"
                      />
                      <Label htmlFor="budget-high" className="text-base font-medium text-gray-700">
                        Premium (€€€)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="departureDate"
                      className="block text-lg font-semibold text-[#1C1C3A] mb-3 flex items-center"
                    >
                      <CalendarDays className="h-5 w-5 mr-2 text-[#00CFC1]" />
                      Date de départ
                    </Label>
                    <Input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="border-[#00CFC1]/30 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/50 rounded-lg h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="returnDate"
                      className="block text-lg font-semibold text-[#1C1C3A] mb-3 flex items-center"
                    >
                      <CalendarDays className="h-5 w-5 mr-2 text-[#FF6B6B]" />
                      Date de retour (optionnel)
                    </Label>
                    <Input
                      type="date"
                      id="returnDate"
                      name="returnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="border-[#00CFC1]/30 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/50 rounded-lg h-12 text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Transport & Logement */}
            {currentStep === 4 && (
              <div className="bg-gradient-to-br from-[#FDFBF6] to-[#00CFC1]/5 p-6 rounded-lg shadow-inner border border-[#00CFC1]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-[#1C1C3A] mb-6 flex items-center">
                  <Plane className="h-6 w-6 mr-3 text-[#FFB800]" />
                  Comment tu bouges & où tu dors
                </h2>
                {/* Modes de Transport */}
                <div className="mb-6">
                  <Label className="block text-lg font-semibold text-[#1C1C3A] mb-3">
                    Comment préfères-tu voyager ?
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {travelModes.map((mode) => (
                      <Button
                        key={mode.value}
                        type="button"
                        onClick={() => handleTravelModeChange(mode.value)}
                        className={`w-full justify-start px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium flex items-center ${
                          selectedTravelModes.includes(mode.value)
                            ? "bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white shadow-md scale-105"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        <Checkbox
                          id={`travel-${mode.value}`}
                          name="travelModes"
                          value={mode.value}
                          checked={selectedTravelModes.includes(mode.value)}
                          className="mr-2 hidden" // Cache la checkbox par défaut
                        />
                        <mode.icon className="h-4 w-4 mr-2" /> {mode.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Type de Logement */}
                <div>
                  <Label className="block text-lg font-semibold text-[#1C1C3A] mb-3">Où préfères-tu te reposer ?</Label>
                  <RadioGroup
                    defaultValue="hotel"
                    onValueChange={setSelectedAccommodation}
                    value={selectedAccommodation}
                    name="accommodationType"
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="hotel"
                        id="accommodation-hotel"
                        className="border-[#00CFC1] data-[state=checked]:bg-[#FFB800] data-[state=checked]:border-[#FFB800] h-5 w-5"
                      />
                      <Label
                        htmlFor="accommodation-hotel"
                        className="text-base font-medium text-gray-700 flex items-center"
                      >
                        <Hotel className="h-5 w-5 mr-2" /> Hôtel
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="camping"
                        id="accommodation-camping"
                        className="border-[#00CFC1] data-[state=checked]:bg-[#FFB800] data-[state=checked]:border-[#FFB800] h-5 w-5"
                      />
                      <Label
                        htmlFor="accommodation-camping"
                        className="text-base font-medium text-gray-700 flex items-center"
                      >
                        <Tent className="h-5 w-5 mr-2" /> Camping
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handlePreviousStep}
                  variant="outline"
                  className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 px-6 py-3 rounded-lg text-lg flex items-center"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Précédent
                </Button>
              )}
              {currentStep < totalSteps && (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-auto bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white font-bold px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center rounded-lg"
                >
                  Suivant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              {currentStep === totalSteps && (
                <Link href="/recommendations" className="w-full">
                  <Button
                    type="button"
                    className="w-full bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white font-bold py-4 text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center rounded-lg"
                  >
                    <Sparkles className="mr-3 h-6 w-6" />
                    Générer mon Offre Personnalisée
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
          {/* Suppression de l'affichage des messages de succès/erreur */}
          {/* {state?.message && (
            <div
              className={`flex items-center p-4 rounded-lg mt-6 text-base ${
                state.success
                  ? "bg-green-100 border border-green-300 text-green-800"
                  : "bg-red-100 border border-red-300 text-red-800"
              }`}
            >
              {state.success ? (
                <CheckCircle className="h-6 w-6 mr-3 text-green-500" />
              ) : (
                <AlertCircle className="h-6 w-6 mr-3 text-red-500" />
              )}
              <p>{state.message}</p>
            </div>
          )} */}
        </CardContent>
        <CardFooter className="text-center p-4 text-sm text-gray-500 bg-gray-50 rounded-b-xl">
          <p>&copy; 2024 GrooveNomad. Tous droits réservés.</p>
        </CardFooter>
      </Card>
    </div>
     {/* Footer */}
          <Footer />
          </>
  )
}
