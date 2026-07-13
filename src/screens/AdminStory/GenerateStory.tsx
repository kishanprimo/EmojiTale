"use client";

import React, { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, ChevronDown, Sparkles, ImageIcon } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { generateAdminStory } from "@/store/slices/AdminStorySlices/generateStoryThunk";
import { resetGenerateStory } from "@/store/slices/AdminStorySlices/generateStorySlice";

export default function GenerateStory() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { loading, success } = useAppSelector((state) => state.generateStory);

    const [categoryId, setCategoryId] = useState<number | "">("");
    const [isActive, setIsActive] = useState(true);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    useEffect(() => {
        if (!success) return;
        toast.success("Story generated successfully!");
        dispatch(resetGenerateStory());
        router.push("/admin-story/all");
    }, [success, dispatch, router]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!categoryId) {
            toast.error("Please enter a story category ID");
            return;
        }
        if (!selectedImage) {
            toast.error("Please choose an image");
            return;
        }
        const formData = new FormData();
        formData.append("storycategory_id", String(categoryId));
        formData.append("is_active", String(isActive));
        formData.append("image", selectedImage);
        try {
            await dispatch(generateAdminStory(formData)).unwrap();
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    useEffect(() => {
        return () => { if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview); };
    }, [preview]);

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF]">
                        <Sparkles size={20} className="text-[#2563EB]" />
                    </div>
                    <div>
                        <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Generate Story</h1>
                        <p className="text-sm text-[#667085]">Upload an image and select a category to auto-generate a story.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

                    {/* Left — Form */}
                    <div className="bg-white border border-gray-200 rounded-2xl flex flex-col">
                        <div className="border-b border-gray-100 px-6 py-5">
                            <h2 className="text-[17px] font-semibold text-[#101828]">Story Details</h2>
                            <p className="text-sm text-[#667085] mt-0.5">Fill in the details to generate a new story</p>
                        </div>

                        <div className="flex-1 p-6 space-y-6">
                            {/* Category ID */}
                            <div>
                                <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                    Story Category ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : "")}
                                    placeholder="Enter category ID (e.g. 1)"
                                    className="w-full h-12 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block mb-2 text-[14px] font-semibold text-gray-700">Status</label>
                                <div className="relative">
                                    <select
                                        value={String(isActive)}
                                        onChange={(e) => setIsActive(e.target.value === "true")}
                                        className="w-full h-12 rounded-[10px] border border-gray-300 bg-white px-4 pr-12 text-[#101828] outline-none appearance-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                    <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                    Story Image <span className="text-red-500">*</span>
                                </label>
                                <div className="flex overflow-hidden rounded-[10px] border border-gray-300">
                                    <label className="cursor-pointer border-r border-gray-300 bg-gray-100 px-5 py-3 text-sm font-medium text-[#101828] transition-colors hover:bg-gray-200">
                                        Choose Image
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                    <span className="flex items-center px-4 text-sm text-gray-500 truncate">{fileName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => router.push("/admin-story/all")}
                                className="rounded-[10px] border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`flex items-center gap-2 rounded-[10px] px-6 py-2 text-sm font-medium text-white transition-all ${loading ? "cursor-not-allowed bg-blue-300" : "bg-[#2563EB] hover:bg-[#1D4ED8]"}`}
                            >
                                {loading ? (
                                    <><Loader2 size={16} className="animate-spin" /> Generating...</>
                                ) : (
                                    <><Sparkles size={16} /> Generate Story</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right — Preview */}
                    <div className="bg-white border border-gray-200 rounded-2xl flex flex-col">
                        <div className="border-b border-gray-100 px-6 py-5">
                            <h2 className="text-[17px] font-semibold text-[#101828]">Image Preview</h2>
                            <p className="text-sm text-[#667085] mt-0.5">Selected image will appear here</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center p-6">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full max-h-[300px] rounded-xl object-cover border border-gray-200 shadow-sm"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200">
                                        <ImageIcon size={32} className="text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-400">No image selected</p>
                                </div>
                            )}
                        </div>
                        <div className="mx-6 mb-6 rounded-xl bg-[#EEF4FF] border border-blue-100 p-4">
                            <p className="text-xs font-semibold text-[#2563EB] mb-1">How it works</p>
                            <p className="text-xs text-[#3B82F6] leading-relaxed">
                                Upload an image and provide a category ID. The system will automatically generate a story title and content based on the image.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
