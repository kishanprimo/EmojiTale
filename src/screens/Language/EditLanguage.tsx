"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import LanguageForm from "./LanguageForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getLanguages } from "@/store/slices/LanguageSlices/languageThunk";
import { useEffect } from "react";

interface Props {
    id: number;
}

export default function EditLanguage({ id }: Props) {
    const dispatch = useAppDispatch();
    const { languages } = useAppSelector((state) => state.language);

    useEffect(() => {
        dispatch(getLanguages({ page: 1, limit: 100 }));
    }, [dispatch]);

    const editItem = languages.find((l) => l.language_id === id);

    return (
        <DashboardLayout>
            <div className="p-6">
                {editItem ? (
                    <LanguageForm editItem={editItem} />
                ) : (
                    <div className="bg-white border border-gray-200 rounded-[12px] flex items-center justify-center h-40">
                        <p className="text-sm text-[#667085]">Loading language...</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
