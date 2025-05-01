"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"

// Forum categories
const categories = [
  { id: "announcements", name: "Announcements", adminOnly: true },
  { id: "general", name: "General Discussion", adminOnly: false },
  { id: "support", name: "Support", adminOnly: false },
  { id: "suggestions", name: "Suggestions", adminOnly: false },
]

export default function NewThreadPage() {
  const { user, isLoading, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isPinned, setIsPinned] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/forums/new-thread")
    }
  }, [user, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Thread created",
      description: "Your thread has been created successfully.",
    })

    // Redirect to the forums page
    router.push("/forums")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-[#6074f4] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Router will redirect
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="mb-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">FORUMS</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Create New Thread
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Start a new discussion in the SkyFall community.
            </p>
          </div>
        </div>
      </section>

      {/* New Thread Form */}
      <section className="w-full py-12 bg-black">
        <div className="container max-w-4xl">
          <Button variant="ghost" className="mb-6 text-zinc-400 hover:text-white" asChild>
            <Link href="/forums">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forums
            </Link>
          </Button>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle>Create a New Thread</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {categories
                        .filter((cat) => !cat.adminOnly || (cat.adminOnly && isAdmin))
                        .map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Thread Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Enter a descriptive title for your thread"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-white">
                    Content
                  </Label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[200px] bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white resize-y"
                    placeholder="Write your post here..."
                    required
                  />
                </div>

                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pinned"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="rounded border-zinc-700 bg-zinc-800 text-[#6074f4]"
                    />
                    <Label htmlFor="pinned" className="text-white cursor-pointer">
                      Pin this thread
                    </Label>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                    onClick={() => router.push("/forums")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#6074f4] hover:bg-[#4a5fd0]" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Thread"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
