"use client"

import { useState } from "react"
import Image from "next/image"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Play, Clock, Eye } from "lucide-react"

// Media categories
const categories = [
  { id: "all", name: "All Videos" },
  { id: "fortnite", name: "Fortnite" },
  { id: "warzone", name: "Warzone" },
  { id: "valorant", name: "Valorant" },
  { id: "r6", name: "Rainbow Six Siege" },
  { id: "spoofer", name: "HWID Spoofer" },
  { id: "tutorials", name: "Tutorials" },
]

// Mock media data
const mediaItems = [
  {
    id: 1,
    title: "Warzone Cheat Showcase",
    description: "Check out our latest Warzone cheat in action with aimbot and ESP features.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "warzone",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 1245,
    date: "2023-12-10",
  },
  {
    id: 2,
    title: "Fortnite ESP Features",
    description: "See all the amazing ESP features in our Fortnite cheat.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "fortnite",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 987,
    date: "2023-12-05",
  },
  {
    id: 3,
    title: "Valorant Aimbot Demo",
    description: "Watch our Valorant aimbot in action with smooth targeting and customizable settings.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "valorant",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 1532,
    date: "2023-11-28",
  },
  {
    id: 4,
    title: "HWID Spoofer Tutorial",
    description: "Learn how to use our HWID spoofer to avoid hardware bans.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "spoofer",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 2145,
    date: "2023-11-20",
  },
  {
    id: 5,
    title: "Rainbow Six Siege Wallhack",
    description: "See through walls with our R6 cheat's advanced wallhack feature.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "r6",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 876,
    date: "2023-11-15",
  },
  {
    id: 6,
    title: "How to Install SkyFall Cheats",
    description: "Step-by-step tutorial on how to install and set up SkyFall cheats.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "tutorials",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 3210,
    date: "2023-11-10",
  },
  {
    id: 7,
    title: "Warzone Radar Hack",
    description: "See all enemies on the minimap with our Warzone radar hack.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "warzone",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 1876,
    date: "2023-11-05",
  },
  {
    id: 8,
    title: "Fortnite Aimbot Showcase",
    description: "Dominate in Fortnite with our precision aimbot.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    category: "fortnite",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 2345,
    date: "2023-10-30",
  },
]

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const filteredMedia = mediaItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedVideo = activeVideo !== null ? mediaItems.find((item) => item.id === activeVideo) : null

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="mb-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">MEDIA</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              SkyFall Media Gallery
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Watch videos and demos of our products in action.
            </p>
            <div className="relative w-full max-w-md mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search videos..."
                className="pl-10 bg-zinc-900/70 backdrop-blur-sm border-zinc-700 text-white w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Media Content */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <Tabs defaultValue="all" className="space-y-8">
            <div className="overflow-x-auto pb-2">
              <TabsList className="bg-zinc-900/50 border border-zinc-800 inline-flex w-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                {activeVideo === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedia
                      .filter((item) => category.id === "all" || item.category === category.id)
                      .map((item) => (
                        <Card
                          key={item.id}
                          className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-[#6074f4]/50 transition-all duration-300 cursor-pointer"
                          onClick={() => setActiveVideo(item.id)}
                        >
                          <div className="relative aspect-video">
                            <Image
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 rounded-full bg-[#6074f4]/80 flex items-center justify-center">
                                <Play className="h-8 w-8 text-white" />
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-white">{item.title}</h3>
                            <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{item.views} views</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(item.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Button
                      variant="ghost"
                      className="text-zinc-400 hover:text-white"
                      onClick={() => setActiveVideo(null)}
                    >
                      ← Back to Videos
                    </Button>

                    <div className="aspect-video w-full bg-zinc-900 rounded-lg overflow-hidden">
                      <iframe
                        src={selectedVideo?.videoUrl}
                        title={selectedVideo?.title}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedVideo?.title}</h2>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4 text-sm text-zinc-400">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{selectedVideo?.views} views</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{new Date(selectedVideo?.date || "").toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge className="bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">
                          {categories.find((c) => c.id === selectedVideo?.category)?.name}
                        </Badge>
                      </div>
                      <p className="mt-4 text-zinc-300">{selectedVideo?.description}</p>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-white mb-4">Related Videos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredMedia
                          .filter(
                            (item) =>
                              item.id !== selectedVideo?.id &&
                              (item.category === selectedVideo?.category || Math.random() > 0.5),
                          )
                          .slice(0, 4)
                          .map((item) => (
                            <Card
                              key={item.id}
                              className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-[#6074f4]/50 transition-all duration-300 cursor-pointer"
                              onClick={() => setActiveVideo(item.id)}
                            >
                              <div className="relative aspect-video">
                                <Image
                                  src={item.thumbnail || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                  <Play className="h-8 w-8 text-white" />
                                </div>
                              </div>
                              <CardContent className="p-3">
                                <h4 className="font-medium text-white text-sm">{item.title}</h4>
                                <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
                                  <div className="flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    <span>{item.views}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  )
}
