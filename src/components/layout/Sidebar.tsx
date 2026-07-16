"use client";

import React, { useEffect, useRef } from "react";
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
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const menuGroups = [
  {
    heading: "DASHBOARD",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "USER MANAGEMENT",
    items: [
      { name: "All Users", href: "/users", icon: Users },
      { name: "Newsletter List", href: "/newsletters", icon: Mail },
      { name: "Subscription Plan", href: "/plans", icon: Gem },
      { name: "XP Plan", href: "/plans_xp", icon: Gem },
    ],
  },
];

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Generic collapsible menu — open state driven by whether pathname matches prefix
function CollapseMenu({
  label,
  icon: Icon,
  prefix,
  links,
}: {
  label: string;
  icon: React.ElementType;
  prefix: string;
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  const active = pathname.startsWith(prefix);
  // Always open if active, otherwise collapsed
  const [open, setOpen] = React.useState(active);

  // Re-open when navigating into this section
  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`relative flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-all ${
          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
          {label}
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="ml-9 border-l border-gray-200">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 pl-6 text-sm ${
                pathname === link.href ? "font-semibold text-[#2563EB]" : "text-[#374151]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminConfigMenu() {
  const pathname = usePathname();
  const active = pathname.startsWith("/admin-config");
  return (
    <Link
      href="/admin-config/all"
      className={`relative flex w-full items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
        active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
      }`}
    >
      {active && <span className="absolute left-0 top-0 h-full w-1 rounded-r-xl bg-[#2563EB]" />}
      <Settings size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
      Admin Configurations
    </Link>
  );
}

const SCROLL_KEY = "sidebar_scroll";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Restore scroll position on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
    }
  }, []);

  // Save scroll position on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop));
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  // Scroll active item into view without jumping to top
  useEffect(() => {
    if (!activeRef.current || !scrollRef.current) return;
    const container = scrollRef.current;
    const item = activeRef.current;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    // Only scroll if item is outside visible area
    if (itemTop < containerTop || itemBottom > containerBottom) {
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-[280px] border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[70px] items-center border-b border-gray-100 px-6">
          <Image src="/Login/login_logo.png" alt="Emotale Logo" width={180} height={48} priority />
        </div>

        {/* Menu */}
        <div ref={scrollRef} className="h-[calc(100vh-70px)] overflow-y-auto py-6 custom-scrollbar">
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
                        ref={active ? activeRef : undefined}
                        className={`relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                          active ? "bg-[#EEF4FF] text-[#2563EB]" : "text-[#374151] hover:bg-gray-50"
                        }`}
                      >
                        {active && <span className="absolute left-0 top-0 h-full w-1 rounded-r-xl bg-[#2563EB]" />}
                        <Icon size={20} className={active ? "text-[#2563EB]" : "text-gray-500"} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">AVATAR</p>
              <CollapseMenu label="Avatar" icon={ImageIcon} prefix="/avatar" links={[
                { href: "/avatar", label: "Avatar List" },
                { href: "/avatar/add", label: "Add Avatar" },
              ]} />
            </div>

            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">EMOJI</p>
              <CollapseMenu label="Emoji Categories" icon={Smile} prefix="/emoji-categories" links={[
                { href: "/emoji-categories", label: "All Categories" },
                { href: "/emoji-categories/add", label: "Add Category" },
              ]} />
            </div>

            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">EMOJI LIST</p>
              <CollapseMenu label="Emoji" icon={Smile} prefix="/emojis" links={[
                { href: "/emojis", label: "Emoji List" },
                { href: "/emojis/add", label: "Add Emoji" },
              ]} />
            </div>

            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">THEMES</p>
              <CollapseMenu label="Themes" icon={Palette} prefix="/themes" links={[
                { href: "/themes", label: "All Themes" },
                { href: "/themes/add", label: "Add Theme" },
              ]} />
            </div>

            <div>
              <p className="mb-3 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">ADMIN</p>
              <CollapseMenu label="Admin Story Category" icon={FolderOpen} prefix="/story-category" links={[
                { href: "/story-category/all", label: "Story Category List" },
                { href: "/story-category/add", label: "Add Story Category" },
              ]} />
              <CollapseMenu label="Admin Story" icon={BookOpen} prefix="/admin-story" links={[
                { href: "/admin-story/all", label: "All Stories" },
                { href: "/admin-story/generate", label: "Generate Story" },
              ]} />
              <CollapseMenu label="Admin Notification" icon={Bell} prefix="/notifications" links={[
                { href: "/notifications/all", label: "All Notifications" },
                { href: "/notifications/add", label: "Add Notification" },
              ]} />
              <AdminConfigMenu />
            </div>
          </nav>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 999px; }
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #d1d5db transparent; }
        `}</style>
      </aside>
    </>
  );
};

export default Sidebar;
