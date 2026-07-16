"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import StoryCategoryForm from "./StoryCategoryForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getStoryCategories } from "@/store/slices/StoryCategorySlices/storyCategoryThunk";
import { useEffect } from "react";

interface Props {
    id: number;
}

export default function EditStoryCategory({ id }: Props) {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.storyCategory);

    useEffect(() => {
        dispatch(getStoryCategories({ page: 1, limit: 100 }));
    }, [dispatch]);

    const editItem = categories.find((c) => c.storycategory_id === id);

    return (
        <DashboardLayout>
            <div className="p-6">
                {editItem ? (
                    <StoryCategoryForm editItem={editItem} />
                ) : (
                    <div className="bg-white border border-gray-200 rounded-[12px] flex items-center justify-center h-40">
                        <p className="text-sm text-[#667085]">Loading category...</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
