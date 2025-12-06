import Link from "next/link";
import myItems from "../../../../lib/items.json";
import { Button } from "@/components/ui/button";
import { Edit, Eye, PlusCircle, Trash2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold">My Items</h1>
          <p className="text-gray-600">Manage your listed items</p>
        </div>
        <Link href="/items/add">
          <Button>
            <PlusCircle className="size-4 mr-2" />
            Add Item
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myItems.map((item) => (
          <Card key={item.id} className="py-0">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={item.image?.[0]}
                alt={item.title}
                className="size-full object-cover"
              />
              <Badge className="absolute top-2 right-2">{item.category}</Badge>
              <Badge
                className="absolute top-2 left-2"
                variant={item.available ? "default" : "secondary"}
              >
                {item.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="mb-2 text-base sm:text-lg">{item.title}</h3>
              <p className="mb-2 text-xs sm:text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3">
                <span>{item.condition}</span>
                <span>• {item.views ?? 0} views</span>
                <span>• {item.rentals ?? 0} rentals</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs sm:text-sm">
                    {(
                      item.reviews?.reduce(
                        (sum, review) => sum + review.rating,
                        0
                      ) / item.reviews?.length
                    )?.toFixed(1) ?? 0}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400">
                    ({item.reviews?.length ?? 0})
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-indigo-600">
                  Tk{item.price}/{item.priceUnit}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/items/${item.id}`}>
                    <Eye className="size-4 mr-2" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/items/edit/${item.id}`}>
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="size-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this item? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
