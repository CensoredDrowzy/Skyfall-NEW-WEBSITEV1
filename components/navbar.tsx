"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ActiveUsersCounter } from "@/components/active-users-counter"
import { useAuth } from "@/lib/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const routes = [
  { name: "Home", path: "/" },
  { name: "Store", path: "/products", icon: "🛒" },
  { name: "Status", path: "/status", icon: "📊" },
  { name: "Forums", path: "/forums", icon: "💬" },
  { name: "Vouches", path: "/vouches" },
  { name: "FAQ", path: "/faq" },
  { name: "Discord", path: "https://discord.com/invite/skyfallproducts", external: true },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-zinc-800" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="SkyFall Logo" width={40} height={40} className="rounded-full" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  Sky<span className="text-[#6074f4]">Fall</span>
                </span>
              </div>
            </Link>
            <div className="ml-4 px-2 py-1 bg-zinc-800/50 backdrop-blur-sm rounded flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <ActiveUsersCounter />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {routes.map((route) =>
              route.external ? (
                <a
                  key={route.name}
                  href={route.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {route.icon && <span className="mr-1">{route.icon}</span>}
                  {route.name}
                </a>
              ) : (
                <Link
                  key={route.name}
                  href={route.path}
                  className="px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {route.icon && <span className="mr-1">{route.icon}</span>}
                  {route.name}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-8 bg-zinc-900 border-zinc-700 text-white focus:border-[#6074f4] focus:ring-[#6074f4]"
              />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                      <AvatarFallback className="bg-[#6074f4]">{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/purchases">Purchases</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:inline-flex text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Button className="hidden md:inline-flex bg-[#6074f4] hover:bg-[#4a5fd0] text-white">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}

            <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="SkyFall Logo" width={40} height={40} className="rounded-full" />
                <span className="text-xl font-bold text-white">
                  Sky<span className="text-[#6074f4]">Fall</span>
                </span>
              </Link>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="relative mt-6">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-8 bg-zinc-900 border-zinc-700 text-white"
              />
            </div>
            <nav className="mt-8 flex flex-col space-y-4">
              {routes.map((route) =>
                route.external ? (
                  <a
                    key={route.name}
                    href={route.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.icon && <span className="mr-2">{route.icon}</span>}
                    {route.name}
                  </a>
                ) : (
                  <Link
                    key={route.name}
                    href={route.path}
                    className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.icon && <span className="mr-2">{route.icon}</span>}
                    {route.name}
                  </Link>
                ),
              )}
              <div className="pt-4 mt-4 border-t border-zinc-800 flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                        <AvatarFallback className="bg-[#6074f4]">{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-zinc-400">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Button
                      className="bg-zinc-800 hover:bg-zinc-700 text-white w-full"
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Button className="bg-[#6074f4] hover:bg-[#4a5fd0] text-white w-full">
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
