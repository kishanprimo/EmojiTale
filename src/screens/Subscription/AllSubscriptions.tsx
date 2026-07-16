"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Tags from "@/components/common/Tag";
import { SearchX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSubscriptions } from "@/store/slices/SubscriptionSlices/subscriptionThunk";

const statusVariant = (status: string): "green" | "red" | "blue" | "purple" => {
    const map: Record<string, "green" | "red" | "blue" | "purple"> = {
        active: "green",
        expired: "red",
        cancelled: "red",
        trial: "blue",
        pending: "purple",
    };
    return map[status.toLowerCase()] ?? "purple";
};

const platformVariant = (platform: string): "blue" | "green" | "purple" => {
    if (platform === "ios") return "blue";
    if (platform === "android") return "green";
    return "purple";
};

export default function AllSubscriptions() {
    const dispatch = useAppDispatch();
    const { subscriptions, pagination, loading } = useAppSelector((state) => state.subscription);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(getSubscriptions({ page, limit }));
    }, [dispatch, page, limit]);

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Subscriptions</h1>
                </div>

                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1100px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "ID" },
                                    { label: "User" },
                                    { label: "Plan" },
                                    { label: "Platform" },
                                    { label: "Status" },
                                    { label: "Renewals" },
                                    { label: "Start Date" },
                                    { label: "End Date" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : subscriptions.length > 0 ? (
                                    subscriptions.map((sub) => (
                                        <tr key={sub.subscription_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{sub.subscription_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-[#101828]">
                                                    {sub.user?.fullname ?? sub.user?.username ?? "—"}
                                                </p>
                                                <p className="text-xs text-[#667085]">{sub.user?.email}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-[#101828] capitalize">
                                                    {sub.plan?.plan_type ?? "—"}
                                                </p>
                                                <p className="text-xs text-[#667085]">
                                                    {sub.plan?.price} {sub.plan?.currency}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={sub.platform}
                                                    variant={platformVariant(sub.platform)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={sub.status}
                                                    variant={statusVariant(sub.status)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#101828] font-medium">
                                                {sub.renewal_count}
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(sub.start_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(sub.start_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(sub.end_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(sub.end_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX size={30} className="text-[#2563EB]" />
                                                </div>
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Subscriptions Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No subscriptions have been recorded yet.</p>
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
