"use client";

import { useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import GenerateStory from "./GenerateStory";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAdminStories } from "@/store/slices/AdminStorySlices/adminStoryThunk";

interface Props {
    id: number;
}

export default function EditAdminStory({ id }: Props) {
    const dispatch = useAppDispatch();
    const { stories, loading } = useAppSelector((state) => state.adminStory);

    useEffect(() => {
        dispatch(getAdminStories({ page: 1, limit: 100 }));
    }, [dispatch]);

    const editItem = stories.find((s) => s.adminstory_id === id);

    if (loading || !editItem) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-40">
                    <p className="text-sm text-[#667085]">
                        {!loading && !editItem ? "Story not found." : "Loading story..."}
                    </p>
                </div>
            </DashboardLayout>
        );
    }

    return <GenerateStory editItem={editItem} />;
}
