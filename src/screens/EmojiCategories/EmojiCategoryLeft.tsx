"use client";

import { useEffect, useMemo, useState } from "react";
import Search from "@/components/common/Search";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getEmojiCategories } from "@/store/slices/EmojiCategorySlices/emojiCategoryThunk";

export default function EmojiCategoryLeft() {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.emojiCategories);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getEmojiCategories({ page: 1, limit: 100 }));
    }, [dispatch]);

    const filtered = useMemo(
        () => categories.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [categories, searchTerm]
    );

    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Categories</h2>
            </div>

            <div className="border-b border-gray-100 p-4">
                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search category..."
                />
            </div>

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {filtered.length > 0 ? (
                    filtered.map((cat) => (
                        <button
                            key={cat.emoji_category_id}
                            onClick={() => setSelectedId(cat.emoji_category_id)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                ${selectedId === cat.emoji_category_id
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white font-semibold shrink-0">
                                {cat.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-[15px] font-medium truncate">{cat.name}</p>
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400">No categories found.</div>
                )}
            </div>
        </aside>
    );
}
