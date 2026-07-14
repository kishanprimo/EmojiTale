"use client";

import { useEffect, useMemo, useState } from "react";
import Search from "@/components/common/Search";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getStoryCategories } from "@/store/slices/StoryCategorySlices/storyCategoryThunk";


export default function StoryCategoryLeft() {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.storyCategory);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getStoryCategories({ page: 1, limit: 100 }));
    }, [dispatch]);

    const filtered = useMemo(
        () => categories.filter((c) => c.storycategory_name.toLowerCase().includes(searchTerm.toLowerCase())),
        [categories, searchTerm]
    );

    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Story Categories</h2>
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
                            key={cat.storycategory_id}
                            onClick={() => setSelectedId(cat.storycategory_id)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                ${selectedId === cat.storycategory_id
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            {cat.storycategory_image ? (
                                <img
                                    src={(cat.storycategory_image) ?? undefined}
                                    alt={cat.storycategory_name}
                                    className="h-10 w-10 rounded-full object-cover shrink-0 border border-gray-200"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white font-semibold shrink-0">
                                    {cat.storycategory_name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <p className="text-[15px] font-medium truncate">{cat.storycategory_name}</p>
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400">No categories found.</div>
                )}
            </div>
        </aside>
    );
}
