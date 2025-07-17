"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Sparkles, Gift, Zap, Send, CheckCircle, AlertCircle } from "lucide-react"
import { subscribeToNewsletter } from "@/lib/actions/newsletter"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import Image from "next/image"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const { language } = useLanguage()
  const t = useTranslation(language)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const response = await subscribeToNewsletter(formData)
      setResult(response)
      if (response.success) {
        setEmail("")
      }
    })
  }

  const benefits = [
    {
      icon: Sparkles,
      title: "Événements Exclusifs",
      description: "Accès prioritaire aux soirées VIP",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&h=200&fit=crop&crop=center",
    },
    {
      icon: Gift,
      title: "Offres Spéciales",
      description: "Réductions jusqu'à -50% sur tes aventures",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=300&h=200&fit=crop&crop=center",
    },
    {
      icon: Zap,
      title: "Recommandations IA",
      description: "Suggestions personnalisées chaque semaine",
      image: "https://cdn.futura-sciences.com/sources/images/2-intelligence%20artificielle.jpeg",
    },
  ]

  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#1C1C3A]/95 via-[#00CFC1]/10 to-[#FFB800]/10 backdrop-blur-md relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1571266028243-d220c9c3b31f?w=1920&h=1080&fit=crop&crop=center"
          width={1920}
          height={1080}
          alt="Club background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#FFB800]/20 to-[#FF6B6B]/20 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-[#00CFC1]/20 to-[#FFB800]/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white border-0 px-6 py-3 shadow-2xl mb-6">
              <Mail className="w-4 h-4 mr-2" />
              Newsletter Exclusive
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Rejoins la Communauté
              <span className="bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] bg-clip-text text-transparent">
                {" "}
                GrooveNomad
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Sois le premier informé des événements exclusifs, des offres spéciales et des nouvelles destinations
              clubbing. Notre IA te recommandera les meilleures aventures selon tes goûts !
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-transparent border-2 border-[#00CFC1]/30 backdrop-blur-md hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={benefit.image || "/placeholder.svg"}
                    width={300}
                    height={200}
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C3A]/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] rounded-full flex items-center justify-center shadow-xl">
                      <benefit.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Form */}
          <Card className="bg-gradient-to-br from-[#FDFBF6]/95 to-[#00CFC1]/5 border-2 border-[#00CFC1]/40 shadow-2xl backdrop-blur-md">
            <CardContent className="p-8">
              <form action={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton-email@exemple.com"
                      required
                      disabled={isPending}
                      className="h-14 text-lg border-2 border-[#00CFC1]/30 focus:border-[#FFB800] bg-white/90 backdrop-blur-sm shadow-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending || !email}
                    className="h-14 px-8 bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Inscription...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        S'inscrire Maintenant
                      </>
                    )}
                  </Button>
                </div>

                {/* Result Message */}
                {result && (
                  <div
                    className={`flex items-center p-4 rounded-lg ${
                      result.success
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    )}
                    <p className="font-medium">{result.message}</p>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-600 flex items-center justify-center">
                    <span className="mr-2">🔒</span>
                    Tes données sont protégées. Pas de spam, que du contenu de qualité !
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="mt-12 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2 text-white">
                <div className="w-2 h-2 bg-[#FFB800] rounded-full animate-pulse"></div>
                <span className="text-sm">+12,847 clubbers inscrits</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <div
                  className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-sm">Nouveau contenu chaque semaine</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <div className="w-2 h-2 bg-[#00CFC1] rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                <span className="text-sm">Désabonnement en 1 clic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
