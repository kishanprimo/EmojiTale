"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
//import DashboardUsers from "@/components/dashboard/DashboardUsers";
import ActiveUsersChart from "@/components/dashboard/LiveUsersChart";
import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";

import { getDashboard } from "@/store/slices/DashboardSlice/liveusers_thunk";
const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);
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

        <ActiveUsersChart />

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;