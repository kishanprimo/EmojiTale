"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import Action from "@/components/common/Action";
import { SearchX, Plus, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getLanguages } from "@/store/slices/LanguageSlices/languageThunk";
import { deleteLanguage } from "@/store/slices/LanguageSlices/deleteLanguageThunk";
import { toast } from "react-hot-toast";
import CategoriesDeleteModal from "@/components/common/CategoriesDeleteModal";

export default function AllLanguage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { languages, pagination, loading } = useAppSelector((state) => state.language);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getLanguages({ page, limit, search: search || undefined }));
        }, 300);
        return () => clearTimeout(timer);
    }, [dispatch, page, limit, search]);

    const handleDeleteConfirm = async () => {
        if (!deleteId) return;
        setDeleteLoading(true);
        try {
            await dispatch(deleteLanguage(deleteId)).unwrap();
            toast.success("Language deleted successfully");
            dispatch(getLanguages({ page, limit, search: search || undefined }));
        } catch (error) {
            toast.error((error as string) || "Failed to delete language");
        } finally {
            setDeleteLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Languages</h1>
                    <button
                        onClick={() => router.push("/language/add")}
                        className="flex items-center gap-2 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 text-sm font-medium text-white transition-all"
                    >
                        <Plus size={16} /> Add Language
                    </button>
                </div>

                <div className="mb-4 relative max-w-sm">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Search by name, code..."
                        className="w-full h-10 rounded-[10px] border border-gray-300 pl-9 pr-4 text-sm text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[800px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "ID" },
                                    { label: "Flag" },
                                    { label: "Name" },
                                    { label: "Native Label" },
                                    { label: "Code" },
                                    { label: "Original" },
                                    { label: "Action" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : languages.length > 0 ? (
                                    languages.map((lang) => (
                                        <tr key={lang.language_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{lang.language_id}
                                            </td>
                                            <td className="px-6 py-4 text-2xl leading-none">
                                                {lang.flag || "—"}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                                {lang.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#475467]">
                                                {lang.native_label}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#475467] uppercase">
                                                {lang.code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {lang.is_original ? (
                                                    <span className="inline-flex items-center rounded-full bg-[#EFF6FF] px-2.5 py-1 text-xs font-medium text-[#2563EB]">
                                                        Original
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-[#98A2B3]">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Action
                                                    showView={false}
                                                    showEdit
                                                    showDelete
                                                    onEdit={() => router.push(`/language/edit/${lang.language_id}`)}
                                                    onDelete={() => setDeleteId(lang.language_id)}
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
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Languages Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No languages have been added yet.</p>
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
            {deleteId !== null && (
                <CategoriesDeleteModal
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleDeleteConfirm}
                    loading={deleteLoading}
                    title="Are you sure want to delete this language?"
                />
            )}
        </DashboardLayout>
    );
}
