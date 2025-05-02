"use server"

import { executeQuery } from "@/lib/db"
import { getSession } from "./auth"

// Get forum categories
export async function getForumCategories() {
  try {
    const categories = await executeQuery(`
      SELECT 
        fc.id, 
        fc.name, 
        fc.description, 
        fc.icon, 
        fc.admin_only,
        COUNT(DISTINCT ft.id) as thread_count,
        COUNT(DISTINCT fp.id) as post_count,
        (
          SELECT json_build_object(
            'title', ft2.title,
            'author', u.name,
            'date', ft2.created_at
          )
          FROM forum_threads ft2
          JOIN users u ON ft2.user_id = u.id
          WHERE ft2.category_id = fc.id
          ORDER BY ft2.created_at DESC
          LIMIT 1
        ) as last_post
      FROM forum_categories fc
      LEFT JOIN forum_threads ft ON fc.id = ft.category_id
      LEFT JOIN forum_posts fp ON ft.id = fp.thread_id
      GROUP BY fc.id
      ORDER BY fc.order_index ASC
    `)

    return categories
  } catch (error) {
    console.error("Error fetching forum categories:", error)
    throw new Error("Failed to fetch forum categories")
  }
}

// Get recent threads
export async function getRecentThreads(limit = 5) {
  try {
    const threads = await executeQuery(
      `
      SELECT 
        ft.id, 
        ft.title, 
        fc.name as category, 
        u.name as author,
        ft.pinned,
        ft.locked,
        ft.views,
        COUNT(fp.id) as replies,
        (
          SELECT MAX(fp2.created_at)
          FROM forum_posts fp2
          WHERE fp2.thread_id = ft.id
        ) as last_reply
      FROM forum_threads ft
      JOIN forum_categories fc ON ft.category_id = fc.id
      JOIN users u ON ft.user_id = u.id
      LEFT JOIN forum_posts fp ON ft.id = fp.thread_id
      GROUP BY ft.id, fc.name, u.name
      ORDER BY ft.pinned DESC, ft.created_at DESC
      LIMIT $1
    `,
      [limit],
    )

    return threads
  } catch (error) {
    console.error("Error fetching recent threads:", error)
    throw new Error("Failed to fetch recent threads")
  }
}

// Get thread by ID
export async function getThreadById(threadId: string) {
  try {
    // Get thread details
    const threads = await executeQuery(
      `
      SELECT 
        ft.id, 
        ft.title, 
        ft.content,
        ft.created_at,
        ft.pinned,
        ft.locked,
        ft.views,
        fc.id as category_id,
        fc.name as category,
        u.id as author_id,
        u.name as author_name,
        u.image_url as author_image,
        u.role as author_role,
        (SELECT COUNT(*) FROM forum_posts WHERE user_id = u.id) as author_posts,
        (SELECT created_at FROM users WHERE id = u.id) as author_joined
      FROM forum_threads ft
      JOIN forum_categories fc ON ft.category_id = fc.id
      JOIN users u ON ft.user_id = u.id
      WHERE ft.id = $1
    `,
      [threadId],
    )

    if (!threads || threads.length === 0) {
      throw new Error("Thread not found")
    }

    // Increment view count
    await executeQuery(
      `
      UPDATE forum_threads
      SET views = views + 1
      WHERE id = $1
    `,
      [threadId],
    )

    // Get thread replies
    const replies = await executeQuery(
      `
      SELECT 
        fp.id, 
        fp.content, 
        fp.created_at,
        u.id as author_id,
        u.name as author_name,
        u.image_url as author_image,
        u.role as author_role,
        (SELECT COUNT(*) FROM forum_posts WHERE user_id = u.id) as author_posts,
        (SELECT created_at FROM users WHERE id = u.id) as author_joined
      FROM forum_posts fp
      JOIN users u ON fp.user_id = u.id
      WHERE fp.thread_id = $1
      ORDER BY fp.created_at ASC
    `,
      [threadId],
    )

    return {
      thread: threads[0],
      replies,
    }
  } catch (error) {
    console.error("Error fetching thread:", error)
    throw new Error("Failed to fetch thread")
  }
}

// Create new thread
export async function createThread(categoryId: string, title: string, content: string, isPinned = false) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error("You must be logged in to create a thread")
    }

    // Check if category exists and if it's admin-only
    const categories = await executeQuery(
      `
      SELECT admin_only FROM forum_categories WHERE id = $1
    `,
      [categoryId],
    )

    if (!categories || categories.length === 0) {
      throw new Error("Category not found")
    }

    const category = categories[0]
    if (category.admin_only && session.role !== "admin") {
      throw new Error("You do not have permission to create a thread in this category")
    }

    // Create thread
    const result = await executeQuery(
      `
      INSERT INTO forum_threads (category_id, user_id, title, content, pinned)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `,
      [categoryId, session.id, title, content, isPinned && session.role === "admin"],
    )

    return result[0]
  } catch (error) {
    console.error("Error creating thread:", error)
    throw new Error("Failed to create thread")
  }
}

// Create thread reply
export async function createReply(threadId: string, content: string) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error("You must be logged in to reply")
    }

    // Check if thread exists and is not locked
    const threads = await executeQuery(
      `
      SELECT locked FROM forum_threads WHERE id = $1
    `,
      [threadId],
    )

    if (!threads || threads.length === 0) {
      throw new Error("Thread not found")
    }

    const thread = threads[0]
    if (thread.locked && session.role !== "admin") {
      throw new Error("This thread is locked")
    }

    // Create reply
    const result = await executeQuery(
      `
      INSERT INTO forum_posts (thread_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
      [threadId, session.id, content],
    )

    // Update thread's updated_at timestamp
    await executeQuery(
      `
      UPDATE forum_threads
      SET updated_at = NOW()
      WHERE id = $1
    `,
      [threadId],
    )

    return result[0]
  } catch (error) {
    console.error("Error creating reply:", error)
    throw new Error("Failed to create reply")
  }
}
