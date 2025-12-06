"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { User, Upload } from "lucide-react";
import toast from "react-hot-toast";
import items from "@/lib/items.json";

// Mock user data based on owners in items
const getUserProfile = (userId: string) => {
  const owners = [...new Set(items.map((item) => item.owner))];
  const ownerName = owners[parseInt(userId) - 1] || owners[0]; // Default to first owner if invalid id

  return {
    id: parseInt(userId),
    name: ownerName,
    email: `${ownerName.toLowerCase().replace(" ", "")}@example.com`,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    location: "Dhaka, Bangladesh",
    phone: "+880 1234 567890",
    bio: `Professional with experience in various fields. Love sharing equipment with fellow creatives.`,
  };
};

export default function ProfileEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const userId = id as string;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    const userProfile = getUserProfile(userId);
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      location: userProfile.location,
      phone: userProfile.phone,
      bio: userProfile.bio,
    });
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to backend
    toast.success("Profile updated successfully!");
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Edit Profile</h1>
        <p className="text-gray-600">Update your profile information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <ImageWithFallback
                  src={getUserProfile(userId).avatar}
                  alt={formData.name}
                  className="size-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div>
                <Button type="button" variant="outline">
                  <Upload className="size-4 mr-2" />
                  Upload Photo
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  JPG or PNG. Max size 2MB.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/profile/${userId}`)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
