import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Placeholder reseller data
const resellers = [
  {
    name: "GameEdge",
    description: "Official reseller for North America",
    website: "https://gameedge.example.com",
    discord: "https://discord.gg/gameedge",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "CheatMasters",
    description: "Official reseller for Europe",
    website: "https://cheatmasters.example.com",
    discord: "https://discord.gg/cheatmasters",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "EliteHax",
    description: "Official reseller for Asia",
    website: "https://elitehax.example.com",
    discord: "https://discord.gg/elitehax",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "ProGamers",
    description: "Official reseller for Australia",
    website: "https://progamers.example.com",
    discord: "https://discord.gg/progamers",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ResellersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-16 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Official Resellers
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Purchase our products from these trusted partners around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Resellers Grid */}
      <section className="w-full py-12 md:py-24 bg-zinc-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resellers.map((reseller) => (
              <Card key={reseller.name} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={reseller.image || "/placeholder.svg"}
                      alt={reseller.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <CardTitle>{reseller.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">{reseller.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <a href={reseller.website} target="_blank" rel="noopener noreferrer">
                        Website <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild className="flex-1 bg-[#6074f4] hover:bg-[#4a5fd0]">
                      <a href={reseller.discord} target="_blank" rel="noopener noreferrer">
                        Discord <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Reseller */}
      <section className="w-full py-12 md:py-16 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-white">Become a Reseller</h2>
            <p className="mx-auto max-w-[600px] text-zinc-400">
              Interested in becoming an official SkyFall reseller? Contact us to learn about our reseller program.
            </p>
            <Button asChild className="bg-[#6074f4] hover:bg-[#4a5fd0] mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Apply Now <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
