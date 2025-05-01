"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload } from "lucide-react"

// Media categories
const categories = [
  { id: "fortnite", name: "Fortnite" },
  { id: "warzone", name: "Warzone" },
  { id: "valorant", name: "Valorant" },
  { id: "r6", name: "Rainbow Six Siege" },
  { id: "spoofer", name: "HWID Spoofer" },
  { id: "tutorials", name: "Tutorials" },
]

export default function AddMediaPage() {
  const { user, isLoading, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [uploadType, setUploadType] = useState("youtube")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [tiktokUrl, setTiktokUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login?redirect=/admin/media/new")
      } else if (!isAdmin) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, isAdmin, router])

  useEffect(() => {
    // Extract video ID from YouTube URL
    if (uploadType === "youtube" && youtubeUrl) {
      try {
        const url = new URL(youtubeUrl)
        let videoId = ""

        if (url.hostname === "youtu.be") {
          videoId = url.pathname.slice(1)
        } else if (url.hostname.includes("youtube.com")) {
          videoId = url.searchParams.get("v") || ""
        }

        if (videoId) {
          setPreviewUrl(`https://www.youtube.com/embed/${videoId}`)
        } else {
          setPreviewUrl("")
        }
      } catch (error) {
        setPreviewUrl("")
      }
    } else {
      setPreviewUrl("")
    }
  }, [uploadType, youtubeUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (uploadType === "youtube" && !youtubeUrl) {
      toast({
        title: "Missing YouTube URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      })
      return
    }

    if (uploadType === "tiktok" && !tiktokUrl) {
      toast({
        title: "Missing TikTok URL",
        description: "Please enter a valid TikTok URL.",
        variant: "destructive",
      })
      return
    }

    if (uploadType === "upload" && !file) {
      toast({
        title: "Missing video file",
        description: "Please upload a video file.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Media added successfully",
        description: "Your media has been added to the library.",
      })
      setIsSubmitting(false)
      router.push("/media")
    }, 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0])
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Add New Media</CardTitle>
          <CardDescription>Upload videos or link external content to the media library</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Enter media title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Enter media description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>

              <div className="grid gap-3">
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <FormLabel>Media Type</FormLabel>
                <Tabs defaultValue="youtube" value={uploadType} onValueChange={setUploadType}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="youtube">YouTube</TabsTrigger>
                    <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>

                  <TabsContent value="youtube" className="mt-4">
                    <div className="grid gap-3">
                      <FormLabel htmlFor="youtube-url">YouTube URL</FormLabel>
                      <Input
                        id="youtube-url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />

                      {previewUrl && (
                        <div className="mt-4 aspect-video overflow-hidden rounded-lg border">
                          <iframe
                            src={previewUrl}
                            className="h-full w-full"
                            allowFullScreen
                            title="YouTube video preview"
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="tiktok" className="mt-4">
                    <div className="grid gap-3">
                      <FormLabel htmlFor="tiktok-url">TikTok URL</FormLabel>
                      <Input
                        id="tiktok-url"
                        placeholder="https://www.tiktok.com/@username/video/..."
                        value={tiktokUrl}
                        onChange={(e) => setTiktokUrl(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="mt-4">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormLabel htmlFor="video-file">Video File</FormLabel>
                        <div className="flex items-center gap-4">
                          <Input
                            id="video-file"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("video-file")?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Select Video
                          </Button>
                          {file && <span className="text-sm text-muted-foreground">{file.name}</span>}
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <FormLabel htmlFor="thumbnail">Thumbnail (Optional)</FormLabel>
                        <div className="flex items-center gap-4">
                          <Input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("thumbnail")?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Select Thumbnail
                          </Button>
                          {thumbnail && <span className="text-sm text-muted-foreground">{thumbnail.name}</span>}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="button" variant="outline" className="mr-2" onClick={() => router.push("/media")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Add Media"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
