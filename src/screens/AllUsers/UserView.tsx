"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "@/store/slices/UserSlice/memberThunk";
import { AppDispatch, RootState } from "@/store/store";
import { getUserById } from "@/store/slices/UserSlice/userViewThunk";
import { clearUserView } from "@/store/slices/UserSlice/userViewSlice";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/navigation";
import {
    ArrowLeft, Mail, User, Globe, Calendar,
    Flame, BookOpen, Users, Zap, Crown, Receipt,
    Star, Hash, Smartphone, CreditCard, CheckCircle2,
    XCircle, ShieldCheck, Sparkles,
} from "lucide-react";
import Tags from "@/components/common/Tag";
import Pagination from "@/components/common/Pagination";
import TableHeader from "@/components/common/TableHeader";
import DateTime from "@/components/common/DateTime";
import { proxiedImage } from "@/lib/imageProxy";
import { getMemberStories } from "@/store/slices/UserSlice/memberStoriesThunk";


interface Props { userId: number; }

export default function UserView({ userId }: Props) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.userView);
    const {
        members,
        pagination,
        loading: membersLoading,
    } = useSelector(
        (state: RootState) => state.members
    );
    const {
        stories,
        pagination: storyPagination,
        loading: storiesLoading,
    } = useSelector(
        (state: RootState) => state.memberStories
    );
    const [memberPage, setMemberPage] = useState(1);
    const [storyPage, setStoryPage] = useState(1);
    const [membersPerPage, setMembersPerPage] = useState(5);
    const [storiesPerPage, setStoriesPerPage] = useState(5);
    const [selectedStory, setSelectedStory] = useState<any>(null);
    const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getUserById(userId));
        return () => { dispatch(clearUserView()); };
    }, [userId, dispatch]);
    useEffect(() => {
        dispatch(
            getMembers({
                userId,
                page: memberPage,
                limit: membersPerPage,
            })
        );
    }, [
        dispatch,
        userId,
        memberPage,
        membersPerPage,
    ]);
    useEffect(() => {
        dispatch(
            getMemberStories({
                userId,
                page: storyPage,
                limit: storiesPerPage,
            })
        );
    }, [
        dispatch,
        userId,
        storyPage,
        storiesPerPage,
    ]);
    const memberData = members[userId] ?? [];

    const pagedMembers = memberData;

    const storyData = stories[userId] ?? [];

    const pagedStories = storyData;

    const initials = (user?.fullname || user?.username || "U").charAt(0).toUpperCase();
    const joinDate = user ? new Date(user.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : "";
    const joinTime = user ? new Date(user.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : "";

    const sub = user?.current_plan?.subscription;
    const plan = user?.current_plan?.plan;
    const isActiveSub = sub?.status === "active";
    const subEndDate = sub?.end_date
        ? new Date(sub.end_date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
        : null;
    const subStartDate = sub?.start_date
        ? new Date(sub.start_date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
        : null;

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                {/* Back */}
                <button
                    onClick={() => router.push("/users")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Users
                </button>

                {loading && (
                    <div className="flex items-center justify-center py-20 text-sm text-[#667085]">Loading...</div>
                )}
                {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
                )}

                {user && (
                    <>
                        {/* ── Profile Hero Card ── */}
                        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                            {/* Top accent bar */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4]" />

                            <div className="p-6">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                                    {/* Left — Avatar + Info */}
                                    <div className="flex items-start gap-5">
                                        {/* Avatar */}
                                        <div className="relative shrink-0">
                                            {user.avatar?.avatar_media ? (
                                                <img
                                                    src={proxiedImage(user.avatar.avatar_media)}
                                                    alt={user.avatar.name}
                                                    className="h-[80px] w-[80px] rounded-2xl object-cover ring-4 ring-white shadow-lg"
                                                />
                                            ) : (
                                                <div className="flex h-[80px] w-[80px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-[32px] font-bold text-white shadow-lg ring-4 ring-white">
                                                    {initials}
                                                </div>
                                            )}
                                            {/* Online / status dot */}
                                            <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white shadow ${user.is_deleted ? "bg-red-400" : "bg-emerald-400"}`} />
                                        </div>

                                        {/* Name + meta */}
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h1 className="text-[22px] font-bold text-[#101828] font-poppins leading-tight">
                                                    {user.fullname || "—"}
                                                </h1>
                                                {user.is_premium && (
                                                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600 border border-amber-200">
                                                        <Sparkles size={11} />
                                                        Premium
                                                    </span>
                                                )}

                                            </div>

                                            {/* Meta row 1 */}
                                            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-[#667085]">
                                                <span className="flex items-center gap-1.5">
                                                    <Mail size={13} className="text-[#9CA3AF]" />
                                                    {user.email}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <User size={13} className="text-[#9CA3AF]" />
                                                    @{user.username || "—"}
                                                </span>

                                            </div>

                                            {/* Meta row 2 */}
                                            <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-[#667085]">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={13} className="text-[#9CA3AF]" />
                                                    Joined <span className="font-medium text-[#344054] ml-1">{joinDate}</span>
                                                    <span className="text-[#D0D5DD]">·</span>
                                                    {joinTime}
                                                </span>
                                                {user.age && (
                                                    <span className="flex items-center gap-1.5">
                                                        <User size={13} className="text-[#9CA3AF]" />
                                                        Age {user.age}
                                                    </span>
                                                )}
                                                {user.gender && (
                                                    <span className="capitalize flex items-center gap-1.5">
                                                        <ShieldCheck size={13} className="text-[#9CA3AF]" />
                                                        {user.gender}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Meta row 3 — referral + device */}
                                            <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-[#667085]">
                                                {user.referral_code && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Hash size={13} className="text-[#9CA3AF]" />
                                                        <span className="font-mono font-semibold text-[#344054] tracking-wide">{user.referral_code}</span>
                                                    </span>
                                                )}
                                                {user.device_token && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Smartphone size={13} className="text-[#9CA3AF]" />
                                                        <span className="truncate max-w-[200px] text-xs text-[#98A2B3]">{user.device_token}</span>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Status tags */}
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <Tags text={user.is_deleted ? "Inactive" : "Active"} variant={user.is_deleted ? "red" : "green"} />
                                                <Tags text={user.login_type} variant="blue" />

                                            </div>
                                        </div>
                                    </div>

                                    {/* Right — Subscription Card */}
                                    <div className="shrink-0 lg:min-w-[280px]">
                                        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#F8FAFF] to-[#EFF6FF] p-5 shadow-sm">
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                                                        <Crown size={15} className="text-amber-500" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-[#344054]">Subscription</span>
                                                </div>
                                                {isActiveSub ? (
                                                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 border border-emerald-200">
                                                        <CheckCircle2 size={11} />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500 border border-gray-200">
                                                        Free
                                                    </span>
                                                )}
                                            </div>

                                            {/* Plan name + price */}
                                            <div className="mb-3">
                                                <p className="text-xl font-bold text-[#101828]">
                                                    {user.current_plan.tier_label} Plan
                                                </p>
                                                {plan && (
                                                    <p className="mt-0.5 text-sm text-[#667085]">
                                                        <span className="font-semibold text-[#2563EB]">
                                                            {plan.currency} {plan.price}
                                                        </span>
                                                        <span className="ml-1">/ {plan.plan_type}</span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Subscription details */}
                                            {sub && (
                                                <div className="mb-4 space-y-1.5 rounded-lg bg-white/70 border border-blue-100 px-3 py-2.5">
                                                    {subStartDate && (
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-[#98A2B3]">Started</span>
                                                            <span className="font-medium text-[#344054]">{subStartDate}</span>
                                                        </div>
                                                    )}
                                                    {subEndDate && (
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-[#98A2B3]">Renews</span>
                                                            <span className="font-medium text-[#344054]">{subEndDate}</span>
                                                        </div>
                                                    )}
                                                    {sub.platform && (
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-[#98A2B3]">Platform</span>
                                                            <span className="font-medium capitalize text-[#344054]">{sub.platform}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2563EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2563EB] transition hover:bg-[#EFF6FF] shadow-sm">
                                                <Receipt size={14} />
                                                View Billing History
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* ── Stats Row ── */}
                        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                { icon: <Users size={22} className="text-[#2563EB]" />, bg: "bg-[#EFF6FF]", value: pagination?.total ?? 0, label: "Members Created" },
                                { icon: <BookOpen size={22} className="text-emerald-600" />, bg: "bg-[#ECFDF5]", value: storyPagination?.total ?? 0, label: "Stories Created" },
                                { icon: <Zap size={22} className="text-amber-500" />, bg: "bg-amber-50", value: user.xp.toLocaleString(), label: "Total XP" },

                            ].map((stat, i) => (
                                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                                        {stat.icon}
                                    </div>
                                    <p className="text-2xl font-bold text-[#101828]">{stat.value}</p>
                                    <p className="mt-0.5 text-sm text-[#667085]">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ── Members + Stories Grid ── */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    {/* Members Table */}
                    <div className="flex flex-col gap-4">
                        <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                            <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
                                <Users size={17} className="text-[#2563EB]" />
                                <h2 className="text-sm font-semibold text-[#101828]">Members ({pagination?.total ?? 0})</h2>
                            </div>
                            <div className="w-full overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <TableHeader
                                        showCheckbox={false}
                                        columns={[
                                            { label: "Image" },
                                            { label: "Name" },
                                            { label: "Gender" },
                                            { label: "Age Group" },
                                            { label: "Relation" },
                                            { label: "Streak" },
                                            { label: "Last Story" },
                                        ]}
                                    />
                                    <tbody className="divide-y divide-gray-100">

                                        {pagedMembers.map((member) => (

                                            <tr
                                                key={member.member_id}
                                                className="transition-all duration-200 hover:bg-[#F9FAFB]"
                                            >

                                                {/* IMAGE */}

                                                <td className="px-6 py-4">

                                                    {member.avatar?.avatar_media ? (

                                                        <img
                                                            src={proxiedImage(member.avatar.avatar_media)}
                                                            alt={member.fullname}
                                                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                        />

                                                    ) : (

                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-sm font-semibold text-[#2563EB]">
                                                            {member.fullname.charAt(0).toUpperCase()}
                                                        </div>

                                                    )}

                                                </td>

                                                {/* NAME */}

                                                <td className="px-6 py-4">

                                                    <p className="text-sm font-medium text-[#101828]">

                                                        {member.fullname}

                                                    </p>

                                                </td>

                                                {/* GENDER */}

                                                <td className="px-6 py-4">

                                                    <Tags
                                                        text={
                                                            member.gender.charAt(0).toUpperCase() +
                                                            member.gender.slice(1)
                                                        }
                                                        variant={
                                                            member.gender === "male"
                                                                ? "blue"
                                                                : "purple"
                                                        }
                                                    />

                                                </td>

                                                {/* AGE */}

                                                <td className="px-6 py-4 text-sm text-[#475467]">

                                                    {member.age_group ?? "N/A"} yrs

                                                </td>

                                                {/* RELATION */}

                                                <td className="px-6 py-4 text-sm text-[#475467]">

                                                    {member.relationships?.relationship_type ?? "N/A"}

                                                </td>

                                                {/* STREAK */}

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-1">

                                                        <Flame
                                                            size={13}
                                                            className="text-orange-500"
                                                        />

                                                        <span className="text-sm font-semibold text-orange-600">

                                                            {member.current_streak}

                                                        </span>

                                                    </div>

                                                </td>

                                                {/* LAST STORY */}

                                                <td className="px-6 py-4">

                                                    {member.last_story_at ? (

                                                        <DateTime
                                                            date={new Date(
                                                                member.last_story_at
                                                            ).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "2-digit",
                                                                year: "numeric",
                                                            })}
                                                            time={new Date(
                                                                member.last_story_at
                                                            ).toLocaleTimeString("en-US", {
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            })}
                                                        />

                                                    ) : (

                                                        <span className="text-sm text-[#98A2B3]">

                                                            N/A

                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination
                            currentPage={pagination?.page ?? 1}
                            totalPages={pagination?.totalPages ?? 1}
                            rowsPerPage={membersPerPage}
                            onPageChange={setMemberPage}
                            onRowsPerPageChange={(rows) => { setMembersPerPage(rows); setMemberPage(1); }}
                            showRowsPerPage
                            showPageInfo
                        />
                    </div>

                    {/* Stories Table */}
                    <div className="flex flex-col gap-4">
                        <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                            <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
                                <BookOpen size={17} className="text-emerald-600" />
                                <h2 className="text-sm font-semibold text-[#101828]">Stories ({storyPagination?.total ?? 0})</h2>
                            </div>
                            <div className="w-full overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <TableHeader
                                        showCheckbox={false}
                                        columns={[
                                            { label: "Image" },
                                            { label: "Member" },
                                            { label: "Story Title" },
                                            { label: "Content" },
                                            { label: "Public" },
                                            { label: "AI Model" },
                                            { label: "AI Cost" },
                                        ]}
                                    />
                                    <tbody className="divide-y divide-gray-100">

                                        {storiesLoading ? (

                                            <tr>

                                                <td
                                                    colSpan={7}
                                                    className="py-10 text-center text-sm text-[#667085]"
                                                >
                                                    Loading...
                                                </td>

                                            </tr>

                                        ) : (

                                            pagedStories.map((story) => (

                                                <tr
                                                    key={story.aigeneratedstory_id}
                                                    className="transition-all duration-200 hover:bg-[#F9FAFB]"
                                                >

                                                    {/* IMAGE */}

                                                    <td className="px-6 py-4">

                                                        {story.member.avatar?.avatar_media ? (

                                                            <img
                                                                src={proxiedImage(
                                                                    story.member.avatar.avatar_media
                                                                )}
                                                                alt={story.member.fullname}
                                                                className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                            />

                                                        ) : (

                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-sm font-semibold text-[#2563EB]">

                                                                {story.member.fullname.charAt(0).toUpperCase()}

                                                            </div>

                                                        )}

                                                    </td>

                                                    {/* MEMBER */}

                                                    <td className="px-6 py-4">

                                                        <p className="text-sm font-medium text-[#101828]">

                                                            {story.member.fullname}

                                                        </p>

                                                    </td>

                                                    {/* STORY TITLE */}

                                                    <td className="px-6 py-4">

                                                        <p className="max-w-[220px] truncate text-sm font-medium text-[#101828]">

                                                            {story.title}

                                                        </p>

                                                    </td>

                                                    {/* CONTENT */}

                                                    <td className="px-6 py-4">

                                                        <div className="max-w-[250px]">

                                                            <p className="line-clamp-1 text-sm text-[#667085]">

                                                                {story.content}

                                                            </p>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedStory(story);
                                                                    setIsStoryModalOpen(true);
                                                                }}
                                                                className="mt-1 text-xs font-semibold text-[#2563EB] hover:underline"
                                                            >
                                                                View Story
                                                            </button>

                                                        </div>

                                                    </td>

                                                    {/* PUBLIC */}

                                                    <td className="px-6 py-4">

                                                        <Tags
                                                            text={story.public ? "Public" : "Private"}
                                                            variant={story.public ? "green" : "red"}
                                                        />

                                                    </td>

                                                    {/* AI MODEL */}

                                                    <td className="px-6 py-4 text-sm text-[#475467]">

                                                        {story.ai_model}

                                                    </td>

                                                    {/* AI COST */}

                                                    <td className="px-6 py-4 text-sm font-semibold text-[#2563EB]">

                                                        ${story.ai_cost_usd}

                                                    </td>

                                                </tr>

                                            ))

                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination
                            currentPage={storyPagination?.page ?? 1}
                            totalPages={storyPagination?.totalPages ?? 1}
                            rowsPerPage={storiesPerPage}
                            onPageChange={setStoryPage}
                            onRowsPerPageChange={(rows) => { setStoriesPerPage(rows); setStoryPage(1); }}
                            showRowsPerPage
                            showPageInfo
                        />
                    </div>

                </div>
            </div>
            {/* Story Details Modal */}

            {isStoryModalOpen && selectedStory && (

                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                >

                    <div
                        className="relative w-[95%] max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                    >

                        {/* Header */}

                        <div className="flex items-center justify-between bg-gradient-to-r from-[#2563EB] to-[#4F46E5] px-8 py-6">

                            <div>

                                <h2 className="text-2xl font-bold text-white">
                                    Story Details
                                </h2>

                                <p className="mt-1 text-sm text-blue-100">
                                    AI Generated Story Information
                                </p>

                            </div>

                            <button
                                onClick={() => {
                                    setIsStoryModalOpen(false);
                                    setSelectedStory(null);
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
                            >
                                <XCircle size={24} />
                            </button>

                        </div>

                        {/* Body */}

                        <div className="max-h-[75vh] overflow-y-auto p-8 space-y-8">

                            {/* Member */}

                            <div className="mb-8 flex items-center gap-5 rounded-2xl border border-gray-200 bg-[#F8FAFC] p-5">

                                {selectedStory.member.avatar?.avatar_media ? (

                                    <img
                                        src={proxiedImage(
                                            selectedStory.member.avatar.avatar_media
                                        )}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />

                                ) : (

                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF] text-2xl  font-bold text-[#2563EB]">

                                        {selectedStory.member.fullname.charAt(0)}

                                    </div>

                                )}

                                <div>

                                    <h3 className="text-xl font-bold text-[#101828]">

                                        {selectedStory.member.fullname}

                                    </h3>

                                    <p className="mt-1 text-sm text-[#667085]">

                                        Member ID #{selectedStory.member.member_id}

                                    </p>

                                </div>

                            </div>

                            {/* Story */}

                            <div className="mb-8">

                                <h3 className="mb-4 text-2xl font-bold text-[#101828]">

                                    {selectedStory.title}

                                </h3>

                                <div className="rounded-2xl border border-gray-200 bg-[#F9FAFB] p-6 shadow-sm">

                                    <p className="whitespace-pre-wrap text-[15px] leading-8 text-[#344054]">

                                        {selectedStory.content}

                                    </p>

                                </div>

                            </div>

                            {/* AI Details */}
                            <h3 className="mb-4 text-xl font-bold text-[#101828]">
                                AI Information
                            </h3>
                            <div className="grid grid-cols-2 gap-5">

                                <InfoCard
                                    title="AI Provider"
                                    value={selectedStory.ai_provider}
                                />

                                <InfoCard
                                    title="AI Model"
                                    value={selectedStory.ai_model}
                                />

                                <InfoCard
                                    title="Prompt Tokens"
                                    value={selectedStory.prompt_tokens}
                                />

                                <InfoCard
                                    title="Completion Tokens"
                                    value={selectedStory.completion_tokens}
                                />

                                <InfoCard
                                    title="AI Cost"
                                    value={`$${selectedStory.ai_cost_usd}`}
                                />

                                <InfoCard
                                    title="Read Count"
                                    value={selectedStory.read_count}
                                />

                                <InfoCard
                                    title="Visibility"
                                    value={
                                        selectedStory.public
                                            ? "Public"
                                            : "Private"
                                    }
                                />

                                <InfoCard
                                    title="Created At"
                                    value={new Date(
                                        selectedStory.created_at
                                    ).toLocaleString()}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </DashboardLayout>
    );
}
function InfoCard({
    title,
    value,
}: {
    title: string;
    value: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#98A2B3]">
                {title}
            </p>

            <p className="mt-2 text-base font-bold text-[#101828] break-all">
                {value}
            </p>
        </div>
    );
}