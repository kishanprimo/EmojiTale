"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Search from "@/components/common/Search";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import Tags from "@/components/common/Tag";

import {
    Download,
    ChevronDown,
    SearchX,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import axios from "@/lib/axiosConfiguration";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { getPlans } from "@/store/slices/PlanSlices/planThunk";
import { useDebounce } from "@/hooks/useDebounce";

export default function AlllXpPlan() {

    const dispatch = useAppDispatch();

    const {
        plans,
        pagination,
        loading,
    } = useAppSelector((state) => state.plans);

    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearch = useDebounce(searchTerm, 1000);

    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(20);

    const [exportOpen, setExportOpen] = useState(false);

    // ----------------------------
    // Fetch Plans
    // ----------------------------

    useEffect(() => {
        dispatch(getPlans({ product_type: "consumable", page, limit }));
    }, [dispatch, page, limit]);

    // ----------------------------
    // Fetch All Plans (Export)
    // ----------------------------

    const fetchAllPlans = async () => {
        const response = await axios.post("/admin/xp-store", {
            product_type: "consumable",
            page: 1,
            limit: pagination.total,
        });
        return response.data.data.records;
    };

    // ----------------------------
    // Export PDF
    // ----------------------------

    const handleExportPDF = async () => {

        const allPlans =
            await fetchAllPlans();

        const doc =
            new jsPDF("landscape");

        doc.setFontSize(18);

        doc.text(
            "Subscription plan Report",
            14,
            18
        );

        doc.setFontSize(10);

        doc.text(
            `Generated : ${new Date().toLocaleString()}`,
            14,
            26
        );

        autoTable(doc, {

            startY: 34,

            head: [[
                "Plan ID",
                "Plan Type",
                "XP Reward",
                "RevenueCat ID",
                "Status",
                "Created At",
                "Updated At",
            ]],

            body: allPlans.map((plan: any) => [
                plan.plan_id,
                plan.plan_type,
                plan.xp_reward,
                plan.revenuecat_product_id,
                plan.is_deleted ? "Deleted" : plan.is_active ? "Active" : "Inactive",
                new Date(plan.createdAt).toLocaleString(),
                new Date(plan.updatedAt).toLocaleString(),
            ]),
            headStyles: {

                fillColor: [37, 99, 235],

            },

            styles: {

                fontSize: 9,

                cellPadding: 3,

            },

        });

        doc.save("Plan_XP_Report.pdf");

    };

    // ----------------------------
    // Export CSV
    // ----------------------------

    const handleExportCSV = async () => {

        const allPlans =
            await fetchAllPlans();

        const headers = [
            "Plan ID",
            "Plan Type",
            "XP Reward",
            "RevenueCat ID",
            "Status",
            "Created At",
            "Updated At",
        ];

        const rows = allPlans.map((plan: any) => [
            plan.plan_id,
            plan.plan_type,
            plan.xp_reward,
            plan.revenuecat_product_id,
            plan.is_deleted ? "Deleted" : plan.is_active ? "Active" : "Inactive",
            new Date(plan.createdAt).toLocaleString(),
            new Date(plan.updatedAt).toLocaleString(),
        ]);

        const csvContent = [

            headers,

            ...rows,

        ]

            .map((row) =>
                row
                    .map((value: any) =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )

            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "Plan_XP_Report.csv";

        link.click();

        window.URL.revokeObjectURL(url);

    };

    // ----------------------------
    // Temporary Client Search
    // (Remove when backend supports search)
    // ----------------------------

        const filteredPlans = plans.filter((plan) => {
        if (!debouncedSearch) return true;
        const search = debouncedSearch.toLowerCase();
        return (
            plan.plan_type.toLowerCase().includes(search) ||
            plan.revenuecat_product_id.toLowerCase().includes(search) ||
            String(plan.plan_id).includes(search)
        );
    });

    return (

        <DashboardLayout>

            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12 font-inter">
                {/* Header */}

                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">
                        Xp Plan
                    </h1>

                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">

                        <div className="flex-1 lg:max-w-sm">

                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search plans..."
                            />

                        </div>

                        {/* Export */}

                        <div className="relative shrink-0">

                            <button
                                onClick={() =>
                                    setExportOpen(!exportOpen)
                                }
                                className="flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >

                                <Download size={18} />

                                Export

                                <ChevronDown
                                    size={16}
                                    className={`transition ${exportOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />

                            </button>

                            {exportOpen && (

                                <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">

                                    <button
                                        onClick={() => {

                                            handleExportPDF();

                                            setExportOpen(false);

                                        }}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101828]"
                                    >
                                        Export as PDF
                                    </button>

                                    <button
                                        onClick={() => {

                                            handleExportCSV();

                                            setExportOpen(false);

                                        }}
                                        className="w-full border-t border-gray-100 px-4 py-3 text-left text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101828]"
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

                        <table className="min-w-[1100px] w-full border-collapse text-left">

                            <TableHeader
                                columns={[
                                    { label: "Plan ID" },
                                    { label: "XP Reward" },
                                    { label: "RevenueCat ID" },
                                    { label: "Status" },
                                ]}
                            />

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (

                                    <TableSkeleton rows={limit} />

                                ) : filteredPlans.length > 0 ? (

                                    filteredPlans.map((plan) => (

                                        <tr
                                            key={plan.plan_id}
                                            className="transition-all duration-200 hover:bg-[#F9FAFB]"
                                        >

                                            {/* Plan ID */}

                                            <td className="pl-8 px-4 py-5">

                                                <span className="font-semibold text-[#101828]">

                                                    #{plan.plan_id}

                                                </span>

                                            </td>

                                            {/* XP Reward */}

                                            <td className="pl-10 px-4 py-5">

                                                <span className="text-sm font-semibold text-[#2563EB]">

                                                    {plan.xp_reward}

                                                </span>

                                            </td>

                                            {/* RevenueCat */}

                                            <td className="pl-8 px-4 py-5">

                                                <span className="text-sm text-[#475467]">

                                                    {plan.revenuecat_product_id}

                                                </span>

                                            </td>
                                            {/* Status */}

                                            <td className="px-4 py-5">

                                                <Tags
                                                    text={
                                                        plan.is_deleted
                                                            ? "Deleted"
                                                            : plan.is_active
                                                                ? "Active"
                                                                : "Inactive"
                                                    }
                                                    variant={
                                                        plan.is_deleted
                                                            ? "red"
                                                            : plan.is_active
                                                                ? "green"
                                                                : "orange"
                                                    }
                                                />

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="py-20"
                                        >

                                            <div className="flex flex-col items-center justify-center">

                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">

                                                    <SearchX
                                                        size={30}
                                                        className="text-[#2563EB]"
                                                    />

                                                </div>

                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">

                                                    No Plans Found

                                                </h3>

                                                <p className="mt-2 max-w-sm text-center text-[15px] text-[#667085]">

                                                    We couldn't find any plans matching

                                                    <span className="font-bold text-[#101828]">

                                                        {" "}
                                                        "{debouncedSearch}"

                                                    </span>

                                                </p>

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
                        onPageChange={(newPage) => {
                            setPage(newPage);
                        }}
                        onRowsPerPageChange={(rows) => {
                            setLimit(rows);
                            setPage(1);
                        }}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        showRowsPerPage
                        showPageInfo
                    />
                </div>

            </div>

        </DashboardLayout>

    );

}