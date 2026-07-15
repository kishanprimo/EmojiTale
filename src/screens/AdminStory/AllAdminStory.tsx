"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Action from "@/components/common/Action";
import Tags from "@/components/common/Tag";
import { SearchX, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAdminStories } from "@/store/slices/AdminStorySlices/adminStoryThunk";

import { AdminStoryItem } from "@/types/AdminStoryTypes/adminStoryTypes";

export default function AllAdminStory() {
    const dispatch = useAppDispatch();
    const { stories, pagination, loading } = useAppSelector((state) => state.adminStory);

    const [cacheBust] = useState(() => Date.now());

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [viewStory, setViewStory] = useState<AdminStoryItem | null>(null);

    useEffect(() => {
        dispatch(getAdminStories({ page, limit }));
    }, [dispatch, page, limit]);

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Admin Stories</h1>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[900px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "Image" },
                                    { label: "ID" },
                                    { label: "Title" },
                                    { label: "Category" },
                                    { label: "Content" },
                                    { label: "Status" },
                                    { label: "Created At" },
                                    { label: "Updated At" },
                                    { label: "Action", className: "text-center" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : stories.length > 0 ? (
                                    stories.map((story) => (
                                        <tr key={story.adminstory_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4">
                                                {story.image ? (
                                                    <Image
                                                        src={proxiedImage(story.image, cacheBust)!}
                                                        alt={story.title}
                                                        width={48}
                                                        height={48}
                                                        className="h-12 w-12 rounded-xl object-cover border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                                        —
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{story.adminstory_id}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828] max-w-[160px]">
                                                <p className="line-clamp-2">{story.title}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085] whitespace-nowrap">
                                                {story.category?.storycategory_name ?? "—"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085] max-w-[260px]">
                                                <p className="line-clamp-2 leading-relaxed">{story.content}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={story.is_active ? "Active" : "Inactive"}
                                                    variant={story.is_active ? "green" : "red"}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(story.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(story.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(story.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(story.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Action
                                                    showView
                                                    showEdit={false}
                                                    showDelete={false}
                                                    onView={() => setViewStory(story)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX size={30} className="text-[#2563EB]" />
                                                </div>
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Stories Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No admin stories have been generated yet.</p>
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

            {/* View Modal */}
            {viewStory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                    onClick={() => setViewStory(null)}
                >
                    <div
                        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={proxiedImage(viewStory.image, cacheBust) ?? "/globe.svg"}
                                    alt={viewStory.title}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-xl object-cover border border-gray-200"
                                />
                                <div>
                                    <h2 className="text-[17px] font-semibold text-[#101828]">{viewStory.title}</h2>
                                    <p className="text-xs text-[#667085]">
                                        {viewStory.category?.storycategory_name} · #{viewStory.adminstory_id}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewStory(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            <div className="flex flex-wrap gap-3">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${viewStory.is_active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                    {viewStory.is_active ? "Active" : "Inactive"}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                    {viewStory.category?.storycategory_name}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                    {new Date(viewStory.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                </span>
                            </div>
                            <div className="rounded-xl bg-[#F9FAFB] border border-gray-100 p-5">
                                <p className="text-[13px] font-semibold uppercase tracking-wide text-[#8A8A8A] mb-3">Story Content</p>
                                <p className="text-sm text-[#344054] leading-7 whitespace-pre-wrap">{viewStory.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
