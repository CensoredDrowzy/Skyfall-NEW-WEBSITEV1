"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, MessageSquare, Eye, AlertTriangle, ThumbsUp, Flag, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock thread data
const threadData = {
  id: "1",
  title: "My experience with the new Warzone cheat",
  content: `
    <p>Hey everyone,</p>
    <p>I wanted to share my experience with the new Warzone cheat that was released last week. I've been using it for a few days now and I'm really impressed with the features and performance.</p>
    <p>The aimbot is incredibly smooth and customizable. I've been able to adjust the settings to match my playstyle perfectly. The ESP features are also top-notch, with options for player boxes, names, health bars, and more.</p>
    <p>What I'm most impressed with is the stability. I've had zero crashes or issues, even during long gaming sessions. The menu is also very intuitive and easy to navigate.</p>
    <p>Has anyone else tried it yet? What are your thoughts?</p>
  `,
  category: "General Discussion",
  author: {
    name: "GamerX",
    role: "Member",
    avatar: null,
    joinDate: "2023-06-15",
    posts: 24,
  },
  date: "2023-12-15T10:30:00Z",
  pinned: false,
  views: 342,
  likes: 18,
}

// Mock replies
const replies = [
  {
    id: 1,
    author: {
      name: "ProGamer",
      role: "Member",
      avatar: null,
      joinDate: "2023-05-10",
      posts: 87,
    },
    content:
      "I've been using it too and I agree, it's really stable. The ESP features are amazing, especially the loot detection. Makes it so much easier to find the best gear quickly.",
    date: "2023-12-15T12:45:00Z",
    likes: 5,
  },
  {
    id: 2,
    author: {
      name: "CheatMaster",
      role: "VIP Member",
      avatar: null,
      joinDate: "2022-11-22",
      posts: 156,
    },
    content:
      "Have you tried the radar feature? It's a game-changer for me. Being able to see enemies on the minimap gives such a huge advantage in Warzone.",
    date: "2023-12-15T14:20:00Z",
    likes: 3,
  },
  {
    id: 3,
    author: {
      name: "NewUser123",
      role: "Member",
      avatar: null,
      joinDate: "2023-11-05",
      posts: 8,
    },
    content:
      "I'm thinking of buying it. Is it worth the price? Also, how's the detection risk? I'm a bit worried about getting banned.",
    date: "2023-12-15T16:10:00Z",
    likes: 0,
  },
  {
    id: 4,
    author: {
      name: "GamerX",
      role: "Member",
      avatar: null,
      joinDate: "2023-06-15",
      posts: 24,
    },
    content:
      "To answer NewUser123: Definitely worth the price in my opinion. As for detection risk, I've been using it for a week with no issues. The devs seem to update it quickly whenever there's a game patch.",
    date: "2023-12-15T17:30:00Z",
    likes: 2,
  },
]

export default function ThreadPage() {
  const { id } = useParams()
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likedReplies, setLikedReplies] = useState<number[]>([])
  const [threadLiked, setThreadLiked] = useState(false)

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!replyContent.trim()) {
      toast({
        title: "Empty reply",
        description: "Please write something before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Reply posted",
      description: "Your reply has been posted successfully.",
    })

    setReplyContent("")
    setIsSubmitting(false)
  }

  const handleLikeReply = (replyId: number) => {
    if (likedReplies.includes(replyId)) {
      setLikedReplies(likedReplies.filter((id) => id !== replyId))
    } else {
      setLikedReplies([...likedReplies, replyId])
    }
  }

  const handleLikeThread = () => {
    setThreadLiked(!threadLiked)
  }

  const handleDeleteReply = (replyId: number) => {
    toast({
      title: "Reply deleted",
      description: "The reply has been removed.",
    })
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
            <Badge className="mb-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">
              {threadData.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              {threadData.title}
            </h1>
            <div className="flex items-center gap-2 text-zinc-400">
              <span>Started by {threadData.author.name}</span>
              <span>•</span>
              <span>{new Date(threadData.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Thread Content */}
      <section className="w-full py-12 bg-black">
        <div className="container max-w-4xl">
          <Button variant="ghost" className="mb-6 text-zinc-400 hover:text-white" asChild>
            <Link href="/forums">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forums
            </Link>
          </Button>

          {/* Original Post */}
          <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
            <CardHeader className="pb-2 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={threadData.author.avatar || ""} />
                    <AvatarFallback className="bg-[#6074f4]">{threadData.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{threadData.author.name}</CardTitle>
                    <div className="flex items-center text-xs text-zinc-500">
                      <span>{threadData.author.role}</span>
                      <span className="mx-1">•</span>
                      <span>Joined {new Date(threadData.author.joinDate).toLocaleDateString()}</span>
                      <span className="mx-1">•</span>
                      <span>{threadData.author.posts} posts</span>
                    </div>
                  </div>
                </div>
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Thread</DropdownMenuItem>
                      <DropdownMenuItem>Pin Thread</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Delete Thread</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div
                className="text-zinc-300 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: threadData.content }}
              />

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-zinc-400 hover:text-white ${threadLiked ? "text-[#6074f4]" : ""}`}
                    onClick={handleLikeThread}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like {threadLiked ? threadData.likes + 1 : threadData.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 text-zinc-500 mr-1" />
                    <span className="text-sm text-zinc-400">{threadData.views} views</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-zinc-500 mr-1" />
                    <span className="text-sm text-zinc-400">{replies.length} replies</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Replies</h3>
            <div className="space-y-4">
              {replies.map((reply) => (
                <Card key={reply.id} className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2 border-b border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={reply.author.avatar || ""} />
                          <AvatarFallback className="bg-zinc-700">{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{reply.author.name}</p>
                          <div className="flex items-center text-xs text-zinc-500">
                            <span>{reply.author.role}</span>
                            <span className="mx-1">•</span>
                            <span>{new Date(reply.date).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      {isAdmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteReply(reply.id)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-zinc-300">{reply.content}</p>

                    <div className="mt-4 pt-2 flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-zinc-400 hover:text-white ${likedReplies.includes(reply.id) ? "text-[#6074f4]" : ""}`}
                        onClick={() => handleLikeReply(reply.id)}
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Like {likedReplies.includes(reply.id) ? reply.likes + 1 : reply.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reply form */}
          {user ? (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-2">Post a Reply</h4>
                <form onSubmit={handleSubmitReply}>
                  <textarea
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white resize-y min-h-[100px]"
                    placeholder="Write your reply here..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    required
                  />
                  <div className="mt-3 flex justify-end">
                    <Button type="submit" className="bg-[#6074f4] hover:bg-[#4a5fd0]" disabled={isSubmitting}>
                      {isSubmitting ? "Posting..." : "Post Reply"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-4 text-center">
                <p className="text-zinc-400 mb-3">You need to be logged in to post a reply.</p>
                <div className="flex justify-center gap-3">
                  <Button asChild variant="outline" className="border-zinc-700 text-zinc-400">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-[#6074f4] hover:bg-[#4a5fd0]">
                    <Link href="/register">Create Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  )
}
