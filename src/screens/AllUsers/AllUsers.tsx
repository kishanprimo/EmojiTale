"use client";
import React from "react";
import axios from "@/lib/axiosConfiguration";
import DateTime from "@/components/common/DateTime";
import { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/navigation";
import Search from "@/components/common/Search";
import StatsCard from "@/components/common/StatsCard";
import TableHeader from "@/components/common/TableHeader";
import Name from "@/components/common/Name";
import Tags from "@/components/common/Tag";
import Action from "@/components/common/Action";
import Pagination from "@/components/common/Pagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUsers } from "@/store/slices/UserSlice/userThunk";
import TableSkeleton from "@/components/common/TableSkeleton";
import {
    Users,
    UserCheck,
    Globe,
    MessageSquare,
    Download,
    ChevronDown,
    SearchX,
    ChevronRight
} from "lucide-react";
import InfoModal from "@/components/common/InfoModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getMembers } from "@/store/slices/UserSlice/memberThunk";
import { useDebounce } from "@/hooks/useDebounce";

export default function AllUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 1000);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [exportOpen, setExportOpen] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        users,
        cards,
        pagination,
        loading,
    } = useAppSelector((state) => state.users);
    const {
        members,
    } = useAppSelector((state) => state.members);
    const handleExportPDF = async () => {
        const allUsers = await fetchAllUsers();
        const doc = new jsPDF("landscape");

        doc.setFontSize(18);
        doc.text("All Users Report", 14, 18);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 26);

        autoTable(doc, {
            startY: 34,
            head: [[
                "Full Name",
                "Username",
                "Email",
                "Login Type",
                "Plan",
                "Status",
                "XP",
                "RevenueCat ID",
                "Created At",
                "Expires At",
            ]],
            body: allUsers.map((user: {
                fullname: string | null;
                username: string | null;
                email: string;
                login_type: string;
                is_premium: boolean;
                is_deleted: boolean;
                xp: number;
                revenuecat_customer_id: string | null;
                createdAt: string | null;
                subscription_expires_at: string | null;
            }) => [
                    user.fullname || "N/A",
                    user.username || "—",
                    user.email,
                    user.login_type,
                    user.is_premium ? "Premium" : "Free",
                    user.is_deleted ? "Inactive" : "Active",
                    user.xp,
                    user.revenuecat_customer_id ?? "N/A",
                    user.createdAt
                        ? new Date(user.createdAt).toLocaleString("en-US", {
                            day: "2-digit", month: "short", year: "numeric",
                            hour: "numeric", minute: "2-digit", hour12: true,
                        })
                        : "-",
                    user.subscription_expires_at
                        ? new Date(user.subscription_expires_at).toLocaleString("en-US", {
                            day: "2-digit", month: "short", year: "numeric",
                            hour: "numeric", minute: "2-digit", hour12: true,
                        })
                        : "-",
                ]),
            headStyles: { fillColor: [37, 99, 235] },
            styles: { fontSize: 9, cellPadding: 3 },
        });

        doc.save("All_Users_Report.pdf");
    };
    const handleExportCSV = async () => {
        const allUsers = await fetchAllUsers();
        const headers = [
            "Full Name",
            "Username",
            "Email",
            "Login Type",
            "Plan",
            "Status",
            "XP",
            "RevenueCat ID",
            "Created At",
            "Expires At",
        ];

        const rows = allUsers.map((user: {
            fullname: string | null;
            username: string | null;
            email: string;
            login_type: string;
            is_premium: boolean;
            is_deleted: boolean;
            xp: number;
            revenuecat_customer_id: string | null;
            createdAt: string | null;
            subscription_expires_at: string | null;
        }) => [
                user.fullname || "N/A",
                user.username || "—",
                user.email,
                user.login_type,
                user.is_premium ? "Premium" : "Free",
                user.is_deleted ? "Inactive" : "Active",
                user.xp,
                user.revenuecat_customer_id ?? "N/A",
                user.createdAt ? new Date(user.createdAt).toLocaleString() : "-",
                user.subscription_expires_at ? new Date(user.subscription_expires_at).toLocaleString() : "-",
            ]);

        const csvContent = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map((value: any) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "All_Users_Report.csv";
        link.click();

        window.URL.revokeObjectURL(url);
    };
    const fetchAllUsers = async () => {
        const response = await axios.post("/admin/users", {
            page: 1,
            limit: pagination.total,
            search: debouncedSearch,
        });
        return response.data.data.records;
    };
    const stats = [
        {
            label: "Total Users",
            value: cards.total_users.total.toString(),
            change: cards.total_users.percentChange,
            icon: <Users size={24} className="text-[#2563EB]" />,
            bg: "bg-[#EFF6FF]",
        },

        {
            label: "Active Users",
            value: cards.active_users.total.toString(),

            icon: <UserCheck size={24} className="text-emerald-600" />,
            bg: "bg-[#ECFDF5]",
        },

        {
            label: "All Conversations",
            value: cards.total_conversations.total.toString(),
            change: cards.total_conversations.percentChange,
            icon: (
                <MessageSquare
                    size={24}
                    className="text-violet-600"
                />
            ),
            bg: "bg-violet-50",
        },

        {
            label: "Domains",
            value: cards.total_domains.total.toString(),

            icon: <Globe size={24} className="text-orange-600" />,
            bg: "bg-[#FFF7ED]",
        },
    ];
    useEffect(() => {
        setSelectedUsers([]);

        dispatch(
            getUsers({
                page,
                limit,
                search: debouncedSearch,
            })
        );
    }, [dispatch, page, limit, debouncedSearch]);
    const isAllSelected =
        users.length > 0 &&
        selectedUsers.length === users.length;

    const isIndeterminate =
        selectedUsers.length > 0 &&
        selectedUsers.length < users.length;
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const toggleRow = (id: number) => {

        if (expandedRows.includes(id)) {

            setExpandedRows(
                expandedRows.filter((x) => x !== id)
            );

            return;
        }

        setExpandedRows([...expandedRows, id]);

        if (!members[id]) {

            dispatch(
                getMembers({
                    userId: id,
                    page: 1,
                    limit: 10,
                })
            );

        }

    };
    const dummyMembers = [
        {
            id: 1,
            avatar: "",
            name: "John Doe",
            gender: "Male",
            age_group: "18-25",
            relationship: "Friend",
            current_streak: 12,
            last_story_at: "09 Jul 2026",
            streak_updated_at: "09 Jul 2026",
            created_at: "01 Jul 2026",
            updated_at: "09 Jul 2026",
        },
        {
            id: 2,
            avatar: "",
            name: "Emily Watson",
            gender: "Female",
            age_group: "26-35",
            relationship: "Sister",
            current_streak: 4,
            last_story_at: "08 Jul 2026",
            streak_updated_at: "09 Jul 2026",
            created_at: "02 Jul 2026",
            updated_at: "09 Jul 2026",
        },
        {
            id: 3,
            avatar: "",
            name: "Michael Brown",
            gender: "Male",
            age_group: "36-45",
            relationship: "Father",
            current_streak: 31,
            last_story_at: "07 Jul 2026",
            streak_updated_at: "09 Jul 2026",
            created_at: "03 Jul 2026",
            updated_at: "09 Jul 2026",
        },
        {
            id: 4,
            avatar: "",
            name: "Sophia Wilson",
            gender: "Female",
            age_group: "18-25",
            relationship: "Friend",
            current_streak: 6,
            last_story_at: "09 Jul 2026",
            streak_updated_at: "09 Jul 2026",
            created_at: "05 Jul 2026",
            updated_at: "09 Jul 2026",
        },
        {
            id: 5,
            avatar: "",
            name: "David Lee",
            gender: "Male",
            age_group: "46-55",
            relationship: "Brother",
            current_streak: 18,
            last_story_at: "06 Jul 2026",
            streak_updated_at: "09 Jul 2026",
            created_at: "04 Jul 2026",
            updated_at: "09 Jul 2026",
        },
    ];
    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12 font-inter">

                {/* Header */}

                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">
                        All Users
                    </h1>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">

                        <div className="flex-1 lg:max-w-sm">
                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search users by Name..."
                            />
                        </div>

                        <div className="relative shrink-0">

                            <button
                                onClick={() => setExportOpen(!exportOpen)}
                                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-[10px] text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Download size={18} />
                                Export
                                <ChevronDown
                                    size={16}
                                    className={`transition ${exportOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {exportOpen && (
                                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">

                                    <button
                                        onClick={() => {
                                            handleExportPDF();
                                            setExportOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#344054] hover:bg-gray-50 hover:text-[#101828] transition-colors"
                                    >
                                        Export as PDF
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleExportCSV();
                                            setExportOpen(false);
                                        }}
                                        className="w-full border-t border-gray-100 px-4 py-3 text-left text-sm font-medium text-[#344054] hover:bg-gray-50 hover:text-[#101828] transition-colors"
                                    >
                                        Export as CSV
                                    </button>

                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Stats */}

                {loading ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-pulse">

                        {[...Array(4)].map((_, index) => (

                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl p-6"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="h-14 w-14 rounded-xl bg-gray-200" />

                                    <div className="flex-1">

                                        <div className="h-4 w-24 rounded bg-gray-200" />

                                        <div className="mt-3 h-8 w-16 rounded bg-gray-200" />

                                        <div className="mt-3 h-3 w-24 rounded bg-gray-100" />

                                    </div>

                                </div>
                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="mb-8">
                        <StatsCard
                            stats={stats}
                            cols={4}
                        />
                    </div>

                )}

                <div className="mt-7 bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1450px] w-full text-left border-collapse">

                            <TableHeader
                                columns={[
                                    { label: "Avatar" },
                                    { label: "Name" },
                                    { label: "Email" },
                                    { label: "Login Type" },
                                    { label: "Plan" },
                                    { label: "Status" },
                                    { label: "XP" },
                                    { label: "RevenueCat ID" },
                                    { label: "Created At" },
                                    { label: "Expires At" },
                                    { label: "Action", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={() => {
                                    if (isAllSelected) {
                                        setSelectedUsers([]);
                                    } else {
                                        setSelectedUsers(users.map((user) => user.user_id));
                                    }
                                }}
                            />
                            <tbody className="divide-y divide-gray-100">

                                {loading ? (

                                    <TableSkeleton rows={limit} />

                                ) : users.length > 0 ? (
                                    users.map((user) => (
                                        <React.Fragment key={user.user_id}>
                                            <tr
                                                className={`transition-all duration-200 hover:bg-[#F9FAFB] ${expandedRows.includes(user.user_id)
                                                    ? "bg-[#FCFCFD]"
                                                    : "bg-white"
                                                    }`}
                                            >
                                                {/* Checkbox */}
                                                <td className="px-4 py-4">
                                                    <button
                                                        onClick={() => toggleRow(user.user_id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 transition-all cursor-pointer"
                                                    >
                                                        <ChevronRight
                                                            size={18}
                                                            className={`transition-transform duration-300 ${expandedRows.includes(user.user_id)
                                                                ? "rotate-90 text-[#2563EB]"
                                                                : "text-gray-500"
                                                                }`}
                                                        />
                                                    </button>
                                                </td>

                                                {/* Avatar */}
                                                <td className="px-4 py-5">
                                                    {user.avatar ? (
                                                        <img
                                                            src={user.avatar}
                                                            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                                                            alt="avatar"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-semibold text-sm">
                                                            {(user.fullname || user.username || "U").charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Name */}
                                                <td className="px-4 py-5">
                                                    <p className="text-sm font-medium text-[#101828]">
                                                        {user.fullname || "N/A"}
                                                    </p>
                                                    <p className="text-xs text-[#667085] mt-0.5">
                                                        {user.username || "—"}
                                                    </p>
                                                </td>

                                                {/* Email */}
                                                <td className="px-4 py-5 text-sm text-[#475467]">
                                                    {user.email}
                                                </td>

                                                {/* Login Type */}
                                                <td className="px-4 py-5">
                                                    <Tags
                                                        text={user.login_type}
                                                        variant="blue"
                                                    />
                                                </td>

                                                {/* Plan */}
                                                <td className="px-4 py-5">
                                                    <Tags
                                                        text={user.is_premium ? "Premium" : "Free"}
                                                        variant={user.is_premium ? "emerald" : "blue"}
                                                    />
                                                </td>

                                                {/* Deleted */}
                                                <td className="px-4 py-5">
                                                    <Tags
                                                        text={user.is_deleted ? "Inactive" : "Active"}
                                                        variant={user.is_deleted ? "red" : "green"}
                                                    />
                                                </td>

                                                {/* XP */}
                                                <td className="px-4 py-5 text-sm font-semibold text-[#101828]">
                                                    {user.xp}
                                                </td>

                                                {/* RevenueCat */}
                                                <td className="pl-14 px-4 py-5 text-sm text-[#667085]">
                                                    {user.revenuecat_customer_id ?? "N/A"}
                                                </td>

                                                {/* Created At */}
                                                <td className="px-4 py-5">
                                                    {user.createdAt ? (
                                                        <DateTime
                                                            date={new Date(user.createdAt).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "2-digit",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                            time={new Date(user.createdAt).toLocaleTimeString(
                                                                "en-US",
                                                                {
                                                                    hour: "numeric",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                }
                                                            )}
                                                        />
                                                    ) : (
                                                        <span className="text-[#98A2B3]">
                                                            N/A
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Expires At */}
                                                <td className="pl-10 px-4 py-5 text-sm text-[#98A2B3]">
                                                    {user.subscription_expires_at ? (
                                                        <DateTime
                                                            date={new Date(user.subscription_expires_at).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                            time={new Date(user.subscription_expires_at).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            })}
                                                        />
                                                    ) : (
                                                        <span className="text-[#98A2B3]">N/A</span>
                                                    )}
                                                </td>

                                                {/* Action */}
                                                <td className="px-4 py-5 text-center">
                                                    <Action
                                                        showView
                                                        showDelete
                                                        showEdit={false}
                                                        onView={() =>
                                                            router.push(`/user-view?user_id=${user.user_id}`)
                                                        }
                                                        onDelete={() => { }}
                                                    />
                                                </td>
                                            </tr>
                                            {expandedRows.includes(user.user_id) && (
                                                <tr>
                                                    <td colSpan={14}>
                                                        <div className="mx-8 mt-6">
                                                            <div className="mx-auto mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                                                                <div className="flex items-center justify-between border-b border-gray-200 bg-[#F8FAFC] px-6 py-4">
                                                                    <div>
                                                                        <h3 className="text-sm font-semibold text-[#101828]">
                                                                            Child Members
                                                                        </h3>
                                                                        <p className="text-xs text-[#667085]">
                                                                            Total Members : {(members[user.user_id] || []).length}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {(members[user.user_id] || []).length === 0 ? (
                                                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                                                        <p className="text-sm font-medium text-[#667085]">No Members</p>
                                                                        <p className="text-xs text-[#98A2B3] mt-1">This user has no child members.</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="overflow-x-auto">
                                                                        <table className="min-w-[1300px] w-full text-sm">
                                                                            <thead className="bg-[#F8FAFC] border-b border-gray-200">
                                                                                <tr className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
                                                                                    <th className="px-5 py-3 text-left">Avatar</th>
                                                                                    <th className="px-5 py-3 text-left">Name</th>
                                                                                    <th className="px-5 py-3 text-left">Gender</th>
                                                                                    <th className="px-5 py-3 text-left">Age Group</th>
                                                                                    <th className="px-5 py-3 text-left">Relationship</th>
                                                                                    <th className="px-5 py-3 text-left">Current Streak</th>
                                                                                    <th className="px-5 py-3 text-left">Last Story At</th>
                                                                                    <th className="px-5 py-3 text-left">Streak Updated At</th>
                                                                                    <th className="px-5 py-3 text-left">Created At</th>
                                                                                    <th className="px-5 py-3 text-left">Updated At</th>
                                                                                </tr>
                                                                            </thead>

                                                                            <tbody>
                                                                                {(members[user.user_id] || []).map((member) => (
                                                                                    <tr
                                                                                        key={member.member_id}
                                                                                        className="border-b border-gray-100 hover:bg-[#F9FAFB] transition-colors"
                                                                                    >
                                                                                        <td className="px-5 py-4">
                                                                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-sm font-semibold text-white shrink-0">
                                                                                                {member.fullname.charAt(0)}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td className="px-5 py-4 font-medium text-[#101828]">
                                                                                            {member.fullname}
                                                                                        </td>

                                                                                        <td className="px-5 py-4">
                                                                                            <Tags
                                                                                                text={member.gender}
                                                                                                variant={member.gender === "Male" ? "blue" : "purple"}
                                                                                            />
                                                                                        </td>

                                                                                        <td className="px-5 py-4 text-[#475467]">{member.age_group ?? "N/A"}</td>

                                                                                        <td className="px-5 py-4">
                                                                                            <Tags
                                                                                                text={member.relationships?.relationship_type ?? "N/A"}
                                                                                                variant="emerald"
                                                                                            />
                                                                                        </td>

                                                                                        <td className="px-5 py-4 font-semibold text-[#2563EB]">
                                                                                            {member.current_streak}
                                                                                        </td>

                                                                                        <td className="px-5 py-4 text-[#475467]">
                                                                                            {member.last_story_at
                                                                                                ? new Date(member.last_story_at).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
                                                                                                : "—"}
                                                                                        </td>

                                                                                        <td className="px-5 py-4 text-[#475467]">
                                                                                            {member.streak_updated_at
                                                                                                ? new Date(member.streak_updated_at).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
                                                                                                : "—"}
                                                                                        </td>

                                                                                        <td className="px-5 py-4 text-[#475467]">
                                                                                            {member.createdAt
                                                                                                ? new Date(member.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
                                                                                                : "—"}
                                                                                        </td>

                                                                                        <td className="px-5 py-4 text-[#475467]">
                                                                                            {member.updatedAt
                                                                                                ? new Date(member.updatedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
                                                                                                : "—"}
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={12} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX
                                                        size={30}
                                                        className="text-[#2563EB]"
                                                    />
                                                </div>

                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">
                                                    No users found
                                                </h3>

                                                <p className="mt-2 max-w-sm text-center text-[15px] text-[#667085]">
                                                    We couldn't find any users matching
                                                    <span className="text-[15px] font-bold text-[#101828]">
                                                        {" "}
                                                        "{debouncedSearch}"
                                                    </span>
                                                    . Try another search term.
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
            <InfoModal
                open={showInfoModal}
                onClose={() => setShowInfoModal(false)}
                title="View Unavailable"
                message="Viewing details is not available for agent accounts."
            />
        </DashboardLayout>
    );
}