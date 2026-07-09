"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Mail } from "lucide-react";
import Image from "next/image";

const menuGroups = [
  {
    heading: "DASHBOARD",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    heading: "USER MANAGEMENT",
    items: [
      {
        name: "All Users",
        href: "/users",
        icon: Users,
      },
      {
        name: "Newsletter List",
        href: "/newsletters",
        icon: Mail,
      },
    ],
  },
];

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed
        top-0
        left-0
        z-40
        h-screen
        w-[280px]
        border-r
        border-gray-200
        bg-white
        transition-transform
        duration-300
        lg:translate-x-0
        ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
    `}
      >
        {/* Logo */}
        <div className="flex h-[70px] items-center border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/Login/login_logo.png"
              alt="Emotale Logo"
              width={180}
              height={48}
              priority
            />
          </div>
        </div>

        {/* Menu */}
        <div
          className="
          h-[calc(100vh-70px)]
          overflow-y-auto
          py-6
          custom-scrollbar
        "
        >
          <nav className="space-y-8">
            {menuGroups.map((group) => (
              <div key={group.heading}>
                <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
                  {group.heading}
                </p>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                        relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all
                        ${active
                            ? "bg-[#EEF4FF] text-[#2563EB]"
                            : "text-[#374151] hover:bg-gray-50"
                          }
                      `}
                      >
                        {active && (
                          <span className="absolute left-0 top-0 h-full w-1 rounded-r-xl bg-[#2563EB]" />
                        )}

                        <Icon
                          size={20}
                          className={
                            active
                              ? "text-[#2563EB]"
                              : "text-gray-500"
                          }
                        />

                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Scrollbar Style */}
        <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 999px;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}
        </style>
      </aside>
    </>
  );
};

export default Sidebar;