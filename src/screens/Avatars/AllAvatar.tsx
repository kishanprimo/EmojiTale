"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import DashboardLayout from "@/layouts/DashboardLayout";
import Search from "@/components/common/Search";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Tags from "@/components/common/Tag";
import Action from "@/components/common/Action";
import {
    setSelectedAvatar,
} from "@/store/slices/AvatarSlices/selectedAvatarSlice";

import {
    Download,
    ChevronDown,
    SearchX,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import axios from "@/lib/axiosConfiguration";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { getAvatars } from "@/store/slices/AvatarSlices/avatarThunk";

import { useDebounce } from "@/hooks/useDebounce";

export default function AllAvatar() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const {
        avatars,
        pagination,
        loading,
    } = useAppSelector((state) => state.avatars);

    const [cacheBust] = useState(() => Date.now());

    const [searchTerm, setSearchTerm] =
        useState("");

    const debouncedSearch = useDebounce(searchTerm, 1000);

    const [page, setPage] =
        useState(1);

    const [limit, setLimit] =
        useState(10);

    const [exportOpen, setExportOpen] =
        useState(false);

    // -----------------------------------
    // Fetch Avatars
    // -----------------------------------

    useEffect(() => {

        dispatch(

            getAvatars({

                page,

                limit,

            })

        );

    }, [

        dispatch,

        page,

        limit,

    ]);

    // -----------------------------------
    // Fetch All
    // -----------------------------------

    const fetchAllAvatars = async () => {

        const response =
            await axios.get(
                "/admin/avatars",
                {
                    params: {
                        page: 1,
                        limit: pagination.total,
                    },
                }
            );


        console.log("All Avatars Response:", response.data.data.records);

        return response.data.data.records;

    };

    // -----------------------------------
    // Export PDF
    // -----------------------------------

    const handleExportPDF = async () => {

        const allAvatars =
            await fetchAllAvatars();

        const doc =
            new jsPDF("landscape");

        doc.setFontSize(18);

        doc.text(
            "Avatar Report",
            14,
            18
        );

        doc.setFontSize(10);

        doc.text(
            `Generated : ${new Date().toLocaleString()}`,
            14,
            26
        );

        autoTable(doc, {

            startY: 34,

            head: [[

                "Avatar",

                "Name",

                "Gender",

                "Status",

                "Created At",

                "Updated At",

            ]],

            body: allAvatars.map((avatar: any) => [

                avatar.avatar_media,

                avatar.name,

                avatar.avatar_gender,

                avatar.status
                    ? "Active"
                    : "Inactive",

                new Date(
                    avatar.createdAt
                ).toLocaleString(),

                new Date(
                    avatar.updatedAt
                ).toLocaleString(),

            ]),

            headStyles: {

                fillColor: [37, 99, 235],

            },

            styles: {

                fontSize: 9,

                cellPadding: 3,

            },

        });

        doc.save(
            "Avatar_Report.pdf"
        );

    };

    // -----------------------------------
    // Export CSV
    // -----------------------------------

    const handleExportCSV = async () => {

        const allAvatars =
            await fetchAllAvatars();

        const headers = [

            "Avatar",

            "Name",

            "Gender",

            "Status",

            "Created At",

            "Updated At",

        ];

        const rows =
            allAvatars.map((avatar: any) => [

                avatar.avatar_media,

                avatar.name,

                avatar.avatar_gender,

                avatar.status
                    ? "Active"
                    : "Inactive",

                new Date(
                    avatar.createdAt
                ).toLocaleString(),

                new Date(
                    avatar.updatedAt
                ).toLocaleString(),

            ]);

        const csvContent = [

            headers,

            ...rows,

        ]

            .map((row) =>
                row
                    .map((value: any) =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )

            .join("\n");

        const blob =
            new Blob(
                [csvContent],
                {
                    type:
                        "text/csv;charset=utf-8;",
                }
            );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "Avatar_Report.csv";

        link.click();

        window.URL.revokeObjectURL(url);

    };

    // -----------------------------------
    // Client Search
    // -----------------------------------

    const filteredAvatars =
        avatars.filter((avatar) => {

            if (!debouncedSearch)
                return true;

            const search =
                debouncedSearch.toLowerCase();

            return (

                avatar.name
                    .toLowerCase()
                    .includes(search)

                ||

                avatar.avatar_gender
                    .toLowerCase()
                    .includes(search)

            );

        });

    return (

        <DashboardLayout>

            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12 font-inter">
                {/* Header */}

                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">
                        Avatar List
                    </h1>

                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">

                        <div className="flex-1 lg:max-w-sm">

                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search avatars..."
                            />

                        </div>

                        {/* Export */}

                        <div className="relative shrink-0">

                            <button
                                onClick={() =>
                                    setExportOpen(!exportOpen)
                                }
                                className="flex cursor-pointer items-center gap-2 rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >

                                <Download size={18} />

                                Export

                                <ChevronDown
                                    size={16}
                                    className={`transition ${exportOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />

                            </button>

                            {exportOpen && (

                                <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">

                                    <button
                                        onClick={() => {

                                            handleExportPDF();

                                            setExportOpen(false);

                                        }}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101828]"
                                    >
                                        Export as PDF
                                    </button>

                                    <button
                                        onClick={() => {

                                            handleExportCSV();

                                            setExportOpen(false);

                                        }}
                                        className="w-full border-t border-gray-100 px-4 py-3 text-left text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101828]"
                                    >
                                        Export as CSV
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

                {/* Table */}

                <div className="mt-7 overflow-hidden rounded-[10px] border border-gray-200 bg-white">

                    <div className="w-full overflow-x-auto">

                        <table className="min-w-[1450px] w-full border-collapse text-left">

                            <TableHeader
                                columns={[
                                    {
                                        label: "Avatar",
                                    },
                                    {
                                        label: "Name",
                                    },
                                    {
                                        label: "Gender",
                                    },
                                    {
                                        label: "Status",
                                    },
                                    {
                                        label: "Created At",
                                    },
                                    {
                                        label: "Updated At",
                                    },
                                    {
                                        label: "Action",
                                        className: "text-center",
                                    },
                                ]}
                            />

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (

                                    <TableSkeleton rows={limit} />

                                ) : filteredAvatars.length > 0 ? (

                                    filteredAvatars.map((avatar) => (

                                        <tr
                                            key={avatar.avatar_id}
                                            className="transition-all duration-200 hover:bg-[#F9FAFB]"
                                        >

                                            <td className="px-4 py-5">
                                                {avatar.avatar_media ? (
                                                    <Image
                                                        src={proxiedImage(avatar.avatar_media, cacheBust) ?? "/globe.svg"}
                                                        alt={avatar.name}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-sm font-semibold text-white">
                                                        {avatar.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Name */}

                                            <td className="px-4 py-5">

                                                <span className="text-sm font-medium text-[#101828]">

                                                    {avatar.name}

                                                </span>

                                            </td>

                                            {/* Gender */}

                                            <td className="px-4 py-5">

                                                <Tags
                                                    text={avatar.avatar_gender}
                                                    variant={
                                                        avatar.avatar_gender.toLowerCase() ===
                                                            "male"
                                                            ? "blue"
                                                            : "purple"
                                                    }
                                                />

                                            </td>

                                            {/* Status */}

                                            <td className="px-4 py-5">

                                                <Tags
                                                    text={
                                                        avatar.status
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                    variant={
                                                        avatar.status
                                                            ? "green"
                                                            : "red"
                                                    }
                                                />

                                            </td>

                                            {/* Created At */}

                                            <td className="px-4 py-5">

                                                <DateTime
                                                    date={new Date(
                                                        avatar.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                    time={new Date(
                                                        avatar.createdAt
                                                    ).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }
                                                    )}
                                                />

                                            </td>

                                            {/* Updated At */}

                                            <td className="px-4 py-5">

                                                <DateTime
                                                    date={new Date(
                                                        avatar.updatedAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                    time={new Date(
                                                        avatar.updatedAt
                                                    ).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }
                                                    )}
                                                />

                                            </td>

                                            {/* Action */}

                                            <td className="px-4 py-5 text-center">

                                                <Action
                                                    showEdit
                                                    showDelete={false}
                                                    showView={false}
                                                    onEdit={() => {

                                                        dispatch(
                                                            setSelectedAvatar(avatar)
                                                        );

                                                        router.push(
                                                            `/avatar/edit/${avatar.avatar_id}`
                                                        );

                                                    }}
                                                    onDelete={() => { }}
                                                />

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="py-20"
                                        >

                                            <div className="flex flex-col items-center justify-center">

                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">

                                                    <SearchX
                                                        size={30}
                                                        className="text-[#2563EB]"
                                                    />

                                                </div>

                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">

                                                    No Avatars Found

                                                </h3>

                                                <p className="mt-2 max-w-sm text-center text-[15px] text-[#667085]">

                                                    We couldn't find any avatars matching

                                                    <span className="font-bold text-[#101828]">

                                                        {" "}
                                                        "{debouncedSearch}"

                                                    </span>

                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
                <div className="mt-6 w-full">

                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        rowsPerPage={pagination.limit}
                        onPageChange={(newPage) => {

                            setPage(newPage);

                        }}
                        onRowsPerPageChange={(rows) => {

                            setLimit(rows);

                            setPage(1);

                        }}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        showRowsPerPage
                        showPageInfo
                    />

                </div>

            </div>

        </DashboardLayout>

    );

}