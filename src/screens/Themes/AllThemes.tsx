"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Action from "@/components/common/Action";
import { Download, ChevronDown, SearchX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getThemes } from "@/store/slices/ThemeSlices/themeThunk";
import { setSelectedTheme } from "@/store/slices/ThemeSlices/selectedThemeSlice";


export default function AllThemes() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { themes, pagination, loading } = useAppSelector((state) => state.themes);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [exportOpen, setExportOpen] = useState(false);

    useEffect(() => {
        dispatch(getThemes({ page, limit }));
    }, [dispatch, page, limit]);

    const handleExportCSV = () => {
        const headers = ["Theme ID", "Name", "Subtitle", "Created At", "Updated At"];
        const rows = themes.map((t) => [
            t.theme_id,
            t.theme_name,
            t.theme_name_subtitle,
            new Date(t.createdAt).toLocaleString(),
            new Date(t.updatedAt).toLocaleString(),
        ]);
        const csv = [headers, ...rows]
            .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
            .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Themes.csv";
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12 font-inter">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">
                        Theme List
                    </h1>
                    <div className="relative shrink-0">
                        <button
                            onClick={() => setExportOpen(!exportOpen)}
                            className="flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <Download size={18} />
                            Export
                            <ChevronDown size={16} className={`transition ${exportOpen ? "rotate-180" : ""}`} />
                        </button>
                        {exportOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                                <button
                                    onClick={() => { handleExportCSV(); setExportOpen(false); }}
                                    className="w-full px-4 py-3 text-left text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101828]"
                                >
                                    Export as CSV
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="mt-7 overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                    <table className="min-w-[700px] w-full border-collapse text-left">
                        <TableHeader
                            showCheckbox={false}
                            columns={[
                                { label: "Image" },
                                { label: "Name" },
                                { label: "Subtitle" },
                                { label: "Created At" },
                                { label: "Updated At" },
                                { label: "Action", className: "text-center" },
                            ]}
                        />
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <TableSkeleton rows={limit} />
                            ) : themes.length > 0 ? (
                                themes.map((theme) => (
                                    <tr key={theme.theme_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                        <td className="px-6 py-4">
                                            <img
                                                src={(theme.theme_image) ?? undefined}
                                                alt={theme.theme_name}
                                                className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                            {theme.theme_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#667085]">
                                            {theme.theme_name_subtitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            <DateTime
                                                date={new Date(theme.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                time={new Date(theme.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <DateTime
                                                date={new Date(theme.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                time={new Date(theme.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Action
                                                showEdit
                                                showDelete={false}
                                                showView={false}
                                                onEdit={() => {
                                                    dispatch(setSelectedTheme({
                                                        theme_id: theme.theme_id,
                                                        theme_name: theme.theme_name,
                                                        theme_name_subtitle: theme.theme_name_subtitle,
                                                        theme_image: theme.theme_image,
                                                    }));
                                                    router.push(`/themes/edit/${theme.theme_id}`);
                                                }}
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
                                            <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Themes Found</h3>
                                            <p className="mt-2 max-w-sm text-center text-[15px] text-[#667085]">
                                                No themes have been added yet.
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
