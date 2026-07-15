"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getEmojis } from "@/store/slices/EmojiSlices/emojiThunk";


export default function EmojiLeft() {
    const dispatch = useAppDispatch();
    const { emojis } = useAppSelector((state) => state.emojis);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getEmojis({ page: 1, limit: 100 }));
    }, [dispatch]);

    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Emojis</h2>
            </div>

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {emojis.length > 0 ? (
                    emojis.map((emoji) => (
                        <button
                            key={emoji.emoji_id}
                            onClick={() => setSelectedId(emoji.emoji_id)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                ${selectedId === emoji.emoji_id
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            <Image
                                src={proxiedImage(emoji.emoji_url, emoji.updatedAt) ?? "/globe.svg"}
                                alt={`emoji-${emoji.emoji_id}`}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-lg object-cover border border-gray-200 shrink-0"
                            />
                            <p className="text-[15px] font-medium">#{emoji.emoji_id}</p>
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400">No emojis found.</div>
                )}
            </div>
        </aside>
    );
}
