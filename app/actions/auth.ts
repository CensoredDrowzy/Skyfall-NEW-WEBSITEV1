"use server"

import { cookies } from "next/headers"
import { executeQuery } from "@/lib/db"
import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || "skyfall-secret-key"
const TOKEN_EXPIRY = "7d"

export async function login(email: string, password: string) {
  try {
    // Find user by email
    const users = await executeQuery(
      "SELECT id, name, email, password_hash, role, image_url FROM users WHERE email = $1",
      [email],
    )

    if (!users || users.length === 0) {
      throw new Error("Invalid email or password")
    }

    const user = users[0]

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw new Error("Invalid email or password")
    }

    // Create JWT token
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image_url,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(new TextEncoder().encode(JWT_SECRET))

    // Set cookie
    cookies().set({
      name: "skyfall_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image_url,
    }
  } catch (error) {
    console.error("Login error:", error)
    throw new Error("Authentication failed")
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUsers = await executeQuery("SELECT id FROM users WHERE email = $1", [email])

    if (existingUsers && existingUsers.length > 0) {
      throw new Error("User with this email already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const result = await executeQuery(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, image_url",
      [name, email, hashedPassword, "user"],
    )

    const newUser = result[0]

    // Create JWT token
    const token = await new SignJWT({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      image: newUser.image_url,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(new TextEncoder().encode(JWT_SECRET))

    // Set cookie
    cookies().set({
      name: "skyfall_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      image: newUser.image_url,
    }
  } catch (error) {
    console.error("Registration error:", error)
    throw new Error("Registration failed")
  }
}

export async function logout() {
  cookies().delete("skyfall_token")
}

export async function getSession() {
  try {
    const token = cookies().get("skyfall_token")?.value

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))

    const decoded = payload as {
      id: string
      email: string
      name: string
      role: string
      image: string
    }

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      image: decoded.image,
    }
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}

export async function updateUserProfile(userId: string, data: { name?: string; email?: string }) {
  try {
    const { name, email } = data

    if (email) {
      // Check if email is already taken by another user
      const existingUsers = await executeQuery("SELECT id FROM users WHERE email = $1 AND id != $2", [email, userId])

      if (existingUsers && existingUsers.length > 0) {
        throw new Error("Email is already taken")
      }
    }

    // Update user profile
    const updateFields = []
    const updateValues = []
    let paramCounter = 1

    if (name) {
      updateFields.push(`name = $${paramCounter}`)
      updateValues.push(name)
      paramCounter++
    }

    if (email) {
      updateFields.push(`email = $${paramCounter}`)
      updateValues.push(email)
      paramCounter++
    }

    updateFields.push(`updated_at = NOW()`)

    if (updateFields.length === 1) {
      // Only updated_at is being updated, nothing to do
      return
    }

    updateValues.push(userId)

    const query = `
      UPDATE users 
      SET ${updateFields.join(", ")} 
      WHERE id = $${paramCounter}
      RETURNING id, name, email, role, image_url
    `

    const result = await executeQuery(query, updateValues)
    return result[0]
  } catch (error) {
    console.error("Update profile error:", error)
    throw new Error("Failed to update profile")
  }
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  try {
    // Get current user
    const users = await executeQuery("SELECT password_hash FROM users WHERE id = $1", [userId])

    if (!users || users.length === 0) {
      throw new Error("User not found")
    }

    const user = users[0]

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash)
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect")
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await executeQuery("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2", [
      hashedPassword,
      userId,
    ])

    return true
  } catch (error) {
    console.error("Change password error:", error)
    throw new Error("Failed to change password")
  }
}
