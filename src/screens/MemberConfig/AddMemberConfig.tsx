"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { addMemberLevelConfig } from "@/store/slices/MemberConfigSlices/add_member_level_config_thunk";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Users, ArrowLeft, Save, X } from "lucide-react";

export default function AddMemberConfig() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading } = useSelector(
        (state: RootState) => state.addMemberLevelConfig
    );
    const [form, setForm] = useState({
        level: "",
        title: "",
        stories_required: "",
        display_order: "",
        description: "",
        is_active: true,
        level_image: null as File | null,
    });
    const previewImage = useMemo(() => {
        if (!form.level_image) return null;
        return URL.createObjectURL(form.level_image);
    }, [form.level_image]);
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0] ?? null;

            if (file && !file.type.startsWith("image/")) {
                alert("Please select a valid image.");
                return;
            }

            setForm((prev) => ({
                ...prev,
                level_image: file,
            }));

            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!form.level_image) {
            alert("Please select an image");
            return;
        }

        const result = await dispatch(
            addMemberLevelConfig({
                level: Number(form.level),
                stories_required: Number(
                    form.stories_required
                ),
                title: form.title,
                description: form.description,
                display_order: Number(
                    form.display_order
                ),
                is_active: form.is_active,
                level_image: form.level_image,
            })
        );

        if (addMemberLevelConfig.fulfilled.match(result)) {
            router.push("/member-config/all");
        }
    };
    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50 px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Back */}
                <button
                    onClick={() => router.push("/member-config/all")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                >
                    <ArrowLeft size={16} />
                    Back to Member Configurations
                </button>

                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
                        <Users size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-[24px] font-semibold text-[#101828] font-poppins">Add Member Config</h1>
                        <p className="text-sm text-[#667085]">Create a new member level configuration.</p>
                    </div>
                </div>

                {/* Two-panel layout */}
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">

                    {/* Left Info Panel */}
                    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-6 h-fit">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
                            <Users size={22} className="text-white" />
                        </div>
                        <h2 className="text-base font-semibold text-[#101828]">Member Level Config</h2>
                        <p className="mt-1 text-sm text-[#475467]">
                            Define a new member level with required stories, display order, and a level image.
                        </p>
                    </div>

                    {/* Right Form Panel */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <h3 className="text-lg font-semibold text-[#101828]">Level Details</h3>
                                <p className="mt-1 text-sm text-[#667085]">Fill in the details for the new member level.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Level */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                                        Level <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="level"
                                        value={form.level}
                                        onChange={handleChange}
                                        required
                                        min={1}
                                        placeholder="e.g. 1"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#101828] placeholder-gray-400 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                                    />
                                </div>

                                {/* Display Order */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                                        Display Order <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="display_order"
                                        value={form.display_order}
                                        onChange={handleChange}
                                        required
                                        min={1}
                                        placeholder="e.g. 1"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#101828] placeholder-gray-400 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                                    />
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Story Starter"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#101828] placeholder-gray-400 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                                    />
                                </div>

                                {/* Stories Required */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                                        Stories Required <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="stories_required"
                                        value={form.stories_required}
                                        onChange={handleChange}
                                        required
                                        min={1}
                                        placeholder="e.g. 10"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#101828] placeholder-gray-400 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                                    />
                                </div>
                            </div>

                            {/* Level Image URL */}
                            {/* Level Image */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#344054]">
                                    Level Image <span className="text-red-500">*</span>
                                </label>

                                <div className="rounded-xl border border-gray-300 overflow-hidden">

                                    {/* File Picker */}
                                    <div className="flex items-center">

                                        <label
                                            htmlFor="level_image"
                                            className="cursor-pointer border-r border-gray-300 bg-gray-50 px-5 py-3 text-sm text-gray-500 font-medium hover:bg-gray-100"
                                        >
                                            Choose Image
                                        </label>

                                        <span className="px-4 text-sm text-gray-500 truncate">
                                            {form.level_image
                                                ? form.level_image.name
                                                : "No file chosen"}
                                        </span>

                                        <input
                                            id="level_image"
                                            type="file"
                                            name="level_image"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </div>

                                    {/* Preview */}

                                    {previewImage && (
                                        <div className="border-t border-gray-200 bg-gray-50 p-5">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="h-28 w-28 rounded-xl border object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    maxLength={1000}
                                    placeholder="Enter level description..."
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#101828] placeholder-gray-400 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 resize-none"
                                />

                                <div className="mt-1 text-right text-xs text-gray-500">
                                    {form.description.length}/1000
                                </div>
                            </div>

                            {/* Is Active */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    name="is_active"
                                    checked={form.is_active}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-[#344054]">
                                    Active
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                                >
                                    <Save size={16} />
                                    {loading ? "Saving..." : "Save Config"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push("/member-config/all")}
                                    className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#344054] transition hover:bg-gray-50"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
