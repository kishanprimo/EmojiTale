"use client";

import { useEffect } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCards from "@/components/common/StatsCard";

import {
  Users,
  BookOpen,
  IndianRupee,
} from "lucide-react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import { getDashboardStats } from "@/store/slices/DashboardSlice/dashboardThunk";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { stats, loading } = useAppSelector(
    (state) => state.dashboard
  );
  useEffect(() => {
    console.log("========== DASHBOARD STATE ==========");
    console.log("Loading:", loading);
    console.log("Stats:", stats);
  }, [loading, stats]);
  useEffect(() => {
    console.log("========== DASHBOARD ==========");
    console.log("Dashboard Mounted");
    console.log("Dispatching getDashboardStats()");

    dispatch(getDashboardStats());
  }, [dispatch]);
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

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;