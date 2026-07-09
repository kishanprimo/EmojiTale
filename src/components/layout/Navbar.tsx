"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Menu,
    LogOut,
    User,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/AuthSlice/loginSlice";

type NavbarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Navbar = ({
    sidebarOpen,
    setSidebarOpen,
}: NavbarProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);
    return (
        <header
            className="
                        fixed
                        top-0
                        right-0
                        z-30
                        flex
                        h-[70px]
                        w-full
                        lg:w-[calc(100%-280px)]
                        items-center
                        justify-between
                        border-b
                        border-gray-200
                        bg-white
                        px-4
                        lg:px-6
                        shadow-sm
                    "
        >

            <div className="flex w-full items-center justify-between">

                {/* Mobile Menu */}

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-gray-300
                                bg-white
                                text-[#101828]
                                shadow-sm
                                hover:bg-gray-50
                                lg:hidden
                            "
                >
                    <Menu
                        size={22}
                        strokeWidth={2.3}
                        className="text-[#101828]"
                    />
                </button>

                {/* Right Side */}

                <div className="ml-auto flex items-center gap-5">


                    {/* Avatar */}

                    <div
                        className="relative"
                        ref={profileRef}
                    >
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#EEF4FF] text-sm font-bold text-[#2563EB]"
                        >
                            A
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                                {/* Profile */}

                                <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] font-semibold text-[#2563EB]">
                                        A
                                    </div>

                                    <div>
                                        <h3 className="text-[15px] font-semibold text-[#101828]">
                                            Admin
                                        </h3>

                                        <p className="text-[13px] text-gray-500">
                                            admin@emotale.com
                                        </p>
                                    </div>

                                </div>

                                {/* My Profile */}

                                <button
                                    className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left text-[15px] text-[#344054] hover:bg-gray-50"
                                >
                                    <User size={18} />
                                    My Profile
                                </button>

                                {/* Logout */}

                                <button
                                    onClick={() => {
                                        dispatch(logout());
                                        router.replace("/login");
                                    }}
                                    type="button"
                                    className="flex w-full cursor-pointer items-center gap-3 border-t border-gray-200 px-5 py-4 text-left font-semibold text-red-600 transition-colors hover:bg-red-50"
                                    style={{ cursor: "pointer" }}
                                >
                                    <LogOut size={18} className="pointer-events-none" />
                                    <span className="cursor-pointer">Sign Out</span>
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;