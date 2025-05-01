"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const { user, isLoading, updateUserProfile, changePassword, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [productUpdates, setProductUpdates] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/settings")
    }

    if (user) {
      setName(user.name || "")
      setEmail(user.email)
    }
  }, [user, isLoading, router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateUserProfile({ name, email })
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)

    try {
      await changePassword(currentPassword, newPassword)
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast({
        title: "Password change failed",
        description: "There was an error changing your password. Please check your current password and try again.",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleNotificationSettingsUpdate = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-[#6074f4] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400">Loading settings...</p>
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
            <Badge className="mb-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">SETTINGS</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Account Settings</h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Manage your profile, security, and notification preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Content */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid grid-cols-3 md:w-[500px] mx-auto bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white">
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-[#6074f4] data-[state=active]:text-white"
              >
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account profile information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                        <AvatarFallback className="bg-[#6074f4] text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-lg font-medium text-white">Profile Picture</h3>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          <Button type="button" variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                            Upload New
                          </Button>
                          <Button type="button" variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                            Remove
                          </Button>
                        </div>
                        <p className="text-xs text-zinc-500">Recommended: Square image, at least 300x300px</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Display Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button type="submit" className="bg-[#6074f4] hover:bg-[#4a5fd0]" disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>View your account details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">Account Type</p>
                        <p className="font-medium text-white">
                          {user.role === "admin" ? "Administrator" : "Standard User"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Account ID</p>
                        <p className="font-medium text-white">{user.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Joined Date</p>
                        <p className="font-medium text-white">December 15, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Last Login</p>
                        <p className="font-medium text-white">Today at 10:30 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-white">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-zinc-500 hover:text-white"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-white">
                          New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-zinc-500 hover:text-white"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-zinc-500 hover:text-white"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button type="submit" className="bg-[#6074f4] hover:bg-[#4a5fd0]" disabled={isChangingPassword}>
                          {isChangingPassword ? "Changing Password..." : "Change Password"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-base font-medium text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-zinc-400">Add an extra layer of security to your account.</p>
                      </div>
                      <Button variant="outline" className="border-zinc-700 text-zinc-400">
                        Enable
                      </Button>
                    </div>
                    <Separator className="bg-zinc-800" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-base font-medium text-white">Active Sessions</h4>
                        <p className="text-sm text-zinc-400">Manage your active login sessions.</p>
                      </div>
                      <Button variant="outline" className="border-zinc-700 text-zinc-400">
                        Manage
                      </Button>
                    </div>
                    <Separator className="bg-zinc-800" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-base font-medium text-white">Login History</h4>
                        <p className="text-sm text-zinc-400">View your recent login activity.</p>
                      </div>
                      <Button variant="outline" className="border-zinc-700 text-zinc-400">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-8">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-base font-medium text-white">Email Notifications</h4>
                        <p className="text-sm text-zinc-400">Receive notifications via email.</p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        className="data-[state=checked]:bg-[#6074f4]"
                      />
                    </div>
                    <Separator className="bg-zinc-800" />
                    <div className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-base font-medium text-white">Product Updates</h4>
                        <p className="text-sm text-zinc-400">Get notified about product updates and new releases.</p>
                      </div>
                      <Switch
                        checked={productUpdates}
                        onCheckedChange={setProductUpdates}
                        className="data-[state=checked]:bg-[#6074f4]"
                      />
                    </div>
                    <Separator className="bg-zinc-800" />
                    <div className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-base font-medium text-white">Security Alerts</h4>
                        <p className="text-sm text-zinc-400">Receive alerts about security-related events.</p>
                      </div>
                      <Switch
                        checked={securityAlerts}
                        onCheckedChange={setSecurityAlerts}
                        className="data-[state=checked]:bg-[#6074f4]"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="button"
                        className="bg-[#6074f4] hover:bg-[#4a5fd0]"
                        onClick={handleNotificationSettingsUpdate}
                      >
                        Save Preferences
                      </Button>
                    </div>
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
