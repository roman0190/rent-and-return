"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const TermsOfServicePage = () => {
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

      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Last updated: December 7, 2025</p>

          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Rent & Return, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>

            <h3 className="font-semibold">2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the
              materials on Rent & Return for personal, non-commercial transitory
              viewing only.
            </p>

            <h3 className="font-semibold">3. User Responsibilities</h3>
            <p>
              Users are responsible for maintaining the confidentiality of their
              account and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>

            <h3 className="font-semibold">4. Prohibited Uses</h3>
            <p>
              You may not use our products for any illegal or unauthorized
              purpose. You must not violate any laws in your jurisdiction.
            </p>

            <h3 className="font-semibold">5. Item Listings and Rentals</h3>
            <p>
              All item listings must be accurate and legal. Renters and owners
              must comply with all rental agreements and return policies.
            </p>

            <h3 className="font-semibold">6. Payment Terms</h3>
            <p>
              All payments are processed securely. Refunds will be issued
              according to our refund policy for eligible transactions.
            </p>

            <h3 className="font-semibold">7. Limitation of Liability</h3>
            <p>
              In no event shall Rent & Return or its suppliers be liable for any
              damages arising out of the use or inability to use the materials
              on our platform.
            </p>

            <h3 className="font-semibold">8. Termination</h3>
            <p>
              We may terminate or suspend access to our service immediately,
              without prior notice, for any reason whatsoever.
            </p>

            <h3 className="font-semibold">9. Governing Law</h3>
            <p>
              These terms shall be interpreted and governed by the laws of
              Bangladesh, without regard to its conflict of law provisions.
            </p>

            <h3 className="font-semibold">10. Changes to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. Continued
              use of the platform constitutes acceptance of the new terms.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
