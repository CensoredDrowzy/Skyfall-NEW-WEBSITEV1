import Link from "next/link"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Users, Clock, Eye, ArrowRight, Pin } from "lucide-react"

// Forum categories
const categories = [
  {
    id: "announcements",
    name: "Announcements",
    description: "Official announcements from the SkyFall team",
    icon: <Pin className="h-5 w-5 text-[#6074f4]" />,
    threads: 12,
    posts: 48,
    lastPost: {
      title: "Important Update: New Products Coming Soon",
      author: "Admin",
      date: "2 hours ago",
    },
  },
  {
    id: "general",
    name: "General Discussion",
    description: "Discuss anything related to SkyFall products",
    icon: <MessageSquare className="h-5 w-5 text-[#6074f4]" />,
    threads: 156,
    posts: 1243,
    lastPost: {
      title: "My experience with the new Warzone cheat",
      author: "GamerX",
      date: "15 minutes ago",
    },
  },
  {
    id: "support",
    name: "Support",
    description: "Get help with any issues you're experiencing",
    icon: <Users className="h-5 w-5 text-[#6074f4]" />,
    threads: 89,
    posts: 432,
    lastPost: {
      title: "Installation problem on Windows 11",
      author: "NewUser123",
      date: "1 hour ago",
    },
  },
  {
    id: "suggestions",
    name: "Suggestions",
    description: "Share your ideas for improving our products",
    icon: <MessageSquare className="h-5 w-5 text-[#6074f4]" />,
    threads: 64,
    posts: 287,
    lastPost: {
      title: "Feature request for Apex Legends cheat",
      author: "ApexPredator",
      date: "3 hours ago",
    },
  },
]

// Recent threads
const recentThreads = [
  {
    id: 1,
    title: "Important Update: New Products Coming Soon",
    category: "Announcements",
    author: "Admin",
    replies: 36,
    views: 1243,
    lastReply: "2 hours ago",
    pinned: true,
    locked: false,
  },
  {
    id: 2,
    title: "My experience with the new Warzone cheat",
    category: "General Discussion",
    author: "GamerX",
    replies: 24,
    views: 342,
    lastReply: "15 minutes ago",
    pinned: false,
    locked: false,
  },
  {
    id: 3,
    title: "Installation problem on Windows 11",
    category: "Support",
    author: "NewUser123",
    replies: 12,
    views: 156,
    lastReply: "1 hour ago",
    pinned: false,
    locked: false,
  },
  {
    id: 4,
    title: "Feature request for Apex Legends cheat",
    category: "Suggestions",
    author: "ApexPredator",
    replies: 8,
    views: 124,
    lastReply: "3 hours ago",
    pinned: false,
    locked: false,
  },
  {
    id: 5,
    title: "How to avoid HWID bans?",
    category: "General Discussion",
    author: "SafetyFirst",
    replies: 42,
    views: 876,
    lastReply: "5 hours ago",
    pinned: false,
    locked: false,
  },
]

export default function ForumsPage() {
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
              COMMUNITY
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">SkyFall Forums</h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Join our community to discuss products, get support, and connect with other users.
            </p>
            <div className="relative w-full max-w-md mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search forums..."
                className="pl-10 bg-zinc-900/70 backdrop-blur-sm border-zinc-700 text-white w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Forums Section */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          {/* Categories */}
          <div className="mb-12 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Categories</h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {categories.map((category) => (
                <div key={category.id} className="p-6 bg-black hover:bg-zinc-900/50 transition-colors">
                  <Link href={`/forums/${category.id}`} className="flex flex-col md:flex-row md:items-center">
                    <div className="flex items-center mb-4 md:mb-0 md:w-1/2">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{category.name}</h3>
                        <p className="text-sm text-zinc-400">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end md:w-1/2 md:space-x-12">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{category.threads}</p>
                        <p className="text-xs text-zinc-500">Threads</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{category.posts}</p>
                        <p className="text-xs text-zinc-500">Posts</p>
                      </div>
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-white">{category.lastPost.title}</p>
                        <p className="text-xs text-zinc-500">
                          by {category.lastPost.author} • {category.lastPost.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Threads */}
          <div className="mb-12 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Recent Threads</h2>
              <Button asChild variant="ghost" size="sm" className="text-[#6074f4]">
                <Link href="/forums/new-thread">
                  New Thread <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="divide-y divide-zinc-800">
              {recentThreads.map((thread) => (
                <div key={thread.id} className="p-6 bg-black hover:bg-zinc-900/50 transition-colors">
                  <Link href={`/forums/thread/${thread.id}`} className="flex flex-col md:flex-row md:items-center">
                    <div className="flex items-start mb-4 md:mb-0 md:w-1/2">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <h3 className="font-bold text-white">{thread.title}</h3>
                          {thread.pinned && (
                            <Badge className="ml-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">Pinned</Badge>
                          )}
                          {thread.locked && (
                            <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30">Locked</Badge>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400">
                          in {thread.category} • by {thread.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end md:w-1/2 md:space-x-12">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-zinc-500 mr-1" />
                        <span className="text-sm text-zinc-400">{thread.replies}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-zinc-500 mr-1" />
                        <span className="text-sm text-zinc-400">{thread.views}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-zinc-500 mr-1" />
                        <span className="text-sm text-zinc-400">{thread.lastReply}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="bg-zinc-900 px-6 py-4 border-t border-zinc-800 flex justify-center">
              <Button asChild variant="outline" size="sm" className="text-zinc-400 border-zinc-700">
                <Link href="/forums/all-threads">View All Threads</Link>
              </Button>
            </div>
          </div>

          {/* Forum Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-2">Forum Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Threads:</span>
                  <span className="text-white font-medium">321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Posts:</span>
                  <span className="text-white font-medium">2,010</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Members:</span>
                  <span className="text-white font-medium">1,543</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Newest Member:</span>
                  <span className="text-[#6074f4]">GamingPro</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-2">Online Users</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Members Online:</span>
                  <span className="text-white font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Guests Online:</span>
                  <span className="text-white font-medium">78</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Online:</span>
                  <span className="text-white font-medium">120</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-xs text-zinc-500">These statistics are updated every 5 minutes</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-2">Top Contributors</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#6074f4]/20 flex items-center justify-center mr-2">
                    <span className="text-xs font-bold text-[#6074f4]">A</span>
                  </div>
                  <span className="text-white">Admin</span>
                  <span className="ml-auto text-zinc-400">248 posts</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#6074f4]/20 flex items-center justify-center mr-2">
                    <span className="text-xs font-bold text-[#6074f4]">G</span>
                  </div>
                  <span className="text-white">GamerX</span>
                  <span className="ml-auto text-zinc-400">156 posts</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#6074f4]/20 flex items-center justify-center mr-2">
                    <span className="text-xs font-bold text-[#6074f4]">S</span>
                  </div>
                  <span className="text-white">SafetyFirst</span>
                  <span className="ml-auto text-zinc-400">124 posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
