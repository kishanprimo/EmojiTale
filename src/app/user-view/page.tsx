"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Suspense, useEffect } from "react";
import Tag from "@/components/common/Tag";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { getUserDetails } from "@/store/slices/UserSlice/userDetailsThunk";

export const dynamic = "force-dynamic";

export default function UserViewPage() {
    return (
        <Suspense fallback={null}>
            <UserViewContent />
        </Suspense>
    );
}

function UserViewContent() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const dispatch = useAppDispatch();

    const userId = searchParams?.get("user_id");

    const {
        user,
        agents,
        loading,
    } = useAppSelector((state) => state.userDetails);
    useEffect(() => {

        if (userId) {

            dispatch(
                getUserDetails({
                    user_id: Number(userId),
                })
            );

        }

    }, [dispatch, userId]);
    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[80vh]">
                    <div className="w-10 h-10 border-4 border-[#73C311] border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }
    return (
        <DashboardLayout>
            <div className="px-8 py-6">

                {/* Heading */}
                <div className="mb-7">

                    <h1 className="text-[30px] font-semibold text-[#101828] font-poppins">
                        User Details
                    </h1>

                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <p className="text-[15px] text-[#667085]">
                            View owner information and assigned agents.
                        </p>

                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={18} />
                            Back to Users
                        </button>

                    </div>

                </div>

                {/* User Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                        {/* Avatar */}
                        <div className="h-20 w-20 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-3xl font-bold ring-4 ring-[#EEF4FF] shrink-0">
                            {user?.name?.charAt(0) || "-"}
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-2">
                            <h2 className="text-[22px] font-semibold text-[#101828]">
                                {user?.name}
                            </h2>

                            <p className="text-[15px] text-[#667085] mt-1">
                                {user?.email}
                            </p>

                            <div className="flex items-center gap-3 mt-4">

                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700">
                                    {user?.role}
                                </span>

                                <Tag
                                    text={user?.is_online ? "Active" : "Inactive"}
                                    variant={user?.is_online ? "green" : "gray"}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Agents */}
                <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden">

                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

                        <h3 className="text-lg font-semibold text-[#101828]">
                            Assigned Agents ({agents?.length || 0})
                        </h3>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-[#F9FAFB]">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#344054]">
                                        Name
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#344054]">
                                        Email
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#344054]">
                                        Status
                                    </th>



                                </tr>

                            </thead>

                            <tbody>

                                {agents.length > 0 ? (

                                    agents.map((agent) => (

                                        <tr
                                            key={agent.id}
                                            className="border-t border-gray-100 hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-5">
                                                <div className="font-medium text-[#101828]">
                                                    {agent.name || "N/A"}
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 text-[#667085]">
                                                {agent.email || "N/A"}
                                            </td>

                                            <td className="px-6 py-5">
                                                <Tag
                                                    text={
                                                        !agent.is_active
                                                            ? "Blocked"
                                                            : !agent.is_invite_accepted
                                                                ? "Pending"
                                                                : "Unblocked"
                                                    }
                                                    variant={
                                                        !agent.is_active
                                                            ? "red"
                                                            : !agent.is_invite_accepted
                                                                ? "orange"
                                                                : "green"
                                                    }
                                                />
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-16"
                                        >
                                            <div className="flex flex-col items-center justify-center">

                                                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-7 h-7 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={1.8}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17 20h5V4H2v16h5m10 0v-4a3 3 0 00-6 0v4m6 0H7"
                                                        />
                                                    </svg>
                                                </div>

                                                <h3 className="text-[16px] font-semibold text-[#101828]">
                                                    No Assigned Agents
                                                </h3>

                                                <p className="mt-1 text-[14px] text-[#667085]">
                                                    This owner doesn't have any agents assigned yet.
                                                </p>

                                            </div>
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}