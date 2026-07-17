"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCards from "@/components/common/StatsCard";
import GraphCard from "@/components/Dashboard/GraphCard";

import {
  Users,
  BookOpen,
  IndianRupee,
} from "lucide-react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  getDashboardStats,
  getUserGraph,
  getMemberGraph,
} from "@/store/slices/DashboardSlice/dashboardThunk";
import { GraphPeriod } from "@/types/DashboardTypes/dashboardTypes";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const {
    stats,
    loading,
    userGraph,
    userGraphLoading,
    memberGraph,
    memberGraphLoading,
  } = useAppSelector((state) => state.dashboard);

  const [userPeriod, setUserPeriod] = useState<GraphPeriod>("month");
  const [userRange, setUserRange] = useState({ from: "", to: "" });

  const [memberPeriod, setMemberPeriod] = useState<GraphPeriod>("day");
  const [memberRange, setMemberRange] = useState({ from: "", to: "" });

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getUserGraph({
        period: userPeriod,
        date_from: userRange.from || undefined,
        date_to: userRange.to || undefined,
      })
    );
  }, [dispatch, userPeriod, userRange]);

  useEffect(() => {
    dispatch(
      getMemberGraph({
        period: memberPeriod,
        date_from: memberRange.from || undefined,
        date_to: memberRange.to || undefined,
      })
    );
  }, [dispatch, memberPeriod, memberRange]);

  const dashboardStats = [
    {
      label: "Total Users",
      value: stats.total_users,
      change: 0,
      icon: <Users size={24} className="text-[#2563EB]" />,
      bg: "bg-[#EEF4FF]",
    },
    {
      label: "Total Stories",
      value: stats.total_stories,
      change: 0,
      icon: <BookOpen size={24} className="text-[#12B76A]" />,
      bg: "bg-[#ECFDF3]",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.total_revenue}`,
      change: 0,
      icon: <IndianRupee size={24} className="text-[#F97316]" />,
      bg: "bg-[#FFF7ED]",
    },
  ];
  return (
    <DashboardLayout>
      <div className="px-4 md:px-6 lg:px-8 py-5 md:py-6">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#101828] font-poppins">
            Dashboard
          </h1>

          <p className="mt-1 text-[15px] text-[#667085]">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <StatsCards
          stats={dashboardStats}
          cols={3}
          loading={loading}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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

          <GraphCard
            title="Member Growth"
            subtitle="New members registered over time"
            data={memberGraph}
            period={memberPeriod}
            onPeriodChange={setMemberPeriod}
            loading={memberGraphLoading}
            color="#12B76A"
            dateRange={memberRange}
            onDateRangeChange={setMemberRange}
          />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
