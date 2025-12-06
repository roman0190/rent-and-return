"use client";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SiderbarContext";
import {
  Home,
  ListChecks,
  MessageSquare,
  Package,
  PlusCircle,
  Settings,
  Shield,
  User,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  //they must be inside Sidebarcontext
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  //inside Auth Context
  const { isAdmin } = useAuth();

  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Browse Items", href: "/items", icon: Package },
    { name: "Add Item", href: "/items/add-item", icon: PlusCircle },
    { name: "My Items", href: "/my-items", icon: ListChecks },
    { name: "My Rentals", href: "/my-rentals", icon: ListChecks },
    { name: "Messages", href: "/chat", icon: MessageSquare },
    { name: "Payment History", href: "/payment-history", icon: CreditCard },
    { name: "Profile", href: "/profile/1", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const adminNavigation = [
    { name: "Admin Dashboard", href: "/admin", icon: Shield },
    { name: "User Management", href: "/admin/users", icon: User },
    { name: "Item Management", href: "/admin/items", icon: Package },
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
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
              >
                <item.icon className="size-5" />
                <span>{item.name}</span>
                {item.name === "Messages" && (
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
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                          ${
                            isActive
                              ? "bg-indigo-50 text-indigo-600"
                              : "text-gray-700 hover:bg-gray-100"
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
