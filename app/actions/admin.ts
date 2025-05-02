"use server"

import { executeQuery } from "@/lib/db"
import { getSession } from "./auth"

// Helper function to check if user is admin
async function checkAdmin() {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized")
  }
  return session
}

// Get user statistics
export async function getUserStats() {
  try {
    await checkAdmin()

    const result = await executeQuery(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as new_users_this_week
      FROM users
    `)

    return result[0]
  } catch (error) {
    console.error("Error fetching user stats:", error)
    throw new Error("Failed to fetch user statistics")
  }
}

// Get sales statistics
export async function getSalesStats() {
  try {
    await checkAdmin()

    const result = await executeQuery(`
      SELECT 
        SUM(price) as total_sales,
        SUM(CASE WHEN purchase_date > NOW() - INTERVAL '7 days' THEN price ELSE 0 END) as sales_this_week
      FROM purchases
    `)

    return result[0]
  } catch (error) {
    console.error("Error fetching sales stats:", error)
    throw new Error("Failed to fetch sales statistics")
  }
}

// Get forum statistics
export async function getForumStats() {
  try {
    await checkAdmin()

    const result = await executeQuery(`
      SELECT 
        (SELECT COUNT(*) FROM forum_posts WHERE created_at > NOW() - INTERVAL '7 days') as posts_this_week
      FROM forum_posts
      LIMIT 1
    `)

    return result[0]
  } catch (error) {
    console.error("Error fetching forum stats:", error)
    throw new Error("Failed to fetch forum statistics")
  }
}

// Get issue reports count
export async function getIssueReportsCount() {
  try {
    await checkAdmin()

    // This is a placeholder - you would need to create a reports table
    return { open_reports: 3 }
  } catch (error) {
    console.error("Error fetching issue reports:", error)
    throw new Error("Failed to fetch issue reports")
  }
}

// Get users with pagination
export async function getUsers(page = 1, limit = 10, search = "") {
  try {
    await checkAdmin()

    const offset = (page - 1) * limit

    let query = `
      SELECT 
        id, name, email, role, image_url, created_at,
        COUNT(*) OVER() as total_count
      FROM users
    `

    const params = []
    let paramCounter = 1

    if (search) {
      query += ` WHERE name ILIKE $${paramCounter} OR email ILIKE $${paramCounter}`
      params.push(`%${search}%`)
      paramCounter++
    }

    query += `
      ORDER BY created_at DESC
      LIMIT $${paramCounter} OFFSET $${paramCounter + 1}
    `

    params.push(limit, offset)

    const users = await executeQuery(query, params)

    const totalCount = users.length > 0 ? Number.parseInt(users[0].total_count) : 0

    return {
      users,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }
}

// Update user role
export async function updateUserRole(userId: string, role: "user" | "admin" | "moderator") {
  try {
    await checkAdmin()

    await executeQuery(
      `
      UPDATE users
      SET role = $1, updated_at = NOW()
      WHERE id = $2
    `,
      [role, userId],
    )

    return { success: true }
  } catch (error) {
    console.error("Error updating user role:", error)
    throw new Error("Failed to update user role")
  }
}

// Get products with pagination
export async function getProducts(page = 1, limit = 10, search = "") {
  try {
    await checkAdmin()

    const offset = (page - 1) * limit

    let query = `
      SELECT 
        p.id, p.name, p.slug, p.description, p.price, p.image_url, p.category,
        ps.status, ps.updated_at as status_updated_at,
        COUNT(*) OVER() as total_count
      FROM products p
      LEFT JOIN (
        SELECT DISTINCT ON (product_id) product_id, status, updated_at
        FROM product_statuses
        ORDER BY product_id, updated_at DESC
      ) ps ON p.id = ps.product_id
    `

    const params = []
    let paramCounter = 1

    if (search) {
      query += ` WHERE p.name ILIKE $${paramCounter} OR p.description ILIKE $${paramCounter}`
      params.push(`%${search}%`)
      paramCounter++
    }

    query += `
      ORDER BY p.created_at DESC
      LIMIT $${paramCounter} OFFSET $${paramCounter + 1}
    `

    params.push(limit, offset)

    const products = await executeQuery(query, params)

    const totalCount = products.length > 0 ? Number.parseInt(products[0].total_count) : 0

    return {
      products,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }
}

// Update product status
export async function updateProductStatus(productId: string, status: "Undetected" | "Detected" | "Updating") {
  try {
    await checkAdmin()

    await executeQuery(
      `
      INSERT INTO product_statuses (product_id, status)
      VALUES ($1, $2)
    `,
      [productId, status],
    )

    return { success: true }
  } catch (error) {
    console.error("Error updating product status:", error)
    throw new Error("Failed to update product status")
  }
}

// Create or update product
export async function saveProduct(product: {
  id?: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  image_url?: string
  status?: "Undetected" | "Detected" | "Updating"
}) {
  try {
    await checkAdmin()

    if (product.id) {
      // Update existing product
      await executeQuery(
        `
        UPDATE products
        SET name = $1, slug = $2, description = $3, price = $4, category = $5, 
            image_url = $6, updated_at = NOW()
        WHERE id = $7
      `,
        [
          product.name,
          product.slug,
          product.description,
          product.price,
          product.category,
          product.image_url || null,
          product.id,
        ],
      )

      if (product.status) {
        await updateProductStatus(product.id, product.status)
      }

      return { id: product.id }
    } else {
      // Create new product
      const result = await executeQuery(
        `
        INSERT INTO products (name, slug, description, price, category, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `,
        [product.name, product.slug, product.description, product.price, product.category, product.image_url || null],
      )

      if (product.status && result[0].id) {
        await updateProductStatus(result[0].id, product.status)
      }

      return { id: result[0].id }
    }
  } catch (error) {
    console.error("Error saving product:", error)
    throw new Error("Failed to save product")
  }
}
