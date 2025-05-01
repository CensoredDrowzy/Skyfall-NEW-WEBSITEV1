"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, ShoppingCart, Settings, LogOut, Shield, Bell } from "lucide-react"
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
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    if (pathname?.includes("/dashboard") || pathname?.includes("/settings") || pathname?.includes("/purchases")) {
      router.push("/")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      {/* Top Navigation Bar */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6074f4] to-[#8a94f8] rounded-full opacity-20 animate-pulse"></div>
                  <Image
                    src="/logo.png"
                    alt="SkyFall Logo"
                    width={40}
                    height={40}
                    className="rounded-full relative z-10"
                  />
                </div>
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

            <div className="flex items-center gap-4">
              <a
                href="https://discord.com/invite/skyfallproducts"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#5865F2]/20 text-[#5865F2] rounded-md hover:bg-[#5865F2]/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 9a4 4 0 0 0-4.5-3.8A5 5 0 0 0 8.5 9.8a5 5 0 0 0 .5 7.3A4.3 4.3 0 0 0 13 18a4 4 0 0 0 3.5-2" />
                  <path d="M13.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path d="M17 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path d="M9 14.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                  <path d="M6 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                </svg>
                Join Discord
              </a>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard" className="hidden md:flex items-center gap-1 text-zinc-400 hover:text-white">
                    <Bell className="h-5 w-5" />
                  </Link>
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
                        <Link href="/dashboard" className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M9 9h.01" />
                            <path d="M15 9h.01" />
                            <path d="M9 15h.01" />
                            <path d="M15 15h.01" />
                          </svg>
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/purchases" className="flex items-center">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Purchases
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                      <circle cx="16.5" cy="7.5" r=".5" />
                    </svg>
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
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center justify-between">
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink
                href="/"
                label="Home"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                }
              />
              <NavLink
                href="/products"
                label="Store"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                }
              />
              <NavLink
                href="/status"
                label="Status"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
              />
              <NavLink
                href="/forums"
                label="Forums"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01" />
                    <path d="M12 10h.01" />
                    <path d="M16 10h.01" />
                  </svg>
                }
              />
              <NavLink
                href="/media"
                label="Media"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
                  </svg>
                }
              />
              <NavLink
                href="/vouches"
                label="Vouches"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                }
              />
              <NavLink
                href="/faq"
                label="FAQ"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                }
              />
            </nav>

            <form onSubmit={handleSearch} className="relative w-full md:w-64 ml-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-8 bg-zinc-800 border-zinc-700 text-white focus:border-[#6074f4] focus:ring-[#6074f4] h-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <nav className="mt-8 flex flex-col space-y-4">
              <MobileNavLink
                href="/"
                label="Home"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                }
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/products"
                label="Store"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                }
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/status"
                label="Status"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/forums"
                label="Forums"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01" />
                    <path d="M12 10h.01" />
                    <path d="M16 10h.01" />
                  </svg>
                }
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/media"
                label="Media"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
                  </svg>
                }
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/vouches"
                label="Vouches"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                }
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/faq"
                label="FAQ"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                }
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="https://discord.com/invite/skyfallproducts"
                label="Discord"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 9a4 4 0 0 0-4.5-3.8A5 5 0 0 0 8.5 9.8a5 5 0 0 0 .5 7.3A4.3 4.3 0 0 0 13 18a4 4 0 0 0 3.5-2" />
                    <path d="M13.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M17 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M9 14.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                    <path d="M6 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  </svg>
                }
                external
                onClick={() => setIsOpen(false)}
              />
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
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M9 9h.01" />
                        <path d="M15 9h.01" />
                        <path d="M9 15h.01" />
                        <path d="M15 15h.01" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      href="/purchases"
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Purchases
                    </Link>
                    <Link
                      href="/settings"
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="mr-2 h-5 w-5" />
                        Admin Panel
                      </Link>
                    )}
                    <Button
                      className="bg-zinc-800 hover:bg-zinc-700 text-white w-full"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                        <circle cx="16.5" cy="7.5" r=".5" />
                      </svg>
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

function NavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
        isActive ? "bg-[#6074f4]/20 text-[#6074f4]" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50",
      )}
    >
      {icon}
      {label}
    </Link>
  )
}

function MobileNavLink({
  href,
  label,
  icon,
  external = false,
  onClick,
}: {
  href: string
  label: string
  icon: React.ReactNode
  external?: boolean
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-3 text-lg font-medium",
          isActive ? "text-[#6074f4]" : "text-zinc-400 hover:text-white",
        )}
        onClick={onClick}
      >
        {icon}
        {label}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 text-lg font-medium",
        isActive ? "text-[#6074f4]" : "text-zinc-400 hover:text-white",
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  )
}
