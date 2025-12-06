import { Card, CardContent } from "@/components/ui/card";
import { Package, Star, TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
  const statsMeta = [
    {
      key: "activeItems",
      label: "Active Items",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      key: "totalUsers",
      label: "Total Users",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      key: "rentalsToday",
      label: "Rentals Today",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      key: "avgRating",
      label: "Avg Rating",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  // Value object
  const statsValue = {
    activeItems: "2,345",
    totalUsers: "1,234",
    rentalsToday: "89",
    avgRating: "4.8",
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsMeta.map((stat) => {
        const Icon = stat.icon;
        const value = statsValue[stat.key as keyof typeof statsValue];
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="size-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsSection;
