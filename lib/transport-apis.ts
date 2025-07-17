// Types pour les APIs de transport
export interface TransportOption {
  id: string
  provider: "rome2rio" | "trainline" | "skyscanner" | "blablacar" | "uber"
  type: "flight" | "train" | "bus" | "car" | "rideshare"
  from: string
  to: string
  departure: string
  arrival: string
  duration: number // en minutes
  price: number
  currency: string
  bookingUrl?: string
  stops?: number
  carbonFootprint?: number // kg CO2
  amenities?: string[]
  provider_logo?: string
}

export interface TransportSearchParams {
  from: string
  to: string
  departureDate: string
  returnDate?: string
  passengers: number
  preferredTypes?: ("flight" | "train" | "bus" | "car" | "rideshare")[]
}

// Service Rome2Rio
export class Rome2RioService {
  private apiKey: string
  private baseUrl = "https://free.rome2rio.com/api/1.4/json"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async searchRoutes(params: TransportSearchParams): Promise<TransportOption[]> {
    try {
      const url = `${this.baseUrl}/Search?key=${this.apiKey}&oName=${encodeURIComponent(params.from)}&dName=${encodeURIComponent(params.to)}&oPos=&dPos=&nAdult=${params.passengers}&nChild=0&nInfant=0&currency=EUR`

      const response = await fetch(url)
      const data = await response.json()

      return this.parseRome2RioResponse(data, params)
    } catch (error) {
      console.error("Rome2Rio API Error:", error)
      return []
    }
  }

  private parseRome2RioResponse(data: any, params: TransportSearchParams): TransportOption[] {
    if (!data.routes) return []

    return data.routes.map((route: any, index: number) => ({
      id: `rome2rio-${index}`,
      provider: "rome2rio" as const,
      type: this.mapVehicleType(route.segments?.[0]?.vehicle),
      from: params.from,
      to: params.to,
      departure: params.departureDate,
      arrival: this.calculateArrival(params.departureDate, route.totalDuration),
      duration: route.totalDuration || 0,
      price: route.indicativePrices?.[0]?.price || 0,
      currency: "EUR",
      stops: route.segments?.length - 1 || 0,
      carbonFootprint: route.co2 || 0,
      bookingUrl: route.segments?.[0]?.agencies?.[0]?.url,
    }))
  }

  private mapVehicleType(vehicle: string): TransportOption["type"] {
    const mapping: Record<string, TransportOption["type"]> = {
      plane: "flight",
      train: "train",
      bus: "bus",
      car: "car",
      ferry: "bus", // Approximation
    }
    return mapping[vehicle] || "bus"
  }

  private calculateArrival(departure: string, durationMinutes: number): string {
    const dep = new Date(departure)
    dep.setMinutes(dep.getMinutes() + durationMinutes)
    return dep.toISOString()
  }
}

// Service Trainline (simulation - API payante)
export class TrainlineService {
  private apiKey: string
  private baseUrl = "https://api.trainline.com/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async searchTrains(params: TransportSearchParams): Promise<TransportOption[]> {
    // Simulation de données Trainline
    return [
      {
        id: "trainline-1",
        provider: "trainline",
        type: "train",
        from: params.from,
        to: params.to,
        departure: params.departureDate,
        arrival: this.addHours(params.departureDate, 3.5),
        duration: 210, // 3h30
        price: 89.5,
        currency: "EUR",
        stops: 1,
        carbonFootprint: 12.5,
        amenities: ["WiFi", "Prise électrique", "Restauration"],
        bookingUrl: "https://trainline.com/book",
        provider_logo: "/logos/trainline.png",
      },
      {
        id: "trainline-2",
        provider: "trainline",
        type: "train",
        from: params.from,
        to: params.to,
        departure: this.addHours(params.departureDate, 2),
        arrival: this.addHours(params.departureDate, 6),
        duration: 240, // 4h
        price: 65.0,
        currency: "EUR",
        stops: 3,
        carbonFootprint: 15.2,
        amenities: ["WiFi"],
        bookingUrl: "https://trainline.com/book",
        provider_logo: "/logos/trainline.png",
      },
    ]
  }

  private addHours(dateString: string, hours: number): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + hours)
    return date.toISOString()
  }
}

// Service Skyscanner (simulation)
export class SkyscannerService {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async searchFlights(params: TransportSearchParams): Promise<TransportOption[]> {
    // Simulation de données Skyscanner
    return [
      {
        id: "skyscanner-1",
        provider: "skyscanner" as any,
        type: "flight",
        from: params.from,
        to: params.to,
        departure: params.departureDate,
        arrival: this.addHours(params.departureDate, 2.5),
        duration: 150, // 2h30
        price: 199.99,
        currency: "EUR",
        stops: 0,
        carbonFootprint: 245.8,
        amenities: ["Repas", "Divertissement"],
        bookingUrl: "https://skyscanner.com/book",
        provider_logo: "/logos/skyscanner.png",
      },
      {
        id: "skyscanner-2",
        provider: "skyscanner" as any,
        type: "flight",
        from: params.from,
        to: params.to,
        departure: this.addHours(params.departureDate, 4),
        arrival: this.addHours(params.departureDate, 7.5),
        duration: 210, // 3h30 avec escale
        price: 149.99,
        currency: "EUR",
        stops: 1,
        carbonFootprint: 198.5,
        amenities: ["Repas léger"],
        bookingUrl: "https://skyscanner.com/book",
        provider_logo: "/logos/skyscanner.png",
      },
    ]
  }

  private addHours(dateString: string, hours: number): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + hours)
    return date.toISOString()
  }
}

// Service principal de transport
export class TransportService {
  private rome2rio: Rome2RioService
  private trainline: TrainlineService
  private skyscanner: SkyscannerService

  constructor() {
    this.rome2rio = new Rome2RioService(process.env.ROME2RIO_API_KEY || "demo")
    this.trainline = new TrainlineService(process.env.TRAINLINE_API_KEY || "demo")
    this.skyscanner = new SkyscannerService(process.env.SKYSCANNER_API_KEY || "demo")
  }

  async searchAllTransports(params: TransportSearchParams): Promise<TransportOption[]> {
    const promises = []

    // Recherche sur toutes les APIs en parallèle
    if (!params.preferredTypes || params.preferredTypes.includes("flight")) {
      promises.push(this.skyscanner.searchFlights(params))
    }

    if (!params.preferredTypes || params.preferredTypes.includes("train")) {
      promises.push(this.trainline.searchTrains(params))
    }

    // Rome2Rio pour tous les types
    promises.push(this.rome2rio.searchRoutes(params))

    try {
      const results = await Promise.all(promises)
      const allOptions = results.flat()

      // Trier par prix
      return allOptions.sort((a, b) => a.price - b.price)
    } catch (error) {
      console.error("Transport search error:", error)
      return []
    }
  }

  // Recommandations intelligentes basées sur les préférences
  getSmartRecommendations(
    options: TransportOption[],
    preferences: {
      budget?: "low" | "medium" | "high"
      speed?: "slow" | "medium" | "fast"
      eco?: boolean
    },
  ): TransportOption[] {
    let filtered = [...options]

    // Filtrer par budget
    if (preferences.budget === "low") {
      filtered = filtered.filter((opt) => opt.price < 100)
    } else if (preferences.budget === "medium") {
      filtered = filtered.filter((opt) => opt.price >= 100 && opt.price < 300)
    }

    // Filtrer par vitesse
    if (preferences.speed === "fast") {
      filtered = filtered.filter((opt) => opt.duration < 180) // moins de 3h
    }

    // Filtrer par écologie
    if (preferences.eco) {
      filtered = filtered.filter((opt) => (opt.carbonFootprint || 999) < 50)
    }

    return filtered.slice(0, 5) // Top 5
  }
}
