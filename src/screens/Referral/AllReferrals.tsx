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
import { getReferrals } from "@/store/slices/ReferralSlices/referralThunk";

export default function AllReferrals() {
    const dispatch = useAppDispatch();
    const { referrals, pagination, loading } = useAppSelector((state) => state.referrals);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        dispatch(getReferrals({ page, limit }));
    }, [dispatch, page, limit]);

    const statusVariant = (status: string): "emerald" | "orange" | "red" => {
        if (status === "completed") return "emerald";
        if (status === "pending") return "orange";
        return "red";
    };

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Referrals & Earn</h1>
                    <p className="mt-1 text-sm text-[#667085]">Track all referral activity and reward status.</p>
                </div>

                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1100px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "Referral Code" },
                                    { label: "Referrer Name" },
                                    { label: "Referrer Email" },
                                    { label: "Referrer Username" },
                                    { label: "Referred Name" },
                                    { label: "Referred Email" },
                                    { label: "Referred XP" },
                                    { label: "Status" },
                                    { label: "Reward Granted" },
                                    { label: "Created At" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : referrals.length > 0 ? (
                                    referrals.map((ref) => (
                                        <tr key={ref.referral_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4">
                                                <span className="rounded-lg bg-[#EFF6FF] px-3 py-1 text-sm font-semibold text-[#2563EB] tracking-wider">
                                                    {ref.referral_code}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                                {ref.referrer.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085]">
                                                {ref.referrer.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#475467]">
                                                @{ref.referrer.username}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                                {ref.referred_user.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085]">
                                                {ref.referred_user.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                {ref.referred_user.xp ?? 0}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={ref.status.charAt(0).toUpperCase() + ref.status.slice(1)}
                                                    variant={statusVariant(ref.status)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={ref.reward_granted ? "Granted" : "Pending"}
                                                    variant={ref.reward_granted ? "emerald" : "orange"}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(ref.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(ref.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX size={30} className="text-[#2563EB]" />
                                                </div>
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Referrals Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No referral activity yet.</p>
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
                        rowsPerPageOptions={[10, 20, 50]}
                        showRowsPerPage
                        showPageInfo
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
