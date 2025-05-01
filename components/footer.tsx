import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-zinc-900/30 border-t border-zinc-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="SkyFall Logo" width={32} height={32} className="rounded-full" />
              <span className="text-lg font-bold">
                Sky<span className="text-[#6074f4]">Fall</span>
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white">
              Home
            </Link>
            <Link href="/products" className="text-sm text-zinc-400 hover:text-white">
              Products
            </Link>
            <Link href="/status" className="text-sm text-zinc-400 hover:text-white">
              Status
            </Link>
            <Link href="/vouches" className="text-sm text-zinc-400 hover:text-white">
              Vouches
            </Link>
            <Link href="/faq" className="text-sm text-zinc-400 hover:text-white">
              FAQ
            </Link>
            <a
              href="https://discord.gg/skyfall"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Discord
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} SkyFall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
