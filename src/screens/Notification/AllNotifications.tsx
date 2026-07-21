"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Tags from "@/components/common/Tag";
import { SearchX, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getNotifications } from "@/store/slices/NotificationSlices/notificationThunk";

export default function AllNotifications() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { notifications, pagination, loading } = useAppSelector((state) => state.notifications);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(getNotifications({ page, limit }));
    }, [dispatch, page, limit]);

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">All Notifications</h1>
                    <button
                        onClick={() => router.push("/notifications/add")}
                        className="flex items-center gap-2 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 text-sm font-medium text-white transition-all"
                    >
                        <Plus size={16} /> Add Notification
                    </button>
                </div>

                {/* Table */}
                <div className="mt-7 bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1100px] w-full text-left border-collapse">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "Broadcast ID" },
                                    { label: "Admin" },
                                    { label: "Title" },
                                    { label: "Message" },
                                    { label: "Platform" },
                                    { label: "Created At" },
                                    { label: "Updated At" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : notifications.length > 0 ? (
                                    notifications.map((n) => (
                                        <tr key={n.broadcast_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{n.broadcast_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-[#101828]">{n.admin.full_name}</p>
                                                <p className="text-xs text-[#667085]">{n.admin.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828] max-w-[180px]">
                                                <p className="line-clamp-2">{n.title}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085] max-w-[280px]">
                                                <p className="line-clamp-2">{n.message}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={n.platform}
                                                    variant={n.platform === "ios" ? "blue" : n.platform === "android" ? "green" : "purple"}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(n.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(n.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(n.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX size={30} className="text-[#2563EB]" />
                                                </div>
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Notifications Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No notifications have been sent yet.</p>
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
