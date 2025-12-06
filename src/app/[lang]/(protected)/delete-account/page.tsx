"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DeleteAccountPage = () => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    alert("Account deletion is not implemented in this demo.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="size-4 mr-2" />
            Back to Settings
          </Button>
        </Link>
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="size-5" />
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">
              Warning: This action cannot be undone
            </h3>
            <p className="text-red-700 text-sm">
              Deleting your account will permanently remove all your data,
              including:
            </p>
            <ul className="list-disc list-inside text-red-700 text-sm mt-2 space-y-1">
              <li>Your profile and personal information</li>
              <li>All your item listings</li>
              <li>Rental history and transactions</li>
              <li>Messages and conversations</li>
              <li>Reviews and ratings</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Before deleting your account, please consider:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Download any important data you want to keep</li>
              <li>Cancel any active rentals</li>
              <li>Settle any outstanding payments</li>
              <li>Transfer ownership of items if needed</li>
            </ul>
          </div>

          {!isConfirming ? (
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setIsConfirming(true)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                I understand, proceed to delete
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-red-800">
                Are you absolutely sure you want to delete your account?
              </p>
              <div className="flex gap-4">
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Yes, permanently delete my account
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsConfirming(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteAccountPage;
