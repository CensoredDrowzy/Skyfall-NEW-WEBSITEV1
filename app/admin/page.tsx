"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Button } from "@/components/ui/button"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-provider"
import { Users, ShoppingCart, MessageSquare, FileText, Video, AlertTriangle, Bell } from "lucide-react"

export default function AdminPage() {
  const { user, isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login?redirect=/admin")
      } else if (!isAdmin) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, isAdmin, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-[#6074f4] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
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
            <Badge className="mb-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">
              ADMIN PANEL
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              SkyFall Administration
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Manage users, content, and settings for the SkyFall platform.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Panel Content */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="grid grid-cols-5 md:w-[800px] mx-auto bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Users
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Content
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Products
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="mr-2 h-5 w-5 text-[#6074f4]" />
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">1,543</div>
                    <p className="text-zinc-400 text-sm">+24 this week</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5 text-[#6074f4]" />
                      Total Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">$12,845</div>
                    <p className="text-zinc-400 text-sm">+$1,245 this week</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5 text-[#6074f4]" />
                      Forum Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">321</div>
                    <p className="text-zinc-400 text-sm">Posts this week</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-[#6074f4]" />
                      Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">3</div>
                    <p className="text-zinc-400 text-sm">Open reports</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/admin/announcements/new">
                      <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer h-full">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                          <FileText className="h-8 w-8 text-[#6074f4] mb-2" />
                          <h3 className="font-medium text-white">Create Announcement</h3>
                          <p className="text-xs text-zinc-400 mt-1">Post news and updates</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/admin/products/status">
                      <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer h-full">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                          <AlertTriangle className="h-8 w-8 text-[#6074f4] mb-2" />
                          <h3 className="font-medium text-white">Update Product Status</h3>
                          <p className="text-xs text-zinc-400 mt-1">Manage detection status</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/admin/media/new">
                      <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer h-full">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                          <Video className="h-8 w-8 text-[#6074f4] mb-2" />
                          <h3 className="font-medium text-white">Add Media Content</h3>
                          <p className="text-xs text-zinc-400 mt-1">Upload videos and media</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Users className="h-4 w-4" />,
                        text: "New user registered: JohnDoe",
                        time: "10 minutes ago",
                      },
                      {
                        icon: <ShoppingCart className="h-4 w-4" />,
                        text: "New purchase: Warzone Cheat",
                        time: "25 minutes ago",
                      },
                      {
                        icon: <MessageSquare className="h-4 w-4" />,
                        text: "New forum post in General Discussion",
                        time: "1 hour ago",
                      },
                      {
                        icon: <AlertTriangle className="h-4 w-4" />,
                        text: "Product status updated: Valorant Cheat",
                        time: "2 hours ago",
                      },
                      { icon: <Bell className="h-4 w-4" />, text: "New announcement published", time: "3 hours ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-3 mt-0.5 bg-zinc-800 p-2 rounded-full">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-white">{activity.text}</p>
                          <p className="text-xs text-zinc-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                          type="search"
                          placeholder="Search users..."
                          className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                      <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Add User</Button>
                    </div>

                    <div className="border border-zinc-800 rounded-lg overflow-hidden">
                      <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white grid grid-cols-5">
                        <div>Username</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Joined</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y divide-zinc-800">
                        {[
                          { username: "JohnDoe", email: "john@example.com", role: "Member", joined: "2023-12-01" },
                          { username: "AliceSmith", email: "alice@example.com", role: "Member", joined: "2023-11-15" },
                          {
                            username: "BobJohnson",
                            email: "bob@example.com",
                            role: "VIP Member",
                            joined: "2023-10-22",
                          },
                          {
                            username: "Admin",
                            email: "admin@example.com",
                            role: "Administrator",
                            joined: "2023-01-01",
                          },
                          { username: "ModUser", email: "mod@example.com", role: "Moderator", joined: "2023-05-10" },
                        ].map((user, index) => (
                          <div key={index} className="px-4 py-3 text-sm grid grid-cols-5 items-center">
                            <div className="font-medium text-white">{user.username}</div>
                            <div className="text-zinc-400">{user.email}</div>
                            <div>
                              <Badge
                                className={`${
                                  user.role === "Administrator"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : user.role === "Moderator"
                                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                      : user.role === "VIP Member"
                                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                        : "bg-green-500/20 text-green-400 border-green-500/30"
                                }`}
                              >
                                {user.role}
                              </Badge>
                            </div>
                            <div className="text-zinc-400">{new Date(user.joined).toLocaleDateString()}</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400">
                                Reset Password
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-400">Showing 5 of 1,543 users</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400" disabled>
                          Previous
                        </Button>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>User Roles</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-zinc-800 rounded-lg overflow-hidden">
                      <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white grid grid-cols-3">
                        <div>Role</div>
                        <div>Description</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y divide-zinc-800">
                        {[
                          { role: "Administrator", description: "Full access to all features and settings" },
                          { role: "Moderator", description: "Can manage forum posts and user content" },
                          { role: "VIP Member", description: "Premium users with access to exclusive features" },
                          { role: "Member", description: "Standard user access" },
                          { role: "Banned", description: "No access to the platform" },
                        ].map((role, index) => (
                          <div key={index} className="px-4 py-3 text-sm grid grid-cols-3 items-center">
                            <div>
                              <Badge
                                className={`${
                                  role.role === "Administrator"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : role.role === "Moderator"
                                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                      : role.role === "VIP Member"
                                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                        : role.role === "Banned"
                                          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                          : "bg-green-500/20 text-green-400 border-green-500/30"
                                }`}
                              >
                                {role.role}
                              </Badge>
                            </div>
                            <div className="text-zinc-400">{role.description}</div>
                            <div>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400">
                                Edit Permissions
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Manage site announcements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button asChild className="w-full bg-[#6074f4] hover:bg-[#4a5fd0]">
                        <Link href="/admin/announcements/new">Create New Announcement</Link>
                      </Button>

                      <div className="border border-zinc-800 rounded-lg overflow-hidden">
                        <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white">Recent Announcements</div>
                        <div className="divide-y divide-zinc-800">
                          {[
                            { title: "Important Update: New Products Coming Soon", date: "2023-12-15" },
                            { title: "Website Maintenance: Scheduled Downtime", date: "2023-12-14" },
                            { title: "Black Friday Sale: 50% Off All Products", date: "2023-11-23" },
                          ].map((announcement, index) => (
                            <div key={index} className="px-4 py-3 hover:bg-zinc-800/50">
                              <div className="font-medium text-white">{announcement.title}</div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-zinc-500">
                                  {new Date(announcement.date).toLocaleDateString()}
                                </span>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-zinc-400 hover:text-white">
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-red-400 hover:text-red-300"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Forum Management</CardTitle>
                    <CardDescription>Manage forum categories and posts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Add Category</Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-400">
                          Manage Threads
                        </Button>
                      </div>

                      <div className="border border-zinc-800 rounded-lg overflow-hidden">
                        <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white">Forum Categories</div>
                        <div className="divide-y divide-zinc-800">
                          {[
                            { name: "Announcements", threads: 12, posts: 48 },
                            { name: "General Discussion", threads: 156, posts: 1243 },
                            { name: "Support", threads: 89, posts: 432 },
                            { name: "Suggestions", threads: 64, posts: 287 },
                          ].map((category, index) => (
                            <div key={index} className="px-4 py-3 hover:bg-zinc-800/50">
                              <div className="font-medium text-white">{category.name}</div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-zinc-500">
                                  {category.threads} threads, {category.posts} posts
                                </span>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-zinc-400 hover:text-white">
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-red-400 hover:text-red-300"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border border-zinc-800 rounded-lg overflow-hidden">
                        <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white">Reported Content</div>
                        <div className="divide-y divide-zinc-800">
                          {[
                            { type: "Post", title: "Inappropriate language in support thread", reporter: "User123" },
                            { type: "Thread", title: "Spam thread in General Discussion", reporter: "Moderator" },
                          ].map((report, index) => (
                            <div key={index} className="px-4 py-3 hover:bg-zinc-800/50">
                              <div className="flex items-center">
                                <Badge className="mr-2 bg-red-500/20 text-red-400 border-red-500/30">
                                  {report.type}
                                </Badge>
                                <span className="font-medium text-white">{report.title}</span>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-zinc-500">Reported by {report.reporter}</span>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-zinc-400 hover:text-white">
                                    Review
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-green-400 hover:text-green-300"
                                  >
                                    Dismiss
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Media Management</CardTitle>
                  <CardDescription>Manage videos and media content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button asChild className="bg-[#6074f4] hover:bg-[#4a5fd0]">
                        <Link href="/admin/media/new">Add Media</Link>
                      </Button>
                      <Button variant="outline" className="border-zinc-700 text-zinc-400">
                        Manage Categories
                      </Button>
                    </div>

                    <div className="border border-zinc-800 rounded-lg overflow-hidden">
                      <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white grid grid-cols-4">
                        <div>Title</div>
                        <div>Category</div>
                        <div>Date Added</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y divide-zinc-800">
                        {[
                          { title: "Warzone Cheat Showcase", category: "Warzone", date: "2023-12-10" },
                          { title: "Valorant Aimbot Demo", category: "Valorant", date: "2023-12-05" },
                          { title: "HWID Spoofer Tutorial", category: "Tutorials", date: "2023-11-28" },
                          { title: "Fortnite ESP Features", category: "Fortnite", date: "2023-11-20" },
                        ].map((media, index) => (
                          <div key={index} className="px-4 py-3 text-sm grid grid-cols-4 items-center">
                            <div className="font-medium text-white">{media.title}</div>
                            <div className="text-zinc-400">{media.category}</div>
                            <div className="text-zinc-400">{new Date(media.date).toLocaleDateString()}</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-red-400">
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage products and categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Add Product</Button>
                      <Button variant="outline" className="border-zinc-700 text-zinc-400">
                        Manage Categories
                      </Button>
                    </div>

                    <div className="border border-zinc-800 rounded-lg overflow-hidden">
                      <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white grid grid-cols-5">
                        <div>Product</div>
                        <div>Category</div>
                        <div>Price</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y divide-zinc-800">
                        {[
                          { name: "Warzone Cheat", category: "Call of Duty", price: "$19.99", status: "Undetected" },
                          { name: "Valorant Cheat", category: "Valorant", price: "$24.99", status: "Undetected" },
                          {
                            name: "Apex Legends Cheat",
                            category: "Apex Legends",
                            price: "$19.99",
                            status: "Undetected",
                          },
                          { name: "Fortnite Cheat", category: "Fortnite", price: "$19.99", status: "Updating" },
                          { name: "HWID Spoofer", category: "Tools", price: "$29.99", status: "Undetected" },
                        ].map((product, index) => (
                          <div key={index} className="px-4 py-3 text-sm grid grid-cols-5 items-center">
                            <div className="font-medium text-white">{product.name}</div>
                            <div className="text-zinc-400">{product.category}</div>
                            <div className="text-zinc-400">{product.price}</div>
                            <div>
                              <Badge
                                className={`${
                                  product.status === "Undetected"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : product.status === "Detected"
                                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }`}
                              >
                                {product.status}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400">
                                Update Status
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>Manage product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Add Category</Button>

                    <div className="border border-zinc-800 rounded-lg overflow-hidden">
                      <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white grid grid-cols-3">
                        <div>Category</div>
                        <div>Products</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y divide-zinc-800">
                        {[
                          { name: "Call of Duty", products: 3 },
                          { name: "Valorant", products: 1 },
                          { name: "Apex Legends", products: 1 },
                          { name: "Fortnite", products: 1 },
                          { name: "Tools", products: 2 },
                          { name: "R6", products: 1 },
                          { name: "Black Ops 6", products: 0 },
                        ].map((category, index) => (
                          <div key={index} className="px-4 py-3 text-sm grid grid-cols-3 items-center">
                            <div className="font-medium text-white">{category.name}</div>
                            <div className="text-zinc-400">{category.products} products</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-red-400">
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                  <CardDescription>Update product detection status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-zinc-800 rounded-lg overflow-hidden">
                      <div className="bg-zinc-800 px-4 py-3 text-sm font-medium text-white grid grid-cols-4">
                        <div>Product</div>
                        <div>Current Status</div>
                        <div>Last Updated</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y divide-zinc-800">
                        {[
                          { name: "Warzone Cheat", status: "Undetected", updated: "2023-12-15" },
                          { name: "Valorant Cheat", status: "Undetected", updated: "2023-12-14" },
                          { name: "Apex Legends Cheat", status: "Undetected", updated: "2023-12-13" },
                          { name: "Fortnite Cheat", status: "Updating", updated: "2023-12-10" },
                          { name: "HWID Spoofer", status: "Undetected", updated: "2023-12-12" },
                        ].map((product, index) => (
                          <div key={index} className="px-4 py-3 text-sm grid grid-cols-4 items-center">
                            <div className="font-medium text-white">{product.name}</div>
                            <div>
                              <Badge
                                className={`${
                                  product.status === "Undetected"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : product.status === "Detected"
                                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }`}
                              >
                                {product.status}
                              </Badge>
                            </div>
                            <div className="text-zinc-400">{new Date(product.updated).toLocaleDateString()}</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-green-400">
                                Set Undetected
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-yellow-400">
                                Set Updating
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-red-400">
                                Set Detected
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Manage website configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName" className="text-white">
                        Site Name
                      </Label>
                      <Input id="siteName" defaultValue="SkyFall" className="bg-zinc-800 border-zinc-700 text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteDescription" className="text-white">
                        Site Description
                      </Label>
                      <Input
                        id="siteDescription"
                        defaultValue="Trusted, Reliable products"
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-white">
                        Contact Email
                      </Label>
                      <Input
                        id="contactEmail"
                        defaultValue="support@skyfallcheats.shop"
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discordLink" className="text-white">
                        Discord Link
                      </Label>
                      <Input
                        id="discordLink"
                        defaultValue="https://discord.gg/skyfall"
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="maintenanceMode" />
                      <Label htmlFor="maintenanceMode" className="text-white">
                        Maintenance Mode
                      </Label>
                    </div>

                    <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure payment methods and options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="creditCard" defaultChecked />
                          <Label htmlFor="creditCard" className="text-white">
                            Credit Card
                          </Label>
                        </div>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          Configure
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="paypal" defaultChecked />
                          <Label htmlFor="paypal" className="text-white">
                            PayPal
                          </Label>
                        </div>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          Configure
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="crypto" defaultChecked />
                          <Label htmlFor="crypto" className="text-white">
                            Cryptocurrency
                          </Label>
                        </div>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          Configure
                        </Button>
                      </div>
                    </div>

                    <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Save Payment Settings</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="twoFactor" />
                          <Label htmlFor="twoFactor" className="text-white">
                            Require Two-Factor Authentication for Admins
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="loginAttempts" defaultChecked />
                          <Label htmlFor="loginAttempts" className="text-white">
                            Limit Login Attempts
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passwordPolicy" className="text-white">
                          Password Policy
                        </Label>
                        <Select defaultValue="strong">
                          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectValue placeholder="Select password policy" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                            <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                            <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">Save Security Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
