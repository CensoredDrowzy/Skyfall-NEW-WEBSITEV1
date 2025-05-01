"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("skyfall_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("skyfall_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, any email/password combination works
    const mockUser: User = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0],
      email: email,
      image: null,
    }

    setUser(mockUser)

    if (remember) {
      localStorage.setItem("skyfall_user", JSON.stringify(mockUser))
    }

    setIsLoading(false)
  }

  // Mock register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      name: username,
      email: email,
      image: null,
    }

    setUser(mockUser)
    localStorage.setItem("skyfall_user", JSON.stringify(mockUser))

    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("skyfall_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
