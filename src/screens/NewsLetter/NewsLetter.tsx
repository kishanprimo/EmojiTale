"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Search from "@/components/common/Search";
import TableHeader from "@/components/common/TableHeader";
import DateTime from "@/components/common/DateTime";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getNewsLetters } from "@/store/slices/NewsLetterSlice/newsLetterThunk";
import { Download, ChevronDown, SearchX } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function NewsLetter() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 1000);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [exportOpen, setExportOpen] = useState(false);

    const dispatch = useAppDispatch();
    const { subscribers, pagination, loading } = useAppSelector((state) => state.newsletter);

    useEffect(() => {
        dispatch(getNewsLetters({ page, limit, search: debouncedSearch }));
    }, [dispatch, page, limit, debouncedSearch]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const handleExportCSV = () => {
        const headers = ["Subscriber ID", "Email", "Created At", "Updated At"];
        const rows = subscribers.map((s) => [
            s.subscriber_id,
            s.email,
            new Date(s.createdAt).toLocaleString(),
            new Date(s.updatedAt).toLocaleString(),
        ]);
        const csv = [headers, ...rows]
            .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
            .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Newsletter_Subscribers.csv";
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">
                        Newsletter List
                    </h1>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search by email..."
                            />
                        </div>
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setExportOpen(!exportOpen)}
                                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-[10px] text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Download size={18} />
                                Export
                                <ChevronDown size={16} className={`transition ${exportOpen ? "rotate-180" : ""}`} />
                            </button>
                            {exportOpen && (
                                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                                    <button
                                        onClick={() => { handleExportCSV(); setExportOpen(false); }}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#344054] hover:bg-gray-50 hover:text-[#101828] transition-colors"
                                    >
                                        Export as CSV
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-7 bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[850px] w-full text-left border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "Subscriber ID" },
                                    { label: "Email" },
                                    { label: "Created At" },
                                    { label: "Updated At" },
                                ]}
                                showCheckbox={false}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : subscribers.length > 0 ? (
                                    subscribers.map((subscriber) => (
                                        <tr key={subscriber.subscriber_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-5 text-sm font-medium text-[#101828]">
                                                #{subscriber.subscriber_id}
                                            </td>
                                            <td className="px-6 py-5 text-sm text-[#475467]">
                                                {subscriber.email}
                                            </td>
                                            <td className="px-6 py-5">
                                                <DateTime
                                                    date={new Date(subscriber.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(subscriber.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-5">
                                                <DateTime
                                                    date={new Date(subscriber.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(subscriber.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX size={30} className="text-[#2563EB]" />
                                                </div>
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">
                                                    No subscribers found
                                                </h3>
                                                <p className="mt-2 text-center text-[15px] text-[#667085]">
                                                    {debouncedSearch ? `No results for "${debouncedSearch}"` : "No newsletter subscribers yet."}
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
