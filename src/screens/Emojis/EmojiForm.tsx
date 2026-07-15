"use client";

import React, { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { toast } from "react-hot-toast";
import { Loader2, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addEmoji } from "@/store/slices/EmojiSlices/addEmojiThunk";
import { resetAddEmoji } from "@/store/slices/EmojiSlices/addEmojiSlice";
import { updateEmoji } from "@/store/slices/EmojiSlices/updateEmojiThunk";
import { resetUpdateEmoji } from "@/store/slices/EmojiSlices/updateEmojiSlice";
import { clearSelectedEmoji } from "@/store/slices/EmojiSlices/selectedEmojiSlice";
import { getEmojiCategories } from "@/store/slices/EmojiCategorySlices/emojiCategoryThunk";

type EmojiFormProps = {
    mode?: "add" | "edit";
};

export default function EmojiForm({ mode = "add" }: EmojiFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const selectedEmoji = useAppSelector((state) => state.selectedEmoji.emoji);


     console.log("Selected Emoji:", selectedEmoji); // Debugging line to check the selected emoji


    const { categories } = useAppSelector((state) => state.emojiCategories);
    const addState = useAppSelector((state) => state.addEmoji);
    const updateState = useAppSelector((state) => state.updateEmoji);

    const loading = mode === "edit" ? updateState.loading : addState.loading;
    const success = mode === "edit" ? updateState.success : addState.success;

    const [categoryId, setCategoryId] = useState<number | "">("");
    const [emojiName, setEmojiName] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    useEffect(() => {
        dispatch(getEmojiCategories({ page: 1, limit: 100 }));
    }, [dispatch]);

    useEffect(() => {
        if (mode !== "edit" || !selectedEmoji) return;
        setCategoryId(selectedEmoji.emoji_category_id);
        setEmojiName(selectedEmoji.emoji_name ?? "");
        setPreview(selectedEmoji.emoji_url ?? "");
        setFileName("Current Image");
    }, [mode, selectedEmoji]);

    useEffect(() => {
        if (!success) return;
        toast.success(mode === "edit" ? "Emoji updated successfully!" : "Emoji created successfully!");
        dispatch(mode === "edit" ? resetUpdateEmoji() : resetAddEmoji());
        dispatch(clearSelectedEmoji());
        router.push("/emojis");
    }, [success, dispatch, router, mode]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!categoryId) { toast.error("Please select a category"); return; }
        if (!emojiName.trim()) { toast.error("Please enter an emoji name"); return; }
        if (mode === "add" && !selectedImage) { toast.error("Please choose an emoji image"); return; }

        const formData = new FormData();
        formData.append("emoji_category_id", String(categoryId));
        formData.append("emoji_name", emojiName.trim());
        if (selectedImage) formData.append("emoji", selectedImage);

        try {
            if (mode === "edit") {
                await dispatch(updateEmoji({ emojiId: selectedEmoji!.emoji_id, formData })).unwrap();
            } else {
                await dispatch(addEmoji(formData)).unwrap();
            }
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    useEffect(() => {
        return () => { if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview); };
    }, [preview]);

    console.log("preview", preview)


    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {mode === "edit" ? "Edit Emoji" : "Add Emoji"}
                </h2>
            </div>

            {/* Body */}
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Category */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Emoji Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                                className="w-full h-12 rounded-[10px] border border-gray-300 bg-white px-4 pr-12 text-[#101828] outline-none appearance-none focus:border-blue-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.emoji_category_id} value={cat.emoji_category_id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* Emoji Name */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Emoji Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={emojiName}
                            onChange={(e) => setEmojiName(e.target.value.trimStart())}
                            placeholder="Enter emoji name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Emoji Image */}
                    <div className="lg:col-span-2">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Emoji Image <span className="text-red-500">*</span>
                        </label>
                        <div className="flex overflow-hidden rounded-[10px] border border-gray-300">
                            <label className="cursor-pointer border-r border-gray-300 bg-gray-100 px-5 py-3 font-medium text-[#101828] transition-colors hover:bg-gray-200">
                                Choose Image
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            <span className="flex items-center px-4 text-sm text-gray-500">{fileName}</span>
                        </div>
                        {preview && (
                            <div className="mt-4">
                                <Image
                                    src={proxiedImage(preview)!}
                                    alt="Emoji preview"
                                    width={112}
                                    height={112}
                                    unoptimized
                                    className="h-28 w-28 rounded-xl border object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => { dispatch(clearSelectedEmoji()); router.push("/emojis"); }}
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
                    ) : mode === "edit" ? "Update Emoji" : "Save Emoji"}
                </button>
            </div>
        </div>
    );
}
