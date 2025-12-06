'use client'
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1
            className="text-gray-900 mb-4"
            style={{ fontSize: "120px", lineHeight: "1" }}
          >
            404
          </h1>
          <h2 className="text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been removed or the URL might be incorrect.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="size-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/items">
            <Button size="lg" variant="outline">
              <Search className="size-5 mr-2" />
              Browse Items
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
