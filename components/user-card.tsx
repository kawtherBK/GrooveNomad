import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserCardProps {
  avatarSrc: string
  name: string
  description: string
  interests: string[]
  affinity: number
}

export function UserCard({ avatarSrc, name, description, interests, affinity }: UserCardProps) {
  return (
    <Card className="bg-white/5 border border-[#FF6B6B]/20 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 flex items-center space-x-4">
        <Avatar className="w-16 h-16 flex-shrink-0">
          <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-sm text-gray-300 mb-2">{description}</p>
          <div className="flex flex-wrap gap-1">
            {interests.map((interest, index) => (
              <Badge
                key={index}
                className="bg-[#1C1C3A]/50 text-gray-300 border border-[#1C1C3A]/70 text-xs px-2 py-0.5 rounded-full"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB800] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {affinity}% affinité
        </Badge>
      </CardContent>
    </Card>
  )
}
