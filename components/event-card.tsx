import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

interface EventCardProps {
  imageSrc: string
  title: string
  description: string
  date: string
  location: string
  compatibility: number
}

export function EventCard({ imageSrc, title, description, date, location, compatibility }: EventCardProps) {
  return (
    <Card className="bg-white/5 border border-[#00CFC1]/20 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} fill style={{ objectFit: "cover" }} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-300 mb-2">{description}</p>
          <div className="flex items-center text-xs text-gray-400 mb-1">
            <CalendarDays className="h-3 w-3 mr-1 text-[#FFB800]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <MapPin className="h-3 w-3 mr-1 text-[#FF6B6B]" />
            <span>{location}</span>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-[#FFB800] to-[#00CFC1] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {compatibility}% Compatibilité
        </Badge>
      </CardContent>
    </Card>
  )
}
