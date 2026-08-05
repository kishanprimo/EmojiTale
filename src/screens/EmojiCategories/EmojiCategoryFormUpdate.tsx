"use client";

import React, { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
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

// Language code -> display label. Add/remove as needed.
const LANGUAGE_LABELS: Record<string, string> = {
    en: "en",
    de: "de",
    es: "es",
    fr: "fr",
    hi: "hi",
    ur: "ur",
};

export default function EmojiCategoryFormUpdate({ mode = "add" }: EmojiCategoryFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const selectedCategory = useAppSelector((state) => state.selectedEmojiCategory.category);

    const addState = useAppSelector((state) => state.addEmojiCategory);
    const updateState = useAppSelector((state) => state.updateEmojiCategory);

    const loading = mode === "edit" ? updateState.loading : addState.loading;
    const success = mode === "edit" ? updateState.success : addState.success;

    const [name, setName] = useState("");
    const [isPremium, setIsPremium] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    // Current values shown in translation inputs
    const [translations, setTranslations] = useState<Record<string, string>>({});
    // Languages the admin manually edited by hand — only these get sent on submit,
    // so backend's auto-translate isn't overwritten for untouched languages.
    const [editedLangs, setEditedLangs] = useState<Set<string>>(new Set());

    // Prefill on edit
    useEffect(() => {
        if (mode !== "edit" || !selectedCategory) return;
        setName(selectedCategory.name);
        setIsPremium(selectedCategory.is_premium ?? false);
        if (selectedCategory.emoji_category_image) {
            setPreview(selectedCategory.emoji_category_image);
            setFileName("Current Image");
        }
        setTranslations(selectedCategory.translations ?? {});
        setEditedLangs(new Set());
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

    useEffect(() => {
        return () => { if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview); };
    }, [preview]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
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
        if (!name.trim()) {
            toast.error("Please enter a category name");
            return;
        }
        if (mode === "add" && !selectedImage) {
            toast.error("Please choose a category image");
            return;
        }

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("is_premium", String(isPremium));
        if (selectedImage) formData.append("emoji_category_image", selectedImage);

        // Only send manually-edited translation keys — untouched languages are
        // left for backend's auto-translate step on name change.
        if (editedLangs.size > 0) {
            const changedTranslations: Record<string, string> = {};
            editedLangs.forEach((lang) => {
                changedTranslations[lang] = translations[lang] ?? "";
            });
            formData.append("translations", JSON.stringify(changedTranslations));
        }

        // 🔍 TEMP DEBUG — remove once the issue is confirmed/fixed
        console.log("editedLangs:", Array.from(editedLangs));
        console.log("translations state:", translations);
        for (const [key, value] of formData.entries()) {
            console.log("FormData entry ->", key, ":", value);
        }

        try {
            if (mode === "edit") {
                await dispatch(updateEmojiCategory({
                    categoryId: selectedCategory!.emoji_category_id,
                    formData,
                })).unwrap();
            } else {
                await dispatch(addEmojiCategory(formData)).unwrap();
            }
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    const languageCodes = Object.keys(
        Object.keys(selectedCategory?.translations ?? {}).length > 0
            ? selectedCategory!.translations
            : LANGUAGE_LABELS
    );

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
                        {mode === "edit" && (
                            <p className="mt-1.5 text-xs text-gray-400">
                                Changing this will auto-translate to all existing languages, unless you override a language manually below.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Category Image
                            {mode === "add" && <span className="text-red-500"> *</span>}
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
                                    alt="Category preview"
                                    width={112}
                                    height={112}
                                    unoptimized
                                    className="h-28 w-28 rounded-xl border object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-8">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={isPremium}
                                onChange={(e) => setIsPremium(e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-[15px] font-semibold text-gray-700">Premium</span>
                        </label>
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