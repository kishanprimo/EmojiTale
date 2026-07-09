"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("emotale_admin_token");

    if (!token) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-[280px]">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="pt-[70px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;