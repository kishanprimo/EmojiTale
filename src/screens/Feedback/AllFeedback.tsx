"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import TableHeader from "@/components/common/TableHeader";
import Pagination from "@/components/common/Pagination";
import TableSkeleton from "@/components/common/TableSkeleton";
import DateTime from "@/components/common/DateTime";
import Tags from "@/components/common/Tag";
import { SearchX, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getFeedbacks } from "@/store/slices/FeedbackSlices/feedbackThunk";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={14}
                    className={s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                />
            ))}
        </div>
    );
}

function MessageCell({ message }: { message: string }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="max-w-[280px]">
            <p className={expanded ? "text-sm text-[#667085] leading-relaxed whitespace-pre-wrap" : "text-sm text-[#667085] line-clamp-2"}>
                {message}
            </p>
            <button
                onClick={() => setExpanded((e) => !e)}
                className="mt-1 text-xs font-medium text-[#2563EB] hover:underline"
            >
                {expanded ? "...less" : "...more"}
            </button>
        </div>
    );
}

const typeVariant = (type: string): "blue" | "green" | "purple" | "red" => {
    const map: Record<string, "blue" | "green" | "purple" | "red"> = {
        bug: "red",
        feature: "blue",
        other: "purple",
        review: "green",
    };
    return map[type.toLowerCase()] ?? "purple";
};

export default function AllFeedback() {
    const dispatch = useAppDispatch();
    const { feedbacks, pagination, loading } = useAppSelector((state) => state.feedback);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(getFeedbacks({ page, limit }));
    }, [dispatch, page, limit]);

    return (
        <DashboardLayout>
            <div className="px-4 sm:px-8 pt-4 pb-12 font-inter">

                <div className="mb-8">
                    <h1 className="text-[28px] font-semibold text-[#101828] font-poppins">Feedback</h1>
                </div>

                <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1000px] w-full border-collapse text-left">
                            <TableHeader
                                showCheckbox={false}
                                columns={[
                                    { label: "ID" },
                                    { label: "Type" },
                                    { label: "Subject" },
                                    { label: "Message" },
                                    { label: "Rating" },
                                    { label: "Created At" },
                                    { label: "Updated At" },
                                ]}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableSkeleton rows={limit} />
                                ) : feedbacks.length > 0 ? (
                                    feedbacks.map((fb) => (
                                        <tr key={fb.feedback_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                                            <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                                                #{fb.feedback_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Tags
                                                    text={fb.feedback_type}
                                                    variant={typeVariant(fb.feedback_type)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#101828] max-w-[180px]">
                                                <p className="line-clamp-2">{fb.subject}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <MessageCell message={fb.message} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <StarRating rating={fb.overall_rating} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(fb.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(fb.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <DateTime
                                                    date={new Date(fb.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                                    time={new Date(fb.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-20">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                                                    <SearchX size={30} className="text-[#2563EB]" />
                                                </div>
                                                <h3 className="mt-5 text-xl font-semibold text-[#101828]">No Feedback Found</h3>
                                                <p className="mt-2 text-[15px] text-[#667085]">No feedback has been submitted yet.</p>
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
                        onPageChange={(newPage) => setPage(newPage)}
                        onRowsPerPageChange={(rows) => { setLimit(rows); setPage(1); }}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        showRowsPerPage
                        showPageInfo
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
