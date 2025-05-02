"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  getSession,
  updateUserProfile as updateProfileAction,
  changePassword as changePasswordAction,
} from "@/app/actions/auth"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: "user" | "admin" | "moderator"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  isAdmin: boolean
  updateUserProfile: (data: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession()
        if (session) {
          setUser(session)
        }
      } catch (error) {
        console.error("Failed to get session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // Check if user is admin
  const isAdmin = Boolean(user && user.role === "admin")

  // Login function
  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true)
    try {
      const userData = await loginAction(email, password)
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const userData = await registerAction(username, email, password)
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }

  // Update user profile
  const updateUserProfile = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      if (user) {
        const updatedUser = await updateProfileAction(user.id, data)
        setUser({ ...user, ...updatedUser })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true)
    try {
      if (user) {
        await changePasswordAction(user.id, currentPassword, newPassword)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    await logoutAction()
    setUser(null)
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
