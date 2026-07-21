"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import { SearchX, Plus, Eye, X, FileText } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getReports } from "@/store/slices/ReportSlices/reportThunk";
import { ReportItem } from "@/types/ReportTypes/reportTypes";

function ReportViewModal({ report, onClose }: { report: ReportItem; onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Blue header strip */}
                <div className="bg-[#2563EB] px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                            <FileText size={18} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-semibold text-white leading-tight">Report Details</h2>
                            <p className="text-xs text-blue-100 mt-0.5">#{report.report_id}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <X size={16} className="text-white" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 overflow-y-auto flex-1">
                    <p className="text-[13px] font-semibold text-[#667085] uppercase tracking-wide mb-2">Report Text</p>
                    <p className="text-[15px] text-[#101828] leading-relaxed whitespace-pre-wrap break-words">
                        {report.report_text}
                    </p>
                </div>

                {/* Footer timestamps */}
                <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-[#F9FAFB]">
                    <div>
                        <p className="text-[11px] text-[#667085] font-medium uppercase tracking-wide">Created</p>
                        <p className="text-[13px] text-[#344054] font-semibold mt-0.5">
                            {new Date(report.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                            {" · "}
                            {new Date(report.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] text-[#667085] font-medium uppercase tracking-wide">Updated</p>
                        <p className="text-[13px] text-[#344054] font-semibold mt-0.5">
                            {new Date(report.updated_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                            {" · "}
                            {new Date(report.updated_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AllReports() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { reports, pagination, loading } = useAppSelector((state) => state.reports);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [viewReport, setViewReport] = useState<ReportItem | null>(null);

    useEffect(() => {
        dispatch(getReports({ page, limit }));
    }, [dispatch, page, limit]);

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">All Reports</h1>
                    <button
                        onClick={() => router.push("/reports/add")}
                        className="flex items-center gap-2 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 text-sm font-medium text-white transition-all"
                    >
                        <Plus size={16} /> Add Report
                    </button>
                </div>

                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[700px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "ID" },
                                    { label: "Report Text" },
                                    { label: "Created At" },
                                    { label: "Updated At" },
                                    { label: "Action" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : reports.length > 0 ? (
                                    reports.map((report) => (
                                        <tr key={report.report_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{report.report_id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085] max-w-[400px]">
                                                <p className="line-clamp-2">{report.report_text}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(report.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(report.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(report.updated_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(report.updated_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setViewReport(report)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors"
                                                    title="View Report"
                                                >
                                                    <Eye size={15} className="text-[#2563EB]" />
                                                </button>
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
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Reports Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No reports have been added yet.</p>
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

            {viewReport && (
                <ReportViewModal report={viewReport} onClose={() => setViewReport(null)} />
            )}
        </DashboardLayout>
    );
}
