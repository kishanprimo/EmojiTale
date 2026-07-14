"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import { SearchX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getStoryCategories } from "@/store/slices/StoryCategorySlices/storyCategoryThunk";


export default function AllStoryCategory() {
    const dispatch = useAppDispatch();
    const { categories, pagination, loading } = useAppSelector((state) => state.storyCategory);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(getStoryCategories({ page, limit }));
    }, [dispatch, page, limit]);

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Story Categories</h1>
                </div>

                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                    <table className="min-w-[800px] w-full border-collapse text-left">
                        <TableHeader
                            showCheckbox={false}
                            columns={[
                                { label: "Image" },
                                { label: "ID" },
                                { label: "Name" },
                                { label: "Description" },
                                { label: "Created At" },
                                { label: "Updated At" },
                            ]}
                        />
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <TableSkeleton rows={limit} />
                            ) : categories.length > 0 ? (
                                categories.map((cat) => (
                                    <tr key={cat.storycategory_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                        <td className="px-6 py-4">
                                            <img
                                                src={(cat.storycategory_image) ?? undefined}
                                                alt={cat.storycategory_name}
                                                className="h-12 w-12 rounded-xl object-cover border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                            #{cat.storycategory_id}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                            {cat.storycategory_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#667085] max-w-[260px]">
                                            <p className="line-clamp-2">{cat.storycategory_description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <DateTime
                                                date={new Date(cat.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                time={new Date(cat.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <DateTime
                                                date={new Date(cat.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                time={new Date(cat.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-20">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                <SearchX size={30} className="text-[#2563EB]" />
                                            </div>
                                            <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Categories Found</h3>
                                            <p className="mt-2 text-[15px] text-[#667085]">No story categories have been added yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>

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
