"use client"


import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, MapPin, Cpu, Sparkles, Users, Star, ArrowRight, Headphones, Plane, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PhoneIcon as Whatsapp } from "lucide-react" // Importez l'icône Whatsapp

import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { DebugChatbot } from "@/components/debug-chatbot"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "./footer"
import { Header } from "./header"
import { Button } from "./ui/button"

export function ClientPageWrapper() {
  const { language } = useLanguage()
  const t = useTranslation(language)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1C1C3A] via-[#1C1C3A]/95 to-[#00CFC1]/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FFB800]/10 to-[#FF6B6B]/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#00CFC1]/10 to-[#FFB800]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FF6B6B]/5 to-[#00CFC1]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

   <Header/>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800]/5 via-transparent to-[#00CFC1]/5" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Badge className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white border-0 px-6 py-3 shadow-2xl backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.aiRecommendations}
              </Badge>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl">
                  {t.heroTitle}
                  <span className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] bg-clip-text text-transparent animate-pulse">
                    {" "}
                    {t.heroTitleHighlight}{" "}
                  </span>
                  {t.heroTitleEnd}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg">
                  {t.heroSubtitle}
                </p>
              </div>
             <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/register" passHref>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  >
                    {t.startAdventure}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#00CFC1] text-[#00CFC1] hover:bg-[#00CFC1]/10 px-8 py-4 text-lg bg-transparent backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  {t.watchDemo}
                </Button> */}
              </div>
            </div>
          </div>
        </section>

       {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#1C1C3A]/90 to-[#1C1C3A]/70 backdrop-blur-md"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4 drop-shadow-xl">
                {t.aiVibesTitle}
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">{t.aiVibesSubtitle}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-transparent border-2 border-[#00CFC1]/30 backdrop-blur-md overflow-hidden group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Plane className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t.epicTravels}</h3>
                  <p className="text-gray-300 leading-relaxed">{t.epicTravelsDesc}</p>
                </CardContent>
              </Card>
              <Card className="bg-transparent border-2 border-[#00CFC1]/30 backdrop-blur-md overflow-hidden group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FFB800] via-[#00CFC1] to-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Headphones className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t.immersiveMusic}</h3>
                  <p className="text-gray-300 leading-relaxed">{t.immersiveMusicDesc}</p>
                </CardContent>
              </Card>
              <Card className="bg-transparent border-2 border-[#00CFC1]/30 backdrop-blur-md overflow-hidden group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00CFC1] via-[#FFB800] to-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Smartphone className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t.avantGardeTech}</h3>
                  <p className="text-gray-300 leading-relaxed">{t.avantGardeTechDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white backdrop-blur-md">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-[#00CFC1] via-[#FFB800] to-[#FF6B6B] text-white border-0 shadow-xl">
                  <Cpu className="w-4 h-4 mr-2" />
                  Intelligence Artificielle
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#1C1C3A] drop-shadow-lg">
                  {t.aiTitle}
                </h2>
                <p className="text-[#1C1C3A]/80 text-lg leading-relaxed">{t.aiDescription}</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-[#FFB800]/10 to-[#FF6B6B]/10 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FFB800] to-[#FF6B6B] rounded-full flex items-center justify-center shadow-lg">
                      <Music className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[#1C1C3A] font-medium">{t.spotifyAnalysis}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-[#FFB800]/10 to-[#00CFC1]/10 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FFB800] to-[#00CFC1] rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[#1C1C3A] font-medium">{t.smartGeolocation}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-[#00CFC1]/10 to-[#FF6B6B]/10 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00CFC1] to-[#FF6B6B] rounded-full flex items-center justify-center shadow-lg">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[#1C1C3A] font-medium">{t.clubberMatching}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800]/20 via-[#FF6B6B]/20 to-[#00CFC1]/20 rounded-2xl blur-3xl"></div>
                <Image
                  src="https://cdn.futura-sciences.com/sources/images/2-intelligence%20artificielle.jpeg"
                  width={600}
                  height={400}
                  alt="IA Recommendations Dashboard - DJ mixing with AI technology"
                  className="relative rounded-2xl border-2 border-[#00CFC1]/30 shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

 {/* Experiences Section */}
        <section
          id="experiences"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#1C1C3A]/95 via-[#1C1C3A]/90 to-[#00CFC1]/10 backdrop-blur-md"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4 drop-shadow-xl">
                {t.exclusiveExperiences}
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">{t.exclusiveExperiencesDesc}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Festival VIP Ibiza",
                  description: "Accès backstage + villa privée",
                  price: "€2,499",
                  image:
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
                  badge: t.popular,
                  gradient: "from-[#FFB800] to-[#FF6B6B]",
                },
                {
                  title: "Rave Souterrain Berlin",
                  description: "Expérience techno authentique",
                  price: "€899",
                  image:
"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/47/7a/f2.jpg",                  badge: t.exclusive,
                  gradient: "from-[#FF6B6B] to-[#00CFC1]",
                },
                {
                  title: "Hologram Party Tokyo",
                  description: "Technologie de pointe + culture japonaise",
                  price: "€1,799",
                  image:
                    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop&crop=center",
                  badge: t.new,
                  gradient: "from-[#00CFC1] to-[#FFB800]",
                },
              ].map((experience, index) => (
                <Card
  key={index}
  className="bg-transparent border-2 border-[#00CFC1]/30 backdrop-blur-md overflow-hidden group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
>

                  <div className="relative overflow-hidden">
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      width={400}
                      height={300}
                      alt={experience.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge
                      className={`absolute top-3 left-3 bg-gradient-to-r ${experience.gradient} text-white border-0 shadow-lg`}
                    >
                      {experience.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{experience.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{experience.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB800] to-[#00CFC1] bg-clip-text text-transparent">
                        {experience.price}
                      </span>
                      <Button
                        className={`bg-gradient-to-r ${experience.gradient} hover:shadow-xl text-white transition-all duration-300 hover:scale-105`}
                      >
                        {t.book}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#1C1C3A] mb-4 drop-shadow-lg">
                Ils Ont Vécu l'
                <span className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] bg-clip-text text-transparent">
                  Expérience
                </span>
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Sarah M.",
                  age: "24 ans",
                  text: "L'IA a trouvé exactement le type de soirée que j'adore ! Ibiza était magique 🔥",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
               },
                {
                  name: "Alex K.",
                  age: "27 ans",
                  text: "Berlin underground était dingue ! J'ai rencontré des gens incroyables grâce à l'app",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                },
                {
                  name: "Emma L.",
                  age: "22 ans",
                  text: "Tokyo hologram party = expérience de fou ! Merci GrooveNomad pour cette découverte",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-[#00CFC1]/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#FFB800] text-[#FFB800]" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic leading-relaxed font-medium">"{testimonial.text}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-[#00CFC1]/20">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          width={40}
                          height={40}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[#1C1C3A] font-semibold">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.age}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* Debug Chatbot*/}
       <Link
    href="/demo-ai" 
    target="_blank"
    rel="noopener noreferrer"
  >
      <DebugChatbot /> 
      </Link>

        {/* WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-50">
  <Link
    href="https://wa.me/+33759601094" // Remplace ici par ton numéro
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-[#369b5e] via-[#50f205] shadow-2xl animate-pulse relative">

      <Whatsapp className="h-8 w-8 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
    </Button>
  </Link>
</div>

      {/* Footer */}
     <Footer/>
    </div>
  )
}
