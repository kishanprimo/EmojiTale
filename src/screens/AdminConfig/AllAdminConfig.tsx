"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import { Download, ChevronDown, SearchX, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAdminConfigs } from "@/store/slices/AdminConfigSlices/adminConfigThunk";

export default function AllAdminConfig() {
    const dispatch = useAppDispatch();
    const { configs, loading } = useAppSelector((state) => state.adminConfig);

    const router = useRouter();
    const [exportOpen, setExportOpen] = useState(false);

    useEffect(() => {
        dispatch(getAdminConfigs());
    }, [dispatch]);

        const handleExportPDF = () => {
        const doc = new jsPDF("landscape");
        doc.setFontSize(18);
        doc.text("Admin Configurations", 14, 18);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 26);
        autoTable(doc, {
            startY: 34,
            head: [["ID", "Key", "Value", "Description", "Created At", "Updated At"]],
            body: configs.map((c) => [
                c.config_id,
                c.key,
                c.value,
                c.description,
                new Date(c.createdAt).toLocaleString(),
                new Date(c.updatedAt).toLocaleString(),
            ]),
            headStyles: { fillColor: [37, 99, 235] },
            styles: { fontSize: 9, cellPadding: 3 },
        });
        doc.save("Admin_Configurations.pdf");
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Key", "Value", "Description", "Created At", "Updated At"];
        const rows = configs.map((c) => [
            c.config_id,
            c.key,
            c.value,
            c.description,
            new Date(c.createdAt).toLocaleString(),
            new Date(c.updatedAt).toLocaleString(),
        ]);
        const csv = [headers, ...rows]
            .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
            .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Admin_Configurations.csv";
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Admin Configurations</h1>
                    <div className="flex items-center gap-3">

                        {/* Export */}
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
                                        onClick={() => { handleExportPDF(); setExportOpen(false); }}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101828]"
                                    >
                                        Export as PDF
                                    </button>
                                    <button
                                        onClick={() => { handleExportCSV(); setExportOpen(false); }}
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
                        <table className="min-w-[900px] w-full border-collapse text-left">
                            <TableHeader
                                columns={[
                                    { label: "ID" },
                                    { label: "Key" },
                                    { label: "Value" },
                                    { label: "Description" },
                                    { label: "Created At" },
                                    { label: "Updated At" },
                                    { label: "Action" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={5} />
                                ) : configs.length > 0 ? (
                                    configs.map((config) => (
                                        <tr key={config.config_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{config.config_id}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                                {config.key}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#475467]">
                                                {config.value}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085] max-w-[280px]">
                                                <p className="line-clamp-2">{config.description}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(config.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(config.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(config.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(config.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => router.push(`/admin-config/edit/${encodeURIComponent(config.key)}?value=${encodeURIComponent(config.value)}`)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#667085] transition-colors hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
                                                >
                                                    <Pencil size={14} />
                                                </button>
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
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Configs Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No configurations available.</p>
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
