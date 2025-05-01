"use client"

import { useState } from "react"
import Link from "next/link"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-provider"
import { ArrowLeft, MessageSquare, Eye, Clock, Pin, AlertTriangle, ThumbsUp, Flag } from "lucide-react"

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: "Important Update: New Products Coming Soon",
    content: `
      <p>Hello SkyFall Community,</p>
      <p>We're excited to announce that we'll be releasing several new products in the coming weeks. Our team has been working hard to develop cutting-edge solutions for the latest games.</p>
      <p>Here's what you can expect:</p>
      <ul>
        <li>New Fortnite Cheat with advanced features</li>
        <li>Updated Warzone Cheat compatible with the latest patch</li>
        <li>Brand new HWID Spoofer with improved detection avoidance</li>
      </ul>
      <p>Stay tuned for more information and release dates. We'll be posting updates here and in our Discord server.</p>
      <p>Thank you for your continued support!</p>
      <p>- The SkyFall Team</p>
    `,
    author: {
      name: "Admin",
      role: "Administrator",
      avatar: null,
    },
    date: "2023-12-15T10:30:00Z",
    pinned: true,
    views: 1243,
    replies: 36,
    lastReply: "2 hours ago",
  },
  {
    id: 2,
    title: "Website Maintenance: Scheduled Downtime",
    content: `
      <p>Dear SkyFall Users,</p>
      <p>We will be performing scheduled maintenance on our servers this weekend. During this time, the website and download servers may be temporarily unavailable.</p>
      <p><strong>Maintenance Schedule:</strong></p>
      <p>Date: Saturday, December 18th<br>Time: 2:00 AM - 5:00 AM EST</p>
      <p>We recommend downloading any products you need before this time to avoid any inconvenience. All services will be fully restored once the maintenance is complete.</p>
      <p>We apologize for any inconvenience this may cause and appreciate your understanding as we work to improve our infrastructure.</p>
      <p>- The SkyFall Team</p>
    `,
    author: {
      name: "SkyFall Support",
      role: "Support Team",
      avatar: null,
    },
    date: "2023-12-14T15:45:00Z",
    pinned: true,
    views: 876,
    replies: 12,
    lastReply: "1 day ago",
  },
  {
    id: 3,
    title: "Black Friday Sale: 50% Off All Products",
    content: `
      <p>🔥 BLACK FRIDAY SALE 🔥</p>
      <p>We're excited to announce our biggest sale of the year! For a limited time, get 50% off all SkyFall products.</p>
      <p><strong>Sale Details:</strong></p>
      <ul>
        <li>50% off all products</li>
        <li>Sale starts November 24th</li>
        <li>Ends November 28th at midnight EST</li>
      </ul>
      <p>This is the perfect opportunity to try our premium cheats or extend your existing licenses at a discounted price.</p>
      <p>Use code <strong>BLACKFRIDAY50</strong> at checkout to claim your discount.</p>
      <p>Don't miss out on this limited-time offer!</p>
      <p>- The SkyFall Team</p>
    `,
    author: {
      name: "Admin",
      role: "Administrator",
      avatar: null,
    },
    date: "2023-11-23T09:00:00Z",
    pinned: false,
    views: 2145,
    replies: 58,
    lastReply: "3 weeks ago",
  },
  {
    id: 4,
    title: "New Forum Rules and Guidelines",
    content: `
      <p>Hello SkyFall Community,</p>
      <p>We've updated our forum rules and guidelines to ensure a positive and helpful environment for all users. Please take a moment to familiarize yourself with these changes.</p>
      <p><strong>Key Updates:</strong></p>
      <ul>
        <li>No sharing of personal information</li>
        <li>No discussion of illegal activities</li>
        <li>Be respectful to other community members</li>
        <li>No spamming or excessive self-promotion</li>
        <li>Keep discussions relevant to the topic</li>
      </ul>
      <p>These rules are in place to protect our community and ensure everyone has a positive experience. Violations may result in warnings or account restrictions.</p>
      <p>If you have any questions about these rules, please contact a moderator or administrator.</p>
      <p>Thank you for your cooperation!</p>
      <p>- The SkyFall Team</p>
    `,
    author: {
      name: "Moderator",
      role: "Forum Moderator",
      avatar: null,
    },
    date: "2023-10-10T14:20:00Z",
    pinned: false,
    views: 1532,
    replies: 24,
    lastReply: "2 months ago",
  },
]

export default function AnnouncementsPage() {
  const { user, isAdmin } = useAuth()
  const [activeAnnouncement, setActiveAnnouncement] = useState<number | null>(null)

  const selectedAnnouncement =
    activeAnnouncement !== null ? announcements.find((a) => a.id === activeAnnouncement) : null

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
              ANNOUNCEMENTS
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Official Announcements
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Stay updated with the latest news and updates from the SkyFall team.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          {activeAnnouncement === null ? (
            <div className="mb-12 border border-zinc-800 rounded-lg overflow-hidden">
              <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Announcements</h2>
                {isAdmin && (
                  <Button asChild className="bg-[#6074f4] hover:bg-[#4a5fd0]">
                    <Link href="/admin/announcements/new">Create Announcement</Link>
                  </Button>
                )}
              </div>
              <div className="divide-y divide-zinc-800">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-6 bg-black hover:bg-zinc-900/50 transition-colors cursor-pointer"
                    onClick={() => setActiveAnnouncement(announcement.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex items-start mb-4 md:mb-0 md:w-1/2">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <h3 className="font-bold text-white">{announcement.title}</h3>
                            {announcement.pinned && (
                              <Badge className="ml-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">
                                <Pin className="h-3 w-3 mr-1" /> Pinned
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 mt-1">
                            by {announcement.author.name} • {new Date(announcement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end md:w-1/2 md:space-x-12">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-zinc-500 mr-1" />
                          <span className="text-sm text-zinc-400">{announcement.replies}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-zinc-500 mr-1" />
                          <span className="text-sm text-zinc-400">{announcement.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-zinc-500 mr-1" />
                          <span className="text-sm text-zinc-400">{announcement.lastReply}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-12">
              <Button
                variant="ghost"
                className="mb-4 text-zinc-400 hover:text-white"
                onClick={() => setActiveAnnouncement(null)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Announcements
              </Button>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedAnnouncement?.title}</CardTitle>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={selectedAnnouncement?.author.avatar || ""} />
                          <AvatarFallback className="bg-[#6074f4] text-xs">
                            {selectedAnnouncement?.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{selectedAnnouncement?.author.name}</p>
                          <p className="text-xs text-zinc-500">{selectedAnnouncement?.author.role}</p>
                        </div>
                        <span className="text-xs text-zinc-500 ml-4">
                          {new Date(selectedAnnouncement?.date || "").toLocaleString()}
                        </span>
                        {selectedAnnouncement?.pinned && (
                          <Badge className="ml-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">
                            <Pin className="h-3 w-3 mr-1" /> Pinned
                          </Badge>
                        )}
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="mt-4 text-zinc-300 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedAnnouncement?.content || "" }}
                  />

                  <Separator className="my-6 bg-zinc-800" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-zinc-500 mr-1" />
                        <span className="text-sm text-zinc-400">{selectedAnnouncement?.views} views</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-zinc-500 mr-1" />
                        <span className="text-sm text-zinc-400">{selectedAnnouncement?.replies} replies</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Replies Section */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-4">Replies</h3>
                <div className="space-y-4">
                  {/* Sample replies */}
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <Avatar className="h-8 w-8 mr-3 mt-1">
                            <AvatarFallback className="bg-zinc-700 text-xs">
                              {String.fromCharCode(65 + index)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-white">User{index + 1}</p>
                                <p className="text-xs text-zinc-500">{index + 1} day(s) ago</p>
                              </div>
                              {isAdmin && (
                                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                              )}
                            </div>
                            <p className="mt-2 text-zinc-300">
                              {index === 0
                                ? "Thanks for the update! Looking forward to the new products."
                                : index === 1
                                  ? "Will the new Fortnite cheat include aimbot and ESP features?"
                                  : "Great news! When exactly will these be released?"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Reply form */}
                {user ? (
                  <Card className="mt-6 bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-4">
                      <h4 className="text-white font-medium mb-2">Post a Reply</h4>
                      <textarea
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white resize-y min-h-[100px]"
                        placeholder="Write your reply here..."
                      />
                      <div className="mt-3 flex justify-end">
                        <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Post Reply</Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="mt-6 bg-zinc-900/50 border-zinc-800">
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
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
