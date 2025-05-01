import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarField } from "@/components/star-field"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>
        <div className="container relative z-10 flex flex-col h-full pt-20 md:pt-32">
          <div className="flex flex-col max-w-2xl">
            <Badge className="w-fit mb-4 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">
              #1 TRUSTED CHEAT PROVIDER
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Experience Gaming to the fullest with <span className="text-[#6074f4]">SkyFall</span>
            </h1>
            <p className="text-zinc-400 mb-8 text-lg">
              Trusted, Reliable products. Stay ahead of the competition with our undetectable software.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#6074f4] hover:bg-[#4a5fd0] text-white">
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
              >
                <Link href="/status">SkyFall Products</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block">
          <Image
            src="/hero-character.png"
            alt="Gaming Character"
            fill
            className="object-contain object-right-bottom"
            priority
          />
        </div>
      </section>

      {/* Instant Delivery Banner */}
      <section className="w-full py-6 bg-zinc-900/80 backdrop-blur-sm border-y border-zinc-800">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#6074f4]/20 flex items-center justify-center">
              <Image src="/logo.png" alt="SkyFall Logo" width={24} height={24} className="rounded-full" />
            </div>
            <div>
              <h3 className="font-medium text-white">Instant Delivery With Credit Card & Crypto!</h3>
              <p className="text-sm text-zinc-400">For PayPal, Venmo, or Zelle follow the steps at checkout.</p>
            </div>
          </div>
          <Button asChild className="bg-[#6074f4] hover:bg-[#4a5fd0] text-white">
            <Link href="https://discord.gg/skyfall">Join Discord</Link>
          </Button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <Link href="/products" className="text-[#6074f4] hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/products/warzone" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 group-hover:border-[#6074f4]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6074f4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6074f4]/10 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <Image src="/product-1.png" alt="Warzone Cheat" fill className="object-cover z-10" />
              </div>
            </Link>
            <Link href="/products/valorant" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 group-hover:border-[#6074f4]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6074f4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6074f4]/10 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <Image src="/product-2.png" alt="Valorant Cheat" fill className="object-cover z-10" />
              </div>
            </Link>
            <Link href="/products/apex" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 group-hover:border-[#6074f4]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6074f4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6074f4]/10 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <Image src="/product-3.png" alt="Apex Legends Cheat" fill className="object-cover z-10" />
              </div>
            </Link>
            <Link href="/products/fortnite" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 group-hover:border-[#6074f4]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6074f4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6074f4]/10 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <Image src="/product-4.png" alt="Fortnite Cheat" fill className="object-cover z-10" />
              </div>
            </Link>
            <Link href="/products/spoofer" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 group-hover:border-[#6074f4]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6074f4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6074f4]/10 to-transparent transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <Image src="/product-5.png" alt="HWID Spoofer" fill className="object-cover z-10" />
              </div>
            </Link>
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
