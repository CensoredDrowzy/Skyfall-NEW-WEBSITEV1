"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
  updateUserProfile: (data: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin emails for demo purposes
const ADMIN_EMAILS = ["admin@skyfall.com", "admin@example.com"]

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

  // Check if user is admin
  const isAdmin = Boolean(user && ADMIN_EMAILS.includes(user.email))

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
      role: ADMIN_EMAILS.includes(email) ? "admin" : "user",
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
      role: ADMIN_EMAILS.includes(email) ? "admin" : "user",
    }

    setUser(mockUser)
    localStorage.setItem("skyfall_user", JSON.stringify(mockUser))

    setIsLoading(false)
  }

  // Update user profile
  const updateUserProfile = async (data: Partial<User>) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("skyfall_user", JSON.stringify(updatedUser))
    }

    setIsLoading(false)
  }

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, we would validate the current password and update it
    // For demo purposes, we'll just simulate success

    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("skyfall_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        isAdmin,
        updateUserProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
