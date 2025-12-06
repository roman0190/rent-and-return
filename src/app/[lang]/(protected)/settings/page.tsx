"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Lock,
  Globe,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const SettingPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="mb-4">Account Settings</h2>

          <Link href="/change-password">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Lock className="size-5 text-indigo-600" />
                </div>
                <div>
                  <p>Change Password</p>
                  <p className="text-sm text-gray-600">
                    Update your account password
                  </p>
                </div>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </div>
          </Link>

          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="size-5 text-green-600" />
              </div>
              <div>
                <p>Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bell className="size-5 text-blue-600" />
            </div>
            <h2>Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">
                  Receive notifications via email
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="rental-updates">Rental Updates</Label>
                <p className="text-sm text-gray-600">
                  Get updates on your rentals
                </p>
              </div>
              <Switch id="rental-updates" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messages">Messages</Label>
                <p className="text-sm text-gray-600">
                  Notifications for new messages
                </p>
              </div>
              <Switch id="messages" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reviews">Reviews</Label>
                <p className="text-sm text-gray-600">
                  When someone reviews your item
                </p>
              </div>
              <Switch id="reviews" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing">Marketing Emails</Label>
                <p className="text-sm text-gray-600">
                  Receive promotional content
                </p>
              </div>
              <Switch id="marketing" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="mb-4">Preferences</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="language" className="mb-2 block">
                Language
              </Label>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Globe className="size-5 text-purple-600" />
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="currency" className="mb-2 block">
                Currency
              </Label>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <CreditCard className="size-5 text-yellow-600" />
                </div>
                <Select defaultValue="usd">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="bdt">BDT (৳)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <HelpCircle className="size-5 text-orange-600" />
            </div>
            <h2>Help & Support</h2>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between">
              Help Center
              <ChevronRight className="size-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-between"
            >
              <Link href="/terms-of-service">
                Terms of Service
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-between"
            >
              <Link href="/privacy-policy">
                Privacy Policy
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-between text-red-600 hover:text-red-700"
            >
              <Link href="/delete-account">
                Delete Account
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingPage;
