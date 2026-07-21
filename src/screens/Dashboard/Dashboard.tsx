"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCards from "@/components/common/StatsCard";
import GraphCard from "@/components/Dashboard/GraphCard";
import TableHeader from "@/components/common/TableHeader";
import TableSkeleton from "@/components/common/TableSkeleton";
import Pagination from "@/components/common/Pagination";
import Tags from "@/components/common/Tag";
import DateTime from "@/components/common/DateTime";
import { Users, BookOpen, IndianRupee, SearchX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getDashboardStats, getUserGraph, getMemberGraph } from "@/store/slices/DashboardSlice/dashboardThunk";
import { getPopularAuthors } from "@/store/slices/PopularAuthorSlices/popularAuthorThunk";
import { getSubscriptions } from "@/store/slices/SubscriptionSlices/subscriptionThunk";
import { GraphPeriod } from "@/types/DashboardTypes/dashboardTypes";
import { proxiedImage } from "@/lib/imageProxy";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/api$/, "");
const authorImage = (path: string) => proxiedImage(`${API_BASE}/${path}`);

const statusVariant = (status: string): "green" | "red" | "blue" | "purple" => {
  const map: Record<string, "green" | "red" | "blue" | "purple"> = {
    active: "green", expired: "red", cancelled: "red", trial: "blue", pending: "purple",
  };
  return map[status?.toLowerCase()] ?? "purple";
};

const platformVariant = (platform: string): "blue" | "green" | "purple" => {
  if (platform === "ios") return "blue";
  if (platform === "android") return "green";
  return "purple";
};

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { stats, loading, userGraph, userGraphLoading } = useAppSelector((state) => state.dashboard);
  const { authors, meta: authorMeta, loading: authorsLoading } = useAppSelector((state) => state.popularAuthors);
  const { subscriptions, loading: subsLoading } = useAppSelector((state) => state.subscription);

  const [userPeriod, setUserPeriod] = useState<GraphPeriod>("month");
  const [userRange, setUserRange] = useState({ from: "", to: "" });
  const [authorPage, setAuthorPage] = useState(1);
  const [authorLimit, setAuthorLimit] = useState(5);

  useEffect(() => { dispatch(getDashboardStats()); }, [dispatch]);

  useEffect(() => {
    dispatch(getUserGraph({ period: userPeriod, date_from: userRange.from || undefined, date_to: userRange.to || undefined }));
  }, [dispatch, userPeriod, userRange]);

  useEffect(() => {
    dispatch(getPopularAuthors({ page: authorPage, limit: authorLimit }));
  }, [dispatch, authorPage, authorLimit]);

  useEffect(() => {
    dispatch(getSubscriptions({ page: 1, limit: 5 }));
  }, [dispatch]);

  const dashboardStats = [
    { label: "Total Users", value: stats.total_users, change: 0, icon: <Users size={24} className="text-[#2563EB]" />, bg: "bg-[#EEF4FF]" },
    { label: "Total Stories", value: stats.total_stories, change: 0, icon: <BookOpen size={24} className="text-[#12B76A]" />, bg: "bg-[#ECFDF3]" },
    { label: "Total Revenue", value: `₹${stats.total_revenue}`, change: 0, icon: <IndianRupee size={24} className="text-[#F97316]" />, bg: "bg-[#FFF7ED]" },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 md:px-6 lg:px-8 py-5 md:py-6">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#101828] font-poppins">Dashboard</h1>
          <p className="mt-1 text-[15px] text-[#667085]">Welcome back! Here's what's happening today.</p>
        </div>

        <StatsCards stats={dashboardStats} cols={3} loading={loading} />

        <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
          <GraphCard
            title="User Growth"
            subtitle="New users registered over time"
            data={userGraph}
            period={userPeriod}
            onPeriodChange={setUserPeriod}
            loading={userGraphLoading}
            color="#2563EB"
            dateRange={userRange}
            onDateRangeChange={setUserRange}
          />
        </div>

        {/* Popular Authors */}
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-[20px] font-semibold text-[#101828] font-poppins">Popular Authors</h2>
            <p className="text-sm text-[#667085] mt-0.5">Top authors ranked by engagement score</p>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[800px] w-full border-collapse text-left">
                <TableHeader
                  showCheckbox={false}
                  columns={[
                    { label: "Author" },
                    { label: "Stories" },
                    { label: "Total Reads" },
                    { label: "Likes" },
                    { label: "Comments" },
                    { label: "Score" },
                  ]}
                />
                <tbody className="divide-y divide-gray-100">
                  {authorsLoading ? (
                    <TableSkeleton rows={authorLimit} />
                  ) : authors.length > 0 ? (
                    authors.map((author, idx) => (
                      <tr key={author.author_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#667085] w-4">{(authorPage - 1) * authorLimit + idx + 1}</span>
                            <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                              {author.profile_image ? (
                                <Image
                                  src={authorImage(author.profile_image) ?? ""}
                                  alt={author.author_name}
                                  width={36}
                                  height={36}
                                  unoptimized
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-[#EEF4FF] flex items-center justify-center text-[#2563EB] text-xs font-bold">
                                  {author.author_name?.[0]?.toUpperCase()}
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-medium text-[#101828]">{author.author_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#101828] font-medium">{author.story_count}</td>
                        <td className="px-6 py-4 text-sm text-[#101828] font-medium">{author.total_reads}</td>
                        <td className="px-6 py-4 text-sm text-[#101828] font-medium">{author.total_likes}</td>
                        <td className="px-6 py-4 text-sm text-[#101828] font-medium">{author.total_comments}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
                            {author.score}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-16">
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF]">
                            <SearchX size={26} className="text-[#2563EB]" />
                          </div>
                          <p className="mt-4 text-[15px] font-semibold text-[#101828]">No Authors Found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <Pagination
              currentPage={authorMeta.page}
              totalPages={authorMeta.totalPages}
              rowsPerPage={authorLimit}
              onPageChange={(p) => setAuthorPage(p)}
              onRowsPerPageChange={(rows) => { setAuthorLimit(rows); setAuthorPage(1); }}
              rowsPerPageOptions={[5, 10, 20, 50]}
              showRowsPerPage
              showPageInfo
            />
          </div>
        </div>

        {/* Top Subscriptions */}
        <div className="mt-8 mb-8">
          <div className="mb-4">
            <h2 className="text-[20px] font-semibold text-[#101828] font-poppins">Top Subscriptions</h2>
            <p className="text-sm text-[#667085] mt-0.5">Most recent active subscriptions</p>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[1000px] w-full border-collapse text-left">
                <TableHeader
                  showCheckbox={false}
                  columns={[
                    { label: "ID" },
                    { label: "User" },
                    { label: "Plan" },
                    { label: "Platform" },
                    { label: "Status" },
                    { label: "Renewals" },
                    { label: "Start Date" },
                    { label: "End Date" },
                  ]}
                />
                <tbody className="divide-y divide-gray-100">
                  {subsLoading ? (
                    <TableSkeleton rows={5} />
                  ) : subscriptions.length > 0 ? (
                    subscriptions.map((sub) => (
                      <tr key={sub.subscription_id} className="transition-all duration-200 hover:bg-[#F9FAFB]">
                        <td className="px-6 py-4 text-sm font-semibold text-[#101828]">#{sub.subscription_id}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-[#101828]">{sub.user?.fullname ?? sub.user?.username ?? "—"}</p>
                          <p className="text-xs text-[#667085]">{sub.user?.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-[#101828] capitalize">{sub.plan?.plan_type ?? "—"}</p>
                          <p className="text-xs text-[#667085]">{sub.plan?.price} {sub.plan?.currency}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Tags text={sub.platform} variant={platformVariant(sub.platform)} />
                        </td>
                        <td className="px-6 py-4">
                          <Tags text={sub.status} variant={statusVariant(sub.status)} />
                        </td>
                        <td className="px-6 py-4 text-sm text-[#101828] font-medium">{sub.renewal_count}</td>
                        <td className="px-6 py-4">
                          <DateTime
                            date={new Date(sub.start_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                            time={new Date(sub.start_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <DateTime
                            date={new Date(sub.end_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                            time={new Date(sub.end_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-16">
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF]">
                            <SearchX size={26} className="text-[#2563EB]" />
                          </div>
                          <p className="mt-4 text-[15px] font-semibold text-[#101828]">No Subscriptions Found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
