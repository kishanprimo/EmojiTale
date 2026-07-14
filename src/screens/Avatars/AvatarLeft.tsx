"use client";

import { useEffect, useMemo, useState } from "react";

import Search from "@/components/common/Search";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { getAvatars } from "@/store/slices/AvatarSlices/avatarThunk";


export default function AvatarLeft() {

    const dispatch = useAppDispatch();

    const { avatars } = useAppSelector(
        (state) => state.avatars
    );

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedAvatar, setSelectedAvatar] =
        useState<number | null>(null);

    useEffect(() => {

        dispatch(

            getAvatars({

                page: 1,

                limit: 100,

            })

        );

    }, [dispatch]);

    const filteredAvatars = useMemo(() => {

        return avatars.filter((avatar) =>

            avatar.name
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )

        );

    }, [

        avatars,

        searchTerm,

    ]);

    return (

        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">

            {/* Header */}

            <div className="border-b border-gray-200 p-6">

                <h2 className="text-[24px] font-semibold text-[#101828]">

                    Avatars

                </h2>

            </div>

            {/* Search */}

            <div className="border-b border-gray-100 p-4">

                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search Avatar..."
                />

            </div>

            {/* Avatar List */}

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">

                {filteredAvatars.length > 0 ? (

                    filteredAvatars.map((avatar) => (

                        <button
                            key={avatar.avatar_id}
                            onClick={() =>
                                setSelectedAvatar(
                                    avatar.avatar_id
                                )
                            }
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer

                                ${
                                    selectedAvatar ===
                                    avatar.avatar_id
                                        ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                        : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >

                            {avatar.avatar_media ? (
                                <img
                                    src={(avatar.avatar_media) ?? undefined}
                                    alt={avatar.name}
                                    className="h-10 w-10 rounded-full object-cover border border-gray-200 shrink-0"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white font-semibold shrink-0">
                                    {avatar.name.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div>

                                <p className="text-[15px] font-medium">

                                    {avatar.name}

                                </p>

                                <p className="text-xs text-gray-500 capitalize">

                                    {avatar.avatar_gender}

                                </p>

                            </div>

                        </button>

                    ))

                ) : (

                    <div className="py-10 text-center text-gray-400">

                        No avatars found.

                    </div>

                )}

            </div>

        </aside>

    );

}