"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAdminConfig } from "@/store/slices/AdminConfigSlices/updateAdminConfigThunk";
import { resetUpdateAdminConfig } from "@/store/slices/AdminConfigSlices/updateAdminConfigSlice";
import { Settings, ArrowLeft, Save, X, Key, Hash } from "lucide-react";

interface Props {
    configKey: string;
}

export default function EditAdminConfig({ configKey }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { loading, success, error } = useAppSelector((state) => state.updateAdminConfig);

    const [value, setValue] = useState(searchParams.get("value") ?? "");

    useEffect(() => {
        if (success) {
            dispatch(resetUpdateAdminConfig());
            router.push("/admin-config/all");
        }
    }, [success, dispatch, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateAdminConfig({ key: configKey, value }));
    };

    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50 px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Back */}
                <button
                    onClick={() => router.push("/admin-config/all")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                >
                    <ArrowLeft size={16} />
                    Back to Configurations
                </button>

                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
                        <Settings size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-[24px] font-semibold text-[#101828] font-poppins">Edit Configuration</h1>
                        <p className="text-sm text-[#667085]">Update the value for this configuration key.</p>
                    </div>
                </div>

                {/* Two-panel layout */}
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">

                    {/* Left Info Panel */}
                    <div className="flex flex-col gap-4">
                        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
                                <Settings size={22} className="text-white" />
                            </div>
                            <h2 className="text-base font-semibold text-[#101828]">Configuration Details</h2>
                            <p className="mt-1 text-sm text-[#475467]">
                                Only the value can be updated. The key is read-only and identifies this configuration.
                            </p>
                        </div>


                    </div>

                    {/* Right Form Panel */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <h3 className="text-lg font-semibold text-[#101828]">Update Value</h3>
                                <p className="mt-1 text-sm text-[#667085]">Change the value below and click Update to save.</p>
                            </div>

                            {/* Key (read-only) */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[#344054]">Key</label>
                                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                    <Key size={15} className="shrink-0 text-[#667085]" />
                                    <span className="text-sm font-medium text-[#667085]">{configKey}</span>
                                    <span className="ml-auto rounded-md bg-gray-200 px-2 py-0.5 text-xs text-gray-500">Read-only</span>
                                </div>
                            </div>

                            {/* Value */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[#344054]">
                                    Value <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                    placeholder="Enter value..."
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#101828] placeholder-gray-400 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Save size={16} />
                                    {loading ? "Updating..." : "Update"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push("/admin-config/all")}
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
