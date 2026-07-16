"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import Action from "@/components/common/Action";
import TogglableSwitch from "@/components/common/TogglableSwitch";
import { SearchX, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getStoryCategories } from "@/store/slices/StoryCategorySlices/storyCategoryThunk";
import { updateStoryCategory } from "@/store/slices/StoryCategorySlices/updateStoryCategoryThunk";
import { deleteStoryCategory } from "@/store/slices/StoryCategorySlices/deleteStoryCategoryThunk";
import { toggleCategoryStatus } from "@/store/slices/StoryCategorySlices/storyCategorySlice";
import { toast } from "react-hot-toast";
import CategoriesDeleteModal from "@/components/common/CategoriesDeleteModal";

export default function AllStoryCategory() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { categories, pagination, loading } = useAppSelector((state) => state.storyCategory);

    const [cacheBust] = useState(() => Date.now());
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        dispatch(getStoryCategories({ page, limit }));
    }, [dispatch, page, limit]);

    const handleToggle = async (id: number, currentActive: boolean) => {
        dispatch(toggleCategoryStatus(id));
        const formData = new FormData();
        formData.append("is_active", String(!currentActive));
        try {
            await dispatch(updateStoryCategory({ id, formData })).unwrap();
        } catch {
            dispatch(toggleCategoryStatus(id));
            toast.error("Failed to update status");
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteId) return;
        setDeleteLoading(true);
        try {
            await dispatch(deleteStoryCategory(deleteId)).unwrap();
            toast.success("Category deleted successfully");
            dispatch(getStoryCategories({ page, limit }));
        } catch {
            toast.error("Failed to delete category");
        } finally {
            setDeleteLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Story Categories</h1>
                    <button
                        onClick={() => router.push("/story-category/add")}
                        className="flex items-center gap-2 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 text-sm font-medium text-white transition-all"
                    >
                        <Plus size={16} /> Add Category
                    </button>
                </div>

                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[800px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "ID" },
                                    { label: "Image" },
                                    { label: "Name" },
                                    { label: "Status" },
                                    { label: "Action" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <tr key={cat.storycategory_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{cat.storycategory_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Image
                                                    src={proxiedImage(cat.storycategory_image, cacheBust) ?? "/globe.svg"}
                                                    alt={cat.storycategory_name}
                                                    width={48}
                                                    height={48}
                                                    className="h-12 w-12 rounded-xl object-cover border border-gray-200"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                                {cat.storycategory_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <TogglableSwitch
                                                    isActive={cat.is_active}
                                                    onToggle={() => handleToggle(cat.storycategory_id, cat.is_active)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Action
                                                    showView={false}
                                                    showEdit
                                                    showDelete
                                                    onEdit={() => router.push(`/story-category/edit/${cat.storycategory_id}`)}
                                                    onDelete={() => setDeleteId(cat.storycategory_id)}
                                                />
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
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Categories Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No story categories have been added yet.</p>
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
                />
            )}
        </DashboardLayout>
    );
}
