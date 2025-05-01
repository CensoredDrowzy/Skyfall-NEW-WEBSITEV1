import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StarField } from "@/components/star-field"

// Placeholder product data
const products = [
  {
    id: "warzone",
    name: "Warzone Cheat",
    price: "$19.99",
    status: "Undetected",
    image: "/product-1.png",
  },
  {
    id: "valorant",
    name: "Valorant Cheat",
    price: "$24.99",
    status: "Undetected",
    image: "/product-2.png",
  },
  {
    id: "apex",
    name: "Apex Legends Cheat",
    price: "$19.99",
    status: "Undetected",
    image: "/product-3.png",
  },
  {
    id: "fortnite",
    name: "Fortnite Cheat",
    price: "$19.99",
    status: "Undetected",
    image: "/product-4.png",
  },
  {
    id: "spoofer",
    name: "HWID Spoofer",
    price: "$29.99",
    status: "Undetected",
    image: "/product-5.png",
  },
  {
    id: "rust",
    name: "Rust Cheat",
    price: "$24.99",
    status: "Undetected",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "csgo",
    name: "CS:GO Cheat",
    price: "$19.99",
    status: "Undetected",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "pubg",
    name: "PUBG Cheat",
    price: "$19.99",
    status: "Undetected",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function ProductsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Our Products</h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Browse our selection of premium software solutions designed to enhance your gaming experience.
            </p>
            <div className="relative w-full max-w-md mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-zinc-900/70 backdrop-blur-sm border-zinc-700 text-white w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 group-hover:border-[#6074f4]/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6074f4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6074f4]/10 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover z-10"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-medium text-white">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#6074f4] font-bold">{product.price}</span>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">{product.status}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Filter */}
      <section className="w-full py-6 bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-800">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <Button variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
              ALL PRODUCTS
            </Button>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "M", "P", "R", "S", "T", "U", "V", "W"].map(
              (letter) => (
                <Button
                  key={letter}
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:bg-zinc-800 hover:text-white min-w-8 px-2"
                >
                  {letter}
                </Button>
              ),
            )}
            <div className="ml-auto flex items-center gap-2">
              <div className="bg-zinc-800 px-3 py-1 rounded-md flex items-center">
                <span className="text-[#6074f4] text-sm font-medium mr-1">56</span>
                <span className="text-zinc-400 text-xs">GAMES</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
