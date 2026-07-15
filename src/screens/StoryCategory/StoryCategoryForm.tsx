"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { toast } from "react-hot-toast";
import { Loader2, Upload } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addStoryCategory } from "@/store/slices/StoryCategorySlices/addStoryCategoryThunk";
import { resetAddStoryCategory } from "@/store/slices/StoryCategorySlices/addStoryCategorySlice";

export default function StoryCategoryForm() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, success } = useAppSelector((state) => state.addStoryCategory);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!success) return;
        toast.success("Story category created successfully!");
        dispatch(resetAddStoryCategory());
        router.push("/story-category/all");
    }, [success, dispatch, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!name.trim()) { toast.error("Please enter a category name"); return; }
        if (!description.trim()) { toast.error("Please enter a description"); return; }
        if (!image) { toast.error("Please select an image"); return; }

        const formData = new FormData();
        formData.append("storycategory_name", name);
        formData.append("storycategory_description", description);
        formData.append("storycategory_image", image);

        try {
            await dispatch(addStoryCategory(formData)).unwrap();
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">Add Story Category</h2>
            </div>

            <div className="flex-1 p-6 space-y-6">
                {/* Image Upload */}
                <div>
                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                        Category Image <span className="text-red-500">*</span>
                    </label>
                    <div
                        onClick={() => fileRef.current?.click()}
                        className="relative flex flex-col items-center justify-center w-full h-40 rounded-[10px] border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors bg-gray-50"
                    >
                        {preview ? (
                            <Image src={proxiedImage(preview)!} alt="preview" fill unoptimized className="object-contain rounded-[10px]" />
                        ) : (
                            <>
                                <Upload size={28} className="text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Click to upload image</p>
                            </>
                        )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>

                {/* Name */}
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
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value.trimStart())}
                        placeholder="Enter category description"
                        rows={4}
                        className="w-full rounded-[10px] border border-gray-300 px-4 py-3 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500 resize-none"
                    />
                </div>
            </div>

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
                            Saving...
                        </span>
                    ) : "Save Category"}
                </button>
            </div>
        </div>
    );
}
