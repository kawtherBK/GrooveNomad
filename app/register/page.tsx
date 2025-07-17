"use client"

import { useState, useActionState } from "react" // Ajout de useActionState
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Lock, Calendar, GroupIcon as Gender, ArrowRight, CheckCircle, AlertCircle } from "lucide-react" // Ajout de CheckCircle et AlertCircle
import Link from "next/link" // Garder Link pour le bouton "Déjà un compte ?"
import { registerUser } from "@/lib/actions/auth" // Import de l'action serveur
import { useRouter } from "next/navigation"
import React from "react"

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null)
  const [gender, setGender] = useState<string>("")
  const router = useRouter() // Ajout du hook


    if (state?.success) {
      router.push("/customize-offer")
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C1C3A] via-[#1C1C3A]/95 to-[#00CFC1]/20 p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-2 border-[#00CFC1]/30 shadow-2xl">
        <CardHeader className="text-center p-6 bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] text-white rounded-t-lg">
          <h1 className="text-3xl font-bold drop-shadow-lg">Rejoins GrooveNomad</h1>
          <p className="text-sm opacity-90">Crée ton compte pour commencer l'aventure !</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form action={formAction} className="space-y-5">
            {" "}
            {/* Utilisation de formAction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <div className="relative mt-1">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Ton prénom"
                    required
                    className="pl-10 border-[#00CFC1]/30 focus:border-[#FFB800]"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {state?.errors?.firstName && <p className="text-red-500 text-xs mt-1">{state.errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <div className="relative mt-1">
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Ton nom"
                    required
                    className="pl-10 border-[#00CFC1]/30 focus:border-[#FFB800]"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {state?.errors?.lastName && <p className="text-red-500 text-xs mt-1">{state.errors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ton-email@exemple.com"
                  required
                  className="pl-10 border-[#00CFC1]/30 focus:border-[#FFB800]"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {state?.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 8 caractères"
                  required
                  className="pl-10 border-[#00CFC1]/30 focus:border-[#FFB800]"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {state?.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Âge</Label>
                <div className="relative mt-1">
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="18+"
                    min="18"
                    max="99"
                    required
                    className="pl-10 border-[#00CFC1]/30 focus:border-[#FFB800]"
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {state?.errors?.age && <p className="text-red-500 text-xs mt-1">{state.errors.age}</p>}
              </div>
              <div>
                <Label htmlFor="gender">Sexe</Label>
                <div className="relative mt-1">
                  <Select onValueChange={setGender} value={gender} name="gender">
                    <SelectTrigger className="w-full pl-10 border-[#00CFC1]/30 focus:border-[#FFB800]">
                      <Gender className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#00CFC1]/30">
                      <SelectItem value="male">Homme</SelectItem>
                      <SelectItem value="female">Femme</SelectItem>
                      <SelectItem value="non-binary">Non-binaire</SelectItem>
                      <SelectItem value="prefer-not-to-say">Préfère ne pas dire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {state?.errors?.gender && <p className="text-red-500 text-xs mt-1">{state.errors.gender}</p>}
              </div>
            </div>
            <Button
              type="submit" // Changer en type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-[#FFB800] via-[#FF6B6B] to-[#00CFC1] hover:from-[#e6a600] hover:via-[#e55555] hover:to-[#00b8a9] text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Inscription...
                </>
              ) : (
                <>
                  S'inscrire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Affichage des messages de succès/erreur */}
          {state?.message && (
            <div
              className={`flex items-center p-3 rounded-lg mt-4 ${
                state.success
                  ? "bg-green-100 border border-green-300 text-green-800"
                  : "bg-red-100 border border-red-300 text-red-800"
              }`}
            >
              {state.success ? (
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              )}
              <p className="text-sm">{state.message}</p>
            </div>
          )}

          <p className="text-center text-sm text-gray-600 mt-4">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-[#00CFC1] hover:underline font-medium">
              Connecte-toi ici
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
