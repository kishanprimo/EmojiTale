"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addEmojiCategory } from "@/store/slices/EmojiCategorySlices/addEmojiCategoryThunk";
import { resetAddEmojiCategory } from "@/store/slices/EmojiCategorySlices/addEmojiCategorySlice";
import { updateEmojiCategory } from "@/store/slices/EmojiCategorySlices/updateEmojiCategoryThunk";
import { resetUpdateEmojiCategory } from "@/store/slices/EmojiCategorySlices/updateEmojiCategorySlice";
import { clearSelectedEmojiCategory } from "@/store/slices/EmojiCategorySlices/selectedEmojiCategorySlice";

type EmojiCategoryFormProps = {
    mode?: "add" | "edit";
};

export default function EmojiCategoryForm({ mode = "add" }: EmojiCategoryFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const selectedCategory = useAppSelector((state) => state.selectedEmojiCategory.category);
    const addState = useAppSelector((state) => state.addEmojiCategory);
    const updateState = useAppSelector((state) => state.updateEmojiCategory);

    const loading = mode === "edit" ? updateState.loading : addState.loading;
    const success = mode === "edit" ? updateState.success : addState.success;

    const [name, setName] = useState("");

    // Prefill on edit
    useEffect(() => {
        if (mode !== "edit" || !selectedCategory) return;
        setName(selectedCategory.name);
    }, [mode, selectedCategory]);

    // Handle success
    useEffect(() => {
        if (!success) return;
        toast.success(mode === "edit" ? "Category updated successfully!" : "Category created successfully!");
        if (mode === "edit") {
            dispatch(resetUpdateEmojiCategory());
        } else {
            dispatch(resetAddEmojiCategory());
        }
        dispatch(clearSelectedEmojiCategory());
        router.push("/emoji-categories");
    }, [success, dispatch, router, mode]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("Please enter a category name");
            return;
        }
        try {
            if (mode === "edit") {
                await dispatch(updateEmojiCategory({
                    categoryId: selectedCategory!.emoji_category_id,
                    name,
                })).unwrap();
            } else {
                await dispatch(addEmojiCategory({ name })).unwrap();
            }
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {mode === "edit" ? "Edit Category" : "Add Category"}
                </h2>
            </div>

            {/* Body */}
            <div className="flex-1 p-6">
                <div className="space-y-7">
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Category Name
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value.trimStart())}
                            placeholder="Enter category name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setName("");
                        dispatch(clearSelectedEmojiCategory());
                        router.push("/emoji-categories");
                    }}
                    className="rounded-[10px] border border-gray-300 px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`rounded-[10px] px-6 py-2 font-medium text-white transition-all ${loading ? "cursor-not-allowed bg-blue-300" : "bg-[#2563EB] hover:bg-[#1D4ED8]"}`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            Saving...
                        </span>
                    ) : mode === "edit" ? "Update Category" : "Save Category"}
                </button>
            </div>
        </div>
    );
}
