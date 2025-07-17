import Image from "next/image"
import { Facebook, Instagram, X } from "lucide-react"

export function Footer() {
  return (
<footer className="bg-[#3F3E56] text-gray-200 py-10 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Slogan */}
        <div className="flex flex-col items-start">
          <div className="">
            <Image src="https://i.ibb.co/nqvqr3R5/logo-transparent-1.png" alt="Groove Nomad Logo"   width={400}
      height={400} />
          </div>
       
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-white mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                Accueil
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                Destinations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                Événements
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                À Propos
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                Politique de Confidentialité
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFB800] transition-colors">
                Conditions Générales
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-bold text-white mb-4">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-[#FFB800] transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-[#FFB800] transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-[#FFB800] transition-colors">
              <X className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-10">
        <p>&copy; 2024 Groove Nomad. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
