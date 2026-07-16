"use client";

import React, { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTheme } from "@/store/slices/ThemeSlices/addThemeThunk";
import { resetAddTheme } from "@/store/slices/ThemeSlices/addThemeSlice";
import { updateTheme } from "@/store/slices/ThemeSlices/updateThemeThunk";
import { resetUpdateTheme } from "@/store/slices/ThemeSlices/updateThemeSlice";
import { clearSelectedTheme } from "@/store/slices/ThemeSlices/selectedThemeSlice";


type ThemeFormProps = {
    mode?: "add" | "edit";
};

export default function ThemeForm({ mode = "add" }: ThemeFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const selectedTheme = useAppSelector((state) => state.selectedTheme.theme);
    const addState = useAppSelector((state) => state.addTheme);
    const updateState = useAppSelector((state) => state.updateTheme);

    const loading = mode === "edit" ? updateState.loading : addState.loading;
    const success = mode === "edit" ? updateState.success : addState.success;

    const [name, setName] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    // Prefill on edit
    useEffect(() => {
        if (mode !== "edit" || !selectedTheme) return;
        setName(selectedTheme.theme_name);
        setPreview((selectedTheme.theme_image) ?? "");
        setFileName("Current Image");
    }, [mode, selectedTheme]);

    // Handle success
    useEffect(() => {
        if (!success) return;
        toast.success(mode === "edit" ? "Theme updated successfully!" : "Theme created successfully!");
        dispatch(mode === "edit" ? resetUpdateTheme() : resetAddTheme());
        dispatch(clearSelectedTheme());
        router.push("/themes");
    }, [success, dispatch, router, mode]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("Please enter a theme name");
            return;
        }
        if (mode === "add" && !selectedImage) {
            toast.error("Please choose a theme image");
            return;
        }

        const formData = new FormData();
        formData.append("theme_name", name);
        if (selectedImage) formData.append("theme_image", selectedImage);

        try {
            if (mode === "edit") {
                await dispatch(updateTheme({ themeId: selectedTheme!.theme_id, formData })).unwrap();
            } else {
                await dispatch(addTheme(formData)).unwrap();
            }
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    useEffect(() => {
        return () => { if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview); };
    }, [preview]);

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {mode === "edit" ? "Edit Theme" : "Add Theme"}
                </h2>
            </div>

            {/* Body */}
            <div className="flex-1 p-6">
                <div className="space-y-7">

                    {/* Theme Name */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Theme Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value.trimStart())}
                            placeholder="Enter theme name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Theme Image */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Theme Image <span className="text-red-500">*</span>
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
                                    alt="Theme preview"
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
                    onClick={() => {
                        dispatch(clearSelectedTheme());
                        router.push("/themes");
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
                    ) : mode === "edit" ? "Update Theme" : "Save Theme"}
                </button>
            </div>
        </div>
    );
}
