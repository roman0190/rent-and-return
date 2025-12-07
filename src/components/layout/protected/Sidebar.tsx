"use client";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SiderbarContext";
import {
  Wrench,
  Settings,
  MessageSquare,
  Package,
  Plus,
  Hammer,
  Shield,
  Users,
  Wallet,
  LayoutGrid,
  Boxes,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const Sidebar = () => {
  const t = useTranslations("navigation");
  //they must be inside Sidebarcontext
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  //inside Auth Context
  const { isAdmin } = useAuth();

  const pathname = usePathname();

  const navigation = [
    { name: t("home"), href: "/home", icon: LayoutGrid },
    { name: t("browseItems"), href: "/items", icon: Package },
    { name: t("addItem"), href: "/items/add-item", icon: Plus },
    { name: t("myItems"), href: "/my-items", icon: Boxes },
    { name: t("myRentals"), href: "/my-rentals", icon: Hammer },
    { name: t("messages"), href: "/chat", icon: MessageSquare },
    { name: t("paymentHistory"), href: "/payment-history", icon: Wallet },
    { name: t("profile"), href: "/profile/1", icon: Users },
    { name: t("settings"), href: "/settings", icon: Settings },
  ];

  const adminNavigation = [
    { name: t("adminDashboard"), href: "/admin", icon: Shield },
    { name: t("userManagement"), href: "/admin/users", icon: Wrench },
    { name: t("itemManagement"), href: "/admin/items", icon: Package },
  ];

  return (
    <div className="flex">
      <aside
        className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900"
                    }
                  `}
              >
                <item.icon className="size-5" />
                <span>{item.name}</span>
                {item.name === t("messages") && (
                  <Badge variant="secondary" className="ml-auto">
                    3
                  </Badge>
                )}
              </Link>
            );
          })}
          {isAdmin && (
            <>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-3 text-xs text-gray-500 mb-2">Admin</p>
                {adminNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                          ${
                            isActive
                              ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md"
                              : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900"
                          }
                        `}
                    >
                      <item.icon className="size-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
