"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getThemes } from "@/store/slices/ThemeSlices/themeThunk";

export default function ThemeLeft() {
    const dispatch = useAppDispatch();
    const { themes } = useAppSelector((state) => state.themes);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getThemes({ page: 1, limit: 100 }));
    }, [dispatch]);

    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Themes</h2>
            </div>

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {themes.length > 0 ? (
                    themes.map((theme) => (
                        <button
                            key={theme.theme_id}
                            onClick={() => setSelectedId(theme.theme_id)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                ${selectedId === theme.theme_id
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            <Image
                                src={proxiedImage(theme.theme_image, theme.updatedAt) ?? "/globe.svg"}
                                alt={theme.theme_name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-lg object-cover border border-gray-200 shrink-0"
                            />
                            <div>
                                <p className="text-[15px] font-medium">{theme.theme_name}</p>
                                <p className="text-xs text-gray-500">{theme.theme_name_subtitle}</p>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400">No themes found.</div>
                )}
            </div>
        </aside>
    );
}
