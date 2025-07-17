import Image from "next/image"
import { Facebook, Instagram, X } from "lucide-react"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-md bg-[#1C1C3A]/80 border-b border-[#00CFC1]/20 relative z-10">
        <Link href="/" className="flex items-center">
          {/* Logo and Slogan */}
                <div className="flex flex-col items-start">
                  <div className="relative ">
                    <Image src="https://i.ibb.co/nqvqr3R5/logo-transparent-1.png" alt="Groove Nomad Logo"   width={200}
              height={200} />
                  </div>
                  {/* <p className="text-sm">Votre Voyage commence ici</p> */}
                </div>
         
        </Link>
        <nav className="flex-1 flex justify-center gap-6 items-center mx-4">
          {" "}
          {/* Centered navigation */}
          <Link
            href="/"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
          >
            Accueil
          </Link>
          <Link
            href="/recommendations"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
          >
            Recommandation AI
          </Link>
          <Link
            href="#festivals" // Placeholder link for festivals
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
          >
            Festivals
          </Link>
          <Link
            href="#experiences"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
          >
            Expériences
          </Link>
          <Link
            href="#contact" // Placeholder link for contact
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
          >
            Contact
          </Link>
        </nav>
        <div className="flex gap-3 items-center">
          {" "}
          {/* Right-aligned buttons and language selector */}
          <Link href="/register" passHref>
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#FFB800] to-[#FF6B6B] hover:from-[#e6a600] hover:to-[#e55555] text-white px-4 py-2 text-sm shadow-md"
          >
            S'inscrire
          </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            className="border-2 border-[#00CFC1] text-[#00CFC1] hover:bg-[#00CFC1]/10 px-4 py-2 text-sm bg-transparent backdrop-blur-sm"
          >
            Se connecter
          </Button>
          <LanguageSelector />
        </div>
      </header>
  )
}
