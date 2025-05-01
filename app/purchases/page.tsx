"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Key, FileText, RefreshCw } from "lucide-react"

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
    paymentMethod: "Credit Card",
    downloadAvailable: true,
  },
  {
    id: "INV-002",
    product: "Valorant Cheat",
    date: "2023-11-20",
    status: "active",
    price: "$24.99",
    licenseKey: "VALCH-XXXX-XXXX-XXXX",
    expiresAt: "2024-11-20",
    paymentMethod: "PayPal",
    downloadAvailable: true,
  },
  {
    id: "INV-003",
    product: "Apex Legends Cheat",
    date: "2023-10-05",
    status: "expired",
    price: "$19.99",
    licenseKey: "APXCH-XXXX-XXXX-XXXX",
    expiresAt: "2023-11-05",
    paymentMethod: "Cryptocurrency",
    downloadAvailable: false,
  },
]

// Mock data for invoices
const invoices = [
  {
    id: "INV-001",
    date: "2023-12-15",
    amount: "$19.99",
    status: "paid",
    product: "Warzone Cheat",
  },
  {
    id: "INV-002",
    date: "2023-11-20",
    amount: "$24.99",
    status: "paid",
    product: "Valorant Cheat",
  },
  {
    id: "INV-003",
    date: "2023-10-05",
    amount: "$19.99",
    status: "paid",
    product: "Apex Legends Cheat",
  },
]

export default function PurchasesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/purchases")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-[#6074f4] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400">Loading purchases...</p>
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
              PURCHASES
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Your Purchases</h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Manage your product purchases, licenses, and invoices.
            </p>
          </div>
        </div>
      </section>

      {/* Purchases Content */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <Tabs defaultValue="products" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:w-[400px] mx-auto bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger value="products" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Products
              </TabsTrigger>
              <TabsTrigger value="invoices" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Invoices
              </TabsTrigger>
            </TabsList>

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
                            <p className="text-sm text-zinc-400">Order ID: {purchase.id}</p>
                          </div>
                          <Badge
                            className={`w-fit mt-2 md:mt-0 ${
                              purchase.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {purchase.status === "active" ? "Active" : "Expired"}
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-zinc-500">License Key</p>
                              <p className="font-medium text-white font-mono bg-zinc-900 px-2 py-1 rounded mt-1">
                                {purchase.licenseKey}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500">Payment Method</p>
                              <p className="font-medium text-white">{purchase.paymentMethod}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {purchase.downloadAvailable ? (
                              <Button className="bg-[#6074f4] hover:bg-[#4a5fd0]">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            ) : (
                              <Button disabled className="bg-zinc-700 cursor-not-allowed">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            )}
                            <Button variant="outline" className="border-zinc-700 text-zinc-400">
                              <Key className="mr-2 h-4 w-4" />
                              License Details
                            </Button>
                            {purchase.status === "expired" ? (
                              <Button variant="outline" className="border-zinc-700 text-zinc-400">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Renew License
                              </Button>
                            ) : (
                              <Button variant="outline" className="border-zinc-700 text-zinc-400">
                                <FileText className="mr-2 h-4 w-4" />
                                View Invoice
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Your Invoices</CardTitle>
                  <CardDescription>All invoices for your purchases.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase text-zinc-400 border-b border-zinc-800">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Invoice ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b border-zinc-800">
                            <td className="px-6 py-4 font-medium text-white">{invoice.id}</td>
                            <td className="px-6 py-4 text-zinc-300">{invoice.product}</td>
                            <td className="px-6 py-4 text-zinc-300">{new Date(invoice.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-zinc-300">{invoice.amount}</td>
                            <td className="px-6 py-4">
                              <Badge
                                className={
                                  invoice.status === "paid"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {invoice.status === "paid" ? "Paid" : "Pending"}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                                <FileText className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
