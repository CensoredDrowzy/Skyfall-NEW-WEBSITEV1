"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ShoppingCart,
  Settings,
  Clock,
  Download,
  Bell,
  Key,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data for purchases
const purchases = [
  {
    id: "INV-001",
    product: "Warzone Cheat",
    date: "2023-12-15",
    status: "active",
    price: "$19.99",
    licenseKey: "WZCH-XXXX-XXXX-XXXX",
    expiresAt: "2024-12-15",
  },
  {
    id: "INV-002",
    product: "Valorant Cheat",
    date: "2023-11-20",
    status: "active",
    price: "$24.99",
    licenseKey: "VALCH-XXXX-XXXX-XXXX",
    expiresAt: "2024-11-20",
  },
]

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "License Activated",
    message: "Your Warzone Cheat license has been activated successfully.",
    date: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "Product Update",
    message: "Valorant Cheat has been updated to version 2.4.0. Please download the latest version.",
    date: "1 day ago",
    read: true,
    type: "info",
  },
  {
    id: 3,
    title: "Payment Successful",
    message: "Your payment of $24.99 for Valorant Cheat has been processed successfully.",
    date: "3 days ago",
    read: true,
    type: "success",
  },
]

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-[#6074f4] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400">Loading dashboard...</p>
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
            <Badge className="mb-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">
              DASHBOARD
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Welcome back, {user.name}
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Manage your products, licenses, and account settings.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid grid-cols-4 md:w-[600px] mx-auto bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Products
              </TabsTrigger>
              <TabsTrigger value="licenses" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Licenses
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white"
              >
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* User Profile Card */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your account information and settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                      <AvatarFallback className="bg-[#6074f4] text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-4 text-center md:text-left">
                      <div>
                        <h3 className="text-xl font-bold text-white">{user.name}</h3>
                        <p className="text-zinc-400">{user.email}</p>
                        <div className="flex items-center justify-center md:justify-start mt-1">
                          <Badge className="bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">
                            {user.role === "admin" ? "Administrator" : "Member"}
                          </Badge>
                          <span className="text-xs text-zinc-500 ml-2">Joined Dec 2023</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Button asChild variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          <Link href="/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Account Settings
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          <Link href="/purchases">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Purchase History
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5 text-[#6074f4]" />
                      Active Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{purchases.length}</div>
                    <p className="text-zinc-400 text-sm">Products with active licenses</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-[#6074f4]" />
                      Next Expiration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">20 Days</div>
                    <p className="text-zinc-400 text-sm">Until your next license expires</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-[#6074f4]" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{notifications.filter((n) => !n.read).length}</div>
                    <p className="text-zinc-400 text-sm">Unread notifications</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Purchases */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Purchases</CardTitle>
                    <Button asChild variant="ghost" size="sm" className="text-[#6074f4]">
                      <Link href="/purchases">View All</Link>
                    </Button>
                  </div>
                  <CardDescription>Your most recent product purchases and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-800/50 rounded-lg"
                      >
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <h4 className="font-medium text-white">{purchase.product}</h4>
                            <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                              {purchase.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-zinc-400">
                            Purchased on {new Date(purchase.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                          <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                            <Key className="mr-2 h-4 w-4" />
                            View License
                          </Button>
                          <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>All products you have purchased.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="border border-zinc-800 rounded-lg overflow-hidden">
                        <div className="bg-zinc-800/50 p-4 flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="font-bold text-white">{purchase.product}</h3>
                            <p className="text-sm text-zinc-400">License: {purchase.licenseKey}</p>
                          </div>
                          <Badge className="w-fit mt-2 md:mt-0 bg-green-500/20 text-green-400 border-green-500/30">
                            {purchase.status}
                          </Badge>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-zinc-500">Purchase Date</p>
                              <p className="font-medium text-white">{new Date(purchase.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500">Expiration Date</p>
                              <p className="font-medium text-white">
                                {new Date(purchase.expiresAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500">Price</p>
                              <p className="font-medium text-white">{purchase.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">
                              <Download className="mr-2 h-4 w-4" />
                              Download Latest Version
                            </Button>
                            <Button variant="outline" className="border-zinc-700 text-zinc-400">
                              <Key className="mr-2 h-4 w-4" />
                              View License Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Licenses Tab */}
            <TabsContent value="licenses" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>License Keys</CardTitle>
                  <CardDescription>Manage your product license keys.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="p-4 bg-zinc-800/50 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="font-bold text-white">{purchase.product}</h3>
                            <div className="flex items-center mt-1">
                              <p className="text-sm font-mono bg-zinc-900 px-2 py-1 rounded text-zinc-300">
                                {purchase.licenseKey}
                              </p>
                              <Button variant="ghost" size="sm" className="ml-2 h-7 text-zinc-400">
                                Copy
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 text-right">
                            <p className="text-sm text-zinc-500">Expires</p>
                            <p className="font-medium text-white">
                              {new Date(purchase.expiresAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-zinc-700 flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M12 2v20" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            Renew License
                          </Button>
                          <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                              <path d="M3 3v5h5" />
                              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                              <path d="M16 21h5v-5" />
                            </svg>
                            Transfer License
                          </Button>
                          <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Report Issue
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Notifications</CardTitle>
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                      Mark All as Read
                    </Button>
                  </div>
                  <CardDescription>Stay updated with important information about your products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg flex ${
                          notification.read ? "bg-zinc-800/30" : "bg-zinc-800/50 border-l-2 border-[#6074f4]"
                        }`}
                      >
                        <div className="mr-4 mt-1">
                          {notification.type === "success" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : notification.type === "warning" ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          ) : notification.type === "error" ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <Bell className="h-5 w-5 text-[#6074f4]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${notification.read ? "text-zinc-300" : "text-white"}`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-zinc-500">{notification.date}</span>
                          </div>
                          <p className={`text-sm mt-1 ${notification.read ? "text-zinc-500" : "text-zinc-400"}`}>
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    ))}
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
