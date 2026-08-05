"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addStoryCategory } from "@/store/slices/StoryCategorySlices/addStoryCategoryThunk";
import { resetAddStoryCategory } from "@/store/slices/StoryCategorySlices/addStoryCategorySlice";
import { updateStoryCategory } from "@/store/slices/StoryCategorySlices/updateStoryCategoryThunk";
import { resetUpdateStoryCategory } from "@/store/slices/StoryCategorySlices/updateStoryCategorySlice";
import { StoryCategoryItem } from "@/types/StoryCategoryTypes/storyCategoryTypes";

interface Props {
    editItem?: StoryCategoryItem;
}

// Language code -> display label. Add/remove as needed.
const LANGUAGE_LABELS: Record<string, string> = {
    en: "English",
    de: "German",
    es: "Spanish",
    hi: "Hindi",
    ur: "Urdu",
};

export default function StoryCategoryFormUpdate({ editItem }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const isEdit = !!editItem;

    const { loading: addLoading, success: addSuccess } = useAppSelector((state) => state.addStoryCategory);
    const { loading: updateLoading, success: updateSuccess } = useAppSelector((state) => state.updateStoryCategory);

    const loading = isEdit ? updateLoading : addLoading;
    const success = isEdit ? updateSuccess : addSuccess;

    const [name, setName] = useState(editItem?.storycategory_name ?? "");
    const [image, setImage] = useState<File | null>(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [preview, setPreview] = useState<string | null>(
        editItem?.storycategory_image
            ? proxiedImage(editItem.storycategory_image) ?? null
            : null
    );

    // Original translations coming from backend (baseline, read-only reference)
    const originalTranslations = editItem?.translations ?? {};

    // Current values shown in inputs (starts as a copy of original)
    const [translations, setTranslations] = useState<Record<string, string>>(
        originalTranslations
    );

    // Tracks which language keys the admin has actually touched/edited by hand.
    // Only these get sent to backend, so backend's auto-translate isn't
    // clobbered for languages the admin didn't touch.
    const [editedLangs, setEditedLangs] = useState<Set<string>>(new Set());

    const fileRef = useRef<HTMLInputElement>(null);

    // Languages to render: prefer keys already present on editItem.translations,
    // fallback to full LANGUAGE_LABELS list (useful for "Add" flow)
    const languageCodes = Object.keys(
        Object.keys(originalTranslations).length > 0 ? originalTranslations : LANGUAGE_LABELS
    );

    useEffect(() => {
        if (!success) return;
        toast.success(isEdit ? "Story category updated successfully!" : "Story category created successfully!");
        if (isEdit) dispatch(resetUpdateStoryCategory());
        else dispatch(resetAddStoryCategory());
        router.push("/story-category/all");
    }, [success, dispatch, router, isEdit]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleTranslationChange = (lang: string, value: string) => {
        setTranslations((prev) => ({ ...prev, [lang]: value }));
        setEditedLangs((prev) => {
            const next = new Set(prev);
            next.add(lang);
            return next;
        });
    };

    const handleSubmit = async () => {
        if (!name.trim()) { toast.error("Please enter a category name"); return; }
        if (!isEdit && !image) { toast.error("Please select an image"); return; }

        const formData = new FormData();
        formData.append("storycategory_name", name);
        if (image) formData.append("storycategory_image", image);
        if (isEdit) formData.append("storycategory_id", String(editItem!.storycategory_id));

        // Only send translation keys the admin manually edited.
        // Untouched languages are left to backend's auto-translate step,
        // so we don't overwrite fresh auto-translated values with stale ones.
        if (editedLangs.size > 0) {
            const changedTranslations: Record<string, string> = {};
            editedLangs.forEach((lang) => {
                changedTranslations[lang] = translations[lang] ?? "";
            });
            formData.append("translations", JSON.stringify(changedTranslations));
        }

        try {
            if (isEdit) {
                await dispatch(updateStoryCategory({ id: editItem!.storycategory_id, formData })).unwrap();
            } else {
                await dispatch(addStoryCategory(formData)).unwrap();
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
                    {isEdit ? "Edit Story Category" : "Add Story Category"}
                </h2>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 space-y-7">

                {/* Category Name */}
                <div>
                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                        Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value.trimStart())}
                        placeholder="Enter category name"
                        className="w-full h-12 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                    />
                    {isEdit && (
                        <p className="mt-1.5 text-xs text-gray-400">
                            Changing this will auto-translate to all existing languages, unless you override a language manually below.
                        </p>
                    )}
                </div>

                {/* Category Image */}
                <div>
                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                        Category Image {!isEdit && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex overflow-hidden rounded-[10px] border border-gray-300">
                        <label className="cursor-pointer border-r border-gray-300 bg-gray-100 px-5 py-3 font-medium text-[#101828] transition-colors hover:bg-gray-200">
                            Choose Image
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                        <span className="flex items-center px-4 text-sm text-gray-500">{fileName}</span>
                    </div>
                    {preview && (
                        <div className="mt-4">
                            <Image
                                src={proxiedImage(preview)!}
                                alt="preview"
                                width={112}
                                height={112}
                                unoptimized
                                className="h-28 w-28 rounded-xl border object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Dynamic Language Translations */}
                {languageCodes.length > 0 && (
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Translations
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {languageCodes.map((lang) => (
                                <div key={lang}>
                                    <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-600">
                                        {LANGUAGE_LABELS[lang] ?? lang.toUpperCase()}
                                        {editedLangs.has(lang) && (
                                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                                                Edited
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        type="text"
                                        value={translations[lang] ?? ""}
                                        onChange={(e) => handleTranslationChange(lang, e.target.value)}
                                        placeholder={`Category name in ${LANGUAGE_LABELS[lang] ?? lang}`}
                                        className="w-full h-11 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push("/story-category/all")}
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
                            {isEdit ? "Updating..." : "Saving..."}
                        </span>
                    ) : isEdit ? "Update Category" : "Save Category"}
                </button>
            </div>
        </div>
    );
}