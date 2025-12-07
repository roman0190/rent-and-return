"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SiderbarContext";
import { Bell, LogOut, Menu, Package, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Header() {
  const tCommon = useTranslations("common");
  const tAuth = useTranslations("auth");
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { logout, email } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 h-20 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {email && (
            <Button
              variant={"ghost"}
              size={"sm"}
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          )}
          <Link href={"/"} className="flex flex-col items-center">
            <Image
              src="/logo/main_logo.png"
              alt="Rent & Return Logo"
              width={208}
              height={208}
              className="w-52 h-10 object-contain"
            />
            <div className="text-[0.70rem] text-grey-500 font-bold">
              {tCommon("tagline")}
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {email ? (
            <>
              <Link href={"/notifications"}>
                <Button variant={"ghost"} size={"sm"} className="relative">
                  <Bell className="size-5" />
                  <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="size-5" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="default" size="sm">
                  {tAuth("login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="sm">
                  {tAuth("register")}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
