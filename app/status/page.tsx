import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import { StarField } from "@/components/star-field"

// Placeholder status data
const products = [
  {
    name: "Warzone Cheat",
    status: "Undetected",
    lastUpdated: "2 hours ago",
    game: "Call of Duty: Warzone",
  },
  {
    name: "Warzone ESP",
    status: "Undetected",
    lastUpdated: "2 hours ago",
    game: "Call of Duty: Warzone",
  },
  {
    name: "Warzone Radar",
    status: "Undetected",
    lastUpdated: "2 hours ago",
    game: "Call of Duty: Warzone",
  },
  {
    name: "Valorant Aimbot",
    status: "Updating",
    lastUpdated: "1 day ago",
    game: "Valorant",
  },
  {
    name: "Valorant ESP",
    status: "Undetected",
    lastUpdated: "6 hours ago",
    game: "Valorant",
  },
  {
    name: "Apex Aimbot",
    status: "Undetected",
    lastUpdated: "3 hours ago",
    game: "Apex Legends",
  },
  {
    name: "Apex ESP",
    status: "Undetected",
    lastUpdated: "3 hours ago",
    game: "Apex Legends",
  },
  {
    name: "Fortnite Aimbot",
    status: "Detected",
    lastUpdated: "2 days ago",
    game: "Fortnite",
  },
]

// Group products by game
const gameGroups = products.reduce(
  (acc, product) => {
    if (!acc[product.game]) {
      acc[product.game] = []
    }
    acc[product.game].push(product)
    return acc
  },
  {} as Record<string, typeof products>,
)

export default function StatusPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Product Status</h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Check the current status of all our products across different games.
            </p>
          </div>
        </div>
      </section>

      {/* Status Grid */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <div className="grid gap-8">
            {Object.entries(gameGroups).map(([game, products]) => (
              <div key={game} className="border border-zinc-800 rounded-lg overflow-hidden">
                <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800">
                  <h2 className="text-xl font-bold text-white">{game}</h2>
                </div>
                <div className="p-6 bg-black">
                  <div className="grid gap-4">
                    {products.map((product, index) => (
                      <div
                        key={`${product.name}-${index}`}
                        className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg bg-zinc-900/50"
                      >
                        <div className="flex items-center space-x-4">
                          {product.status === "Undetected" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : product.status === "Detected" ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          )}
                          <div>
                            <p className="font-medium text-white">{product.name}</p>
                            <p className="text-sm text-zinc-500">Last updated: {product.lastUpdated}</p>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              product.status === "Undetected"
                                ? "bg-green-500/20 text-green-400"
                                : product.status === "Detected"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
