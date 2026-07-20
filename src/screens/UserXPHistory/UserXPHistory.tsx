"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    ArrowLeft,
    Coins,
    Download,
} from "lucide-react";

import DashboardLayout from "@/layouts/DashboardLayout";

import Pagination from "@/components/common/Pagination";
import TableHeader from "@/components/common/TableHeader";
import TableSkeleton from "@/components/common/TableSkeleton";
import Tags from "@/components/common/Tag";
import DateTime from "@/components/common/DateTime";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getXPHistory } from "@/store/slices/UserSlice/xpHistoryThunk";

interface Props {
    userId: number;
}

export default function UserXPHistory({
    userId,
}: Props) {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const {
        history,
        pagination,
        loading,
    } = useAppSelector(
        (state) => state.xpHistory
    );

    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(20);

    useEffect(() => {

        dispatch(
            getXPHistory({
                userId,
                page,
                limit,
            })
        );

    }, [
        dispatch,
        userId,
        page,
        limit,
    ]);

    const xpHistory = history[userId] ?? [];

    const getAmountColor = (amount: number) => {

        return amount >= 0
            ? "text-emerald-600"
            : "text-red-600";

    };

    const getTypeVariant = (type: string) => {

        switch (type) {

            case "consumable_purchase":
                return "green";

            case "story_deduction":
                return "red";

            case "language_translate":
                return "blue";

            default:
                return "purple";

        }

    };

    const getStatusVariant = (status: string) => {

        switch (status) {

            case "completed":
                return "green";

            case "pending":
                return "yellow";

            case "failed":
                return "red";

            default:
                return "blue";

        }

    };

    return (

        <DashboardLayout>

            <div className="px-4 sm:px-8 pt-4 pb-12">

                {/* Back Button */}

                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]"
                >

                    <ArrowLeft size={16} />

                    Back

                </button>

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">

                            XP History

                        </h1>

                        <p className="mt-1 text-sm text-[#667085]">

                            User XP transaction history

                        </p>

                    </div>

                </div>

                {/* Table */}

                <div className="rounded-[10px] border border-gray-200 bg-white overflow-hidden">

                    <div className="w-full overflow-x-auto">

                        <table className="min-w-[1500px] w-full border-collapse text-left">

                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "Amount" },
                                    { label: "Balance After" },
                                    { label: "Type" },
                                    { label: "Status" },
                                    { label: "Product" },
                                    { label: "Price" },
                                    { label: "Currency" },
                                    { label: "Note" },
                                    { label: "Created At" },
                                ]}
                            />

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (

                                    <TableSkeleton rows={limit} />

                                ) : xpHistory.length > 0 ? (

                                    xpHistory.map((item) => (

                                        <tr
                                            key={item.xp_transaction_id}
                                            className="transition-all duration-200 hover:bg-[#F9FAFB]"
                                        >

                                            {/* Amount */}

                                            <td className="px-5 py-5">

                                                <span
                                                    className={`text-sm font-bold ${getAmountColor(item.amount)}`}
                                                >
                                                    {item.amount > 0 ? "+" : ""}
                                                    {item.amount}
                                                </span>

                                            </td>

                                            {/* Balance */}

                                            <td className="px-5 py-5 text-sm font-semibold text-[#101828]">

                                                {item.balance_after}

                                            </td>

                                            {/* Type */}

                                            <td className="px-5 py-5">

                                                <Tags
                                                    text={item.type.replaceAll("_", " ")}
                                                    variant={getTypeVariant(item.type)}
                                                />

                                            </td>

                                            {/* Status */}

                                            <td className="px-5 py-5">

 <Tags
                                                    text={
                                                        item.status
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                    variant={
                                                        item.status
                                                            ? "green"
                                                            : "red"
                                                    }
                                                />

                                            </td>

                                            {/* Product */}

                                            <td className="px-5 py-5 text-sm text-[#475467]">

                                                {item.product_id ?? "—"}

                                            </td>

                                            {/* Price */}

                                            <td className="px-5 py-5 text-sm text-[#475467]">

                                                {item.price ?? "—"}

                                            </td>

                                            {/* Currency */}

                                            <td className="px-5 py-5 text-sm text-[#475467]">

                                                {item.currency ?? "—"}

                                            </td>

                                            {/* Note */}

                                            <td className="px-5 py-5">

                                                <div className="max-w-[260px]">

                                                    <p className="line-clamp-2 text-sm text-[#475467]">

                                                        {item.note || "—"}

                                                    </p>

                                                </div>

                                            </td>

                                            {/* Created */}

                                            <td className="px-5 py-5">

                                                <DateTime
                                                    date={new Date(item.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                    time={new Date(item.createdAt).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }
                                                    )}
                                                />

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={9}
                                            className="py-24"
                                        >

                                            <div className="flex flex-col items-center justify-center">

                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">

                                                    <Coins
                                                        size={30}
                                                        className="text-[#2563EB]"
                                                    />

                                                </div>

                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">

                                                    No XP History

                                                </h3>

                                                <p className="mt-2 text-sm text-[#667085]">

                                                    This user doesn't have any XP transactions yet.

                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
                <div className="mt-6">

                    <Pagination
                        currentPage={
                            pagination?.total
                                ? pagination.page
                                : 1
                        }
                        totalPages={
                            pagination?.total
                                ? Math.ceil(
                                    pagination.total / pagination.limit
                                )
                                : 1
                        }
                        rowsPerPage={limit}
                        onPageChange={(newPage) => {

                            setPage(newPage);

                        }}
                        onRowsPerPageChange={(rows) => {

                            setLimit(rows);

                            setPage(1);

                        }}
                        rowsPerPageOptions={[
                            5,
                            10,
                            20,
                            50,
                        ]}
                        showRowsPerPage
                        showPageInfo
                    />

                </div>

            </div>

        </DashboardLayout>

    );

}