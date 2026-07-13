"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import Search from "@/components/common/Search";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Action from "@/components/common/Action";
import { Download, ChevronDown, SearchX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getEmojis } from "@/store/slices/EmojiSlices/emojiThunk";
import { setSelectedEmoji } from "@/store/slices/EmojiSlices/selectedEmojiSlice";
import { resolveImageUrl } from "@/lib/resolveImageUrl";

export default function AllEmojis() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { emojis, pagination, loading } = useAppSelector((state) => state.emojis);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [exportOpen, setExportOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 1000);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        dispatch(getEmojis({ page, limit, search: debouncedSearch }));
    }, [dispatch, page, limit, debouncedSearch]);

    const handleExportCSV = () => {
        const headers = ["Emoji ID", "Emoji URL", "Category ID", "Category Name", "Created At", "Updated At"];
        const rows = emojis.map((e) => [
            e.emoji_id,
            e.emoji_url,
            e.emoji_category_id,
            e.category?.name ?? "—",
            new Date(e.createdAt).toLocaleString(),
            new Date(e.updatedAt).toLocaleString(),
        ]);
        const csv = [headers, ...rows]
            .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
            .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Emojis.csv";
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12 font-inter">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Emoji List</h1>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search emojis..."
                            />
                        </div>
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setExportOpen(!exportOpen)}
                                className="flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <Download size={18} />
                                Export
                                <ChevronDown size={16} className={`transition ${exportOpen ? "rotate-180" : ""}`} />
                            </button>
                            {exportOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                                    <button
                                        onClick={() => { handleExportCSV(); setExportOpen(false); }}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101828]"
                                    >
                                        Export as CSV
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-7 overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                    <table className="min-w-[700px] w-full border-collapse text-left">
                        <TableHeader
                            showCheckbox={false}
                            columns={[
                                { label: "Emoji" },
                                { label: "Category Name" },
                                { label: "Created At" },
                                { label: "Updated At" },
                                { label: "Action", className: "text-center" },
                            ]}
                        />
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <TableSkeleton rows={limit} />
                            ) : emojis.length > 0 ? (
                                emojis.map((emoji) => (
                                    <tr key={emoji.emoji_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                        <td className="px-6 py-4">
                                            <img
                                                src={resolveImageUrl(emoji.emoji_url) ?? undefined}
                                                alt={`emoji-${emoji.emoji_id}`}
                                                className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                            {emoji.category?.name ?? "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <DateTime
                                                date={new Date(emoji.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                time={new Date(emoji.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <DateTime
                                                date={new Date(emoji.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                time={new Date(emoji.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Action
                                                showEdit
                                                showDelete={false}
                                                showView={false}
                                                onEdit={() => {
                                                    dispatch(setSelectedEmoji({
                                                        emoji_id: emoji.emoji_id,
                                                        emoji_url: emoji.emoji_url,
                                                        emoji_category_id: emoji.emoji_category_id,
                                                    }));
                                                    router.push(`/emojis/edit/${emoji.emoji_id}`);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-20">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                <SearchX size={30} className="text-[#2563EB]" />
                                            </div>
                                            <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Emojis Found</h3>
                                            <p className="mt-2 max-w-sm text-center text-[15px] text-[#667085]">
                                                No emojis have been added yet.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 w-full">
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        rowsPerPage={pagination.limit}
                        onPageChange={(newPage) => setPage(newPage)}
                        onRowsPerPageChange={(rows) => { setLimit(rows); setPage(1); }}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        showRowsPerPage
                        showPageInfo
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
