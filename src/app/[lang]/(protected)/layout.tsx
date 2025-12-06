"use client";
import Header from "@/components/layout/protected/Header";
import Sidebar from "@/components/layout/protected/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SiderbarContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { email, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const shouldRedirect = !email && !isLoading && !pathname.includes("/home");

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/login");
    }
  }, [shouldRedirect, router]);

  if (isLoading || shouldRedirect) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="bg-gray-50">
        <Header />
        <div className="flex">
          {email && <Sidebar />}
          <main className={`flex-1 p-4 lg:p-8 ${!email ? "w-full" : ""}`}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
