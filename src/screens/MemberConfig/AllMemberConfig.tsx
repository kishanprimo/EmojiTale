"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Search from "@/components/common/Search";
import TableHeader from "@/components/common/TableHeader";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Tags from "@/components/common/Tag";
import { SearchX, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { getMemberLevelConfigs } from "@/store/slices/MemberConfigSlices/member_level_config_thunk";

export default function AllMemberConfig() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getMemberLevelConfigs());
    }, [dispatch]);
    const {
        configs,
        loading,
    } = useSelector((state: RootState) => state.memberLevelConfig);

    const filtered = searchTerm
        ? configs.filter(
            (c) =>
                c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(c.level).includes(searchTerm)
        )
        : configs;
    const toggleDescription = (configId: number) => {
        setExpandedRows((prev) =>
            prev.includes(configId)
                ? prev.filter((id) => id !== configId)
                : [...prev, configId]
        );
    };
    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">
                        Member Configurations
                    </h1>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search member configs..."
                            />
                        </div>
                        <button
                            onClick={() => router.push("/member-config/add")}
                            className="flex shrink-0 items-center gap-2 rounded-[10px] bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                        >
                            <Plus size={18} />
                            Add Config
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-7 overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1100px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "Config ID" },
                                    { label: "Level Image" },
                                    { label: "Level" },
                                    { label: "Title" },
                                    { label: "Stories Required" },
                                    { label: "Display Order" },
                                    { label: "Status" },
                                    { label: "Description" },
                                    { label: "Created At" },
                                    { label: "Updated At" },
                                    { label: "Action" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={5} />
                                ) : filtered.length > 0 ? (
                                    filtered.map((config) => (
                                        <tr key={config.config_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{config.config_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                                                    <Image
                                                        src={config.level_image}
                                                        alt={config.title}
                                                        width={40}
                                                        height={40}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                                {config.level}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                                                {config.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#475467]">
                                                {config.stories_required}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#475467]">
                                                {config.display_order}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={config.is_active ? "Active" : "Inactive"}
                                                    variant={config.is_active ? "emerald" : "red"}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#667085] max-w-[260px]">
                                                <p
                                                    className={
                                                        expandedRows.includes(config.config_id)
                                                            ? ""
                                                            : "line-clamp-2"
                                                    }
                                                >
                                                    {config.description}
                                                </p>

                                                {config.description.length > 60 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDescription(config.config_id)}
                                                        className="mt-1 text-xs font-medium text-[#2563EB] hover:underline"
                                                    >
                                                        {expandedRows.includes(config.config_id)
                                                            ? "Show Less"
                                                            : "... Read More"}
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(config.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(config.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(config.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(config.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => router.push(`/member-config/edit/${config.config_id}`)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#667085] transition-colors hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={11} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX size={30} className="text-[#2563EB]" />
                                                </div>
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Configs Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">
                                                    {searchTerm ? `No results for "${searchTerm}"` : "No member configurations available."}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
