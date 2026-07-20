"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Users, ArrowLeft, Save, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { updateMemberLevelConfig } from "@/store/slices/MemberConfigSlices/update_member_level_config_thunk";
import { getMemberLevelConfigs } from "@/store/slices/MemberConfigSlices/member_level_config_thunk";
import { UpdateMemberLevelConfigPayload } from "@/types/MemberConfigTypes/update_member_level_config_types";

interface Props {
    configId: number;
}

export default function EditMemberConfig({ configId }: Props) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { configs, loading: fetchLoading } = useSelector(
        (state: RootState) => state.memberLevelConfig
    );
    const { loading } = useSelector(
        (state: RootState) => state.updateMemberLevelConfig
    );

    useEffect(() => {
        if (configs.length === 0) {
            dispatch(getMemberLevelConfigs());
        }
    }, [dispatch, configs.length]);

    const existing = useMemo(
        () => configs.find((item) => item.config_id === configId),
        [configs, configId]
    );

    const [currentImage, setCurrentImage] = useState("");
    const [form, setForm] = useState({
        level: "",
        title: "",
        stories_required: "",
        display_order: "",
        description: "",
        is_active: true,
        level_image: null as File | null,
    });

    useEffect(() => {
        if (!existing) return;
        setForm({
            level: String(existing.level),
            title: existing.title,
            stories_required: String(existing.stories_required),
            display_order: String(existing.display_order),
            description: existing.description,
            is_active: existing.is_active,
            level_image: null,
        });
        setCurrentImage(existing.level_image);
    }, [existing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0] ?? null;
            setForm((prev) => ({ ...prev, level_image: file }));
            return;
        }
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!existing) return;

        // Only include fields that changed
        const payload: UpdateMemberLevelConfigPayload = { configId };

        if (Number(form.level) !== existing.level)
            payload.level = Number(form.level);

        if (form.title !== existing.title)
            payload.title = form.title;

        if (Number(form.stories_required) !== existing.stories_required)
            payload.stories_required = Number(form.stories_required);

        if (Number(form.display_order) !== existing.display_order)
            payload.display_order = Number(form.display_order);

        if (form.description !== existing.description)
            payload.description = form.description;

        if (form.is_active !== existing.is_active)
            payload.is_active = form.is_active;

        if (form.level_image)
            payload.level_image = form.level_image;

        const result = await dispatch(updateMemberLevelConfig(payload));
        if (updateMemberLevelConfig.fulfilled.match(result)) {
            router.push("/member-config/all");
        }
    };

    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50 px-4 sm:px-8 pt-4 pb-12 font-inter">

                <button
                    onClick={() => router.push("/member-config/all")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                >
                    <ArrowLeft size={16} />
                    Back to Member Configurations
                </button>

                {fetchLoading && !existing ? (
                    <div className="flex items-center justify-center py-32 text-sm text-[#667085]">Loading...</div>
                ) : !existing && !fetchLoading ? (
                    <div className="flex items-center justify-center py-32 text-sm text-red-500">Config not found.</div>
                ) : (
                    <>
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
                                <Users size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-[24px] font-semibold text-[#101828] font-poppins">Edit Member Config</h1>
                                <p className="text-sm text-[#667085]">Update the member level configuration.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">

                            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-6 h-fit">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
                                    <Users size={22} className="text-white" />
                                </div>
                                <h2 className="text-base font-semibold text-[#101828]">Member Level Config</h2>
                                <p className="mt-1 text-sm text-[#475467]">
                                    Only changed fields will be sent to the server on update.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    <div>
                                        <h3 className="text-lg font-semibold text-[#101828]">Update Level Details</h3>
                                        <p className="mt-1 text-sm text-[#667085]">Modify the fields below and click Update to save.</p>
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
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#101828] placeholder-gray-400 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Level Image */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#344054]">Level Image</label>
                                        <div className="rounded-xl border border-gray-300 overflow-hidden">
                                            <div className="flex items-center">
                                                <label
                                                    htmlFor="level_image"
                                                    className="cursor-pointer border-r border-gray-300 bg-gray-50 px-5 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100"
                                                >
                                                    Choose Image
                                                </label>
                                                <span className="px-4 text-sm text-gray-500 truncate">
                                                    {form.level_image ? form.level_image.name : "Current image"}
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
                                            {(form.level_image || currentImage) && (
                                                <div className="border-t border-gray-200 bg-gray-50 p-5">
                                                    <img
                                                        src={form.level_image ? URL.createObjectURL(form.level_image) : currentImage}
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
                                            maxLength={1000}
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            required
                                            rows={3}
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
                                            className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Save size={16} />
                                            {loading ? "Updating..." : "Update"}
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
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
