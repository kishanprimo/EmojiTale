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

export default function StoryCategoryForm({ editItem }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const isEdit = !!editItem;

    const { loading: addLoading, success: addSuccess } = useAppSelector((state) => state.addStoryCategory);
    const { loading: updateLoading, success: updateSuccess } = useAppSelector((state) => state.updateStoryCategory);

    const loading = isEdit ? updateLoading : addLoading;
    const success = isEdit ? updateSuccess : addSuccess;

    const [name, setName] = useState(editItem?.storycategory_name ?? "");
    const [description, setDescription] = useState(editItem?.storycategory_description ?? "");
    const [image, setImage] = useState<File | null>(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [preview, setPreview] = useState<string | null>(
        editItem?.storycategory_image
            ? proxiedImage(editItem.storycategory_image) ?? null
            : null
    );
    const fileRef = useRef<HTMLInputElement>(null);

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

    const handleSubmit = async () => {
        if (!name.trim()) { toast.error("Please enter a category name"); return; }
        if (!description.trim()) { toast.error("Please enter a description"); return; }
        if (!isEdit && !image) { toast.error("Please select an image"); return; }

        const formData = new FormData();
        formData.append("storycategory_name", name);
        formData.append("storycategory_description", description);
        if (image) formData.append("storycategory_image", image);
        if (isEdit) formData.append("storycategory_id", String(editItem!.storycategory_id));

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
