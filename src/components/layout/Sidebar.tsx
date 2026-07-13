"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Mail,
  Gem,
  Image as ImageIcon,
  Smile,
  Palette,
  BookOpen,
  FolderOpen,
  Bell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
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

      {
        name: "Plan & XP",
        href: "/plans",
        icon: Gem,
      },
    ],
  },
];
type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function NotificationMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const active = pathname.startsWith("/notifications");

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-all ${
          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <Bell size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
          Admin Notification
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="ml-9 border-l border-gray-200">
          <Link href="/notifications/all" className={`block py-2 pl-6 text-sm ${pathname === "/notifications/all" ? "font-semibold text-[#2563EB]" : "text-[#374151]"}` }>
            All Notifications
          </Link>
          <Link href="/notifications/add" className={`block py-2 pl-6 text-sm ${pathname === "/notifications/add" ? "font-semibold text-[#2563EB]" : "text-[#374151]"}`}>
            Add Notification
          </Link>
        </div>
      )}
    </div>
  );
}

function StoryCategoryMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const active = pathname.startsWith("/story-category");

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-all ${
          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <FolderOpen size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
          Admin Story Category
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="ml-9 border-l border-gray-200">
          <Link href="/story-category/all" className={`block py-2 pl-6 text-sm ${pathname === "/story-category/all" ? "font-semibold text-[#2563EB]" : "text-[#374151]"}` }>
            Story Category List
          </Link>
          <Link href="/story-category/add" className={`block py-2 pl-6 text-sm ${pathname === "/story-category/add" ? "font-semibold text-[#2563EB]" : "text-[#374151]"}`}>
            Add Story Category
          </Link>
        </div>
      )}
    </div>
  );
}

function AdminStoryMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const active = pathname.startsWith("/admin-story");

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-all ${
          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <BookOpen size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
          Admin Story
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="ml-9 border-l border-gray-200">
          <Link href="/admin-story/all" className={`block py-2 pl-6 text-sm ${pathname === "/admin-story/all" ? "font-semibold text-[#2563EB]" : "text-[#374151]"}` }>
            All Stories
          </Link>
          <Link href="/admin-story/generate" className={`block py-2 pl-6 text-sm ${pathname === "/admin-story/generate" ? "font-semibold text-[#2563EB]" : "text-[#374151]"}`}>
            Generate Story
          </Link>
        </div>
      )}
    </div>
  );
}

function ThemeMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const active = pathname.startsWith("/themes");

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-all ${
          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <Palette size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
          Themes
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="ml-9 border-l border-gray-200">
          <Link
            href="/themes"
            className={`block py-2 pl-6 text-sm ${
              pathname === "/themes" ? "font-semibold text-[#2563EB]" : "text-[#374151]"
            }`}
          >
            All Themes
          </Link>
          <Link
            href="/themes/add"
            className={`block py-2 pl-6 text-sm ${
              pathname === "/themes/add" ? "font-semibold text-[#2563EB]" : "text-[#374151]"
            }`}
          >
            Add Theme
          </Link>
        </div>
      )}
    </div>
  );
}

function EmojiMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const active = pathname.startsWith("/emojis");

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-all ${
          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <Smile size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
          Emoji
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="ml-9 border-l border-gray-200">
          <Link
            href="/emojis"
            className={`block py-2 pl-6 text-sm ${
              pathname === "/emojis" ? "font-semibold text-[#2563EB]" : "text-[#374151]"
            }`}
          >
            Emoji List
          </Link>
          <Link
            href="/emojis/add"
            className={`block py-2 pl-6 text-sm ${
              pathname === "/emojis/add" ? "font-semibold text-[#2563EB]" : "text-[#374151]"
            }`}
          >
            Add Emoji
          </Link>
        </div>
      )}
    </div>
  );
}

function EmojiCategoryMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const active = pathname.startsWith("/emoji-categories");

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-all ${
          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <Smile size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
          Emoji Categories
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="ml-9 border-l border-gray-200">
          <Link
            href="/emoji-categories"
            className={`block py-2 pl-6 text-sm ${
              pathname === "/emoji-categories" ? "font-semibold text-[#2563EB]" : "text-[#374151]"
            }`}
          >
            All Categories
          </Link>
          <Link
            href="/emoji-categories/add"
            className={`block py-2 pl-6 text-sm ${
              pathname === "/emoji-categories/add" ? "font-semibold text-[#2563EB]" : "text-[#374151]"
            }`}
          >
            Add Category
          </Link>
        </div>
      )}
    </div>
  );
}

function AvatarMenu() {

  const pathname = usePathname();

  const [open, setOpen] = React.useState(true);

  const active =
    pathname.startsWith("/avatar");

  return (

    <div>

      <button
        onClick={() => setOpen(!open)}
        className={`
        relative
        flex
        w-full
        items-center
        justify-between
        px-6
        py-3
        text-sm
        font-medium
        transition-all
        ${active
            ? "bg-[#EEF4FF] text-[#2563EB]"
            : "text-[#374151] hover:bg-gray-50"
          }
      `}
      >

        <div className="flex items-center gap-3">

          <ImageIcon
            size={20}
            className={
              active
                ? "text-[#2563EB]"
                : "text-gray-500"
            }
          />

          Avatar

        </div>

        {open ? (
          <ChevronDown size={18} />
        ) : (
          <ChevronRight size={18} />
        )}

      </button>

      {open && (

        <div className="ml-9 border-l border-gray-200">

          <Link
            href="/avatar"
            className={`
            block
            py-2
            pl-6
            text-sm
            ${pathname === "/avatar"
                ? "font-semibold text-[#2563EB]"
                : "text-[#374151]"
              }
          `}
          >
            Avatar List
          </Link>

          <Link
            href="/avatar/add"
            className={`
            block
            py-2
            pl-6
            text-sm
            ${pathname === "/avatar/add"
                ? "font-semibold text-[#2563EB]"
                : "text-[#374151]"
              }
          `}
          >
            Add Avatar
          </Link>

        </div>

      )}

    </div>

  );

}
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
            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
                AVATAR
              </p>
              <AvatarMenu />
            </div>

            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
                EMOJI
              </p>
              <EmojiCategoryMenu />
            </div>
            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
                EMOJI LIST
              </p>
              <EmojiMenu />
            </div>
            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
                THEMES
              </p>
              <ThemeMenu />
            </div>
            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
                ADMIN
              </p>
              <StoryCategoryMenu />
              <AdminStoryMenu />
              <NotificationMenu />
            </div>
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