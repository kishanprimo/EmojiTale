"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/common/Card";
import { useAppSelector } from "@/store/hooks";

const ResponsiveContainer = dynamic(
    () => import("recharts").then((m) => m.ResponsiveContainer),
    { ssr: false }
);

const AreaChart = dynamic(
    () => import("recharts").then((m) => m.AreaChart),
    { ssr: false }
);

const Area = dynamic(
    () => import("recharts").then((m) => m.Area),
    { ssr: false }
);

const XAxis = dynamic(
    () => import("recharts").then((m) => m.XAxis),
    { ssr: false }
);

const YAxis = dynamic(
    () => import("recharts").then((m) => m.YAxis),
    { ssr: false }
);

const CartesianGrid = dynamic(
    () => import("recharts").then((m) => m.CartesianGrid),
    { ssr: false }
);

const Tooltip = dynamic(
    () => import("recharts").then((m) => m.Tooltip),
    { ssr: false }
);


const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-xl">
            <p className="text-xs text-gray-500">{label}</p>

            <div className="mt-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#2563EB]" />

                <span className="text-sm font-semibold text-[#101828]">
                    {payload[0].value} Live Users
                </span>
            </div>
        </div>
    );
};
const ActiveUsersChart = () => {
    const { data, loading } = useAppSelector(
        (state) => state.dashboard
    );

    const chart = data.daywise_active_users.chart;

    const chartData = useMemo(() => {
        return chart.map((item) => ({
            ...item,
            label: formatDate(item.date),
        }));
    }, [chart]);

    const totalUsers = chart.reduce(
        (sum, item) => sum + item.visitors,
        0
    );

    const maxY = Math.max(
        ...chart.map((d) => d.visitors),
        2
    );
    if (loading) {
        return (
            <Card className="mt-6 p-6">

                <div className="animate-pulse">

                    <div className="h-7 w-56 rounded bg-gray-200" />

                    <div className="mt-8 h-[430px] rounded-xl bg-gray-100 relative overflow-hidden">

                        <div className="absolute bottom-12 left-10 right-10 h-[2px] bg-gray-200" />
                        <div className="absolute bottom-28 left-10 right-10 h-[2px] bg-gray-200" />
                        <div className="absolute bottom-44 left-10 right-10 h-[2px] bg-gray-200" />
                        <div className="absolute bottom-60 left-10 right-10 h-[2px] bg-gray-200" />

                    </div>

                </div>

            </Card>
        );
    }

    if (!chart.length) {
        return (
            <Card className="mt-6 p-6 h-[430px] flex items-center justify-center">
                <p className="text-gray-500">No Data Found</p>
            </Card>
        );
    }
    const yMax = Math.ceil(maxY / 2) * 2 + 2;

    const yTicks = Array.from(
        { length: yMax + 1 },
        (_, i) => i
    ).filter((n) => n % 2 === 0);;

    const xTicks = chartData
        .filter((_, index) => index % 2 === 0 || index === chartData.length - 1)
        .map((item) => item.label);

    return (
        <Card className="mt-6 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-[#101828]">
                        Daily Live Users
                    </h2>

                </div>

            </div>

            <div className="mt-6 overflow-x-auto">
                <div className="h-[260px] sm:h-[340px] lg:h-[430px] min-w-[800px] lg:min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 15,
                                right: 10,
                                left: -30,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="activeUsersGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#2563EB"
                                        stopOpacity={0.18}
                                    />

                                    <stop
                                        offset="80%"
                                        stopColor="#2563EB"
                                        stopOpacity={0.03}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#2563EB"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                vertical={false}
                                stroke="#F3F4F6"
                            />

                            <XAxis
                                dataKey="label"
                                ticks={xTicks}
                                interval={0}
                                minTickGap={25}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#667085",
                                    fontSize: 12,
                                }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                ticks={yTicks}
                                domain={[0, yMax]}
                                tick={{
                                    fill: "#667085",
                                    fontSize: 12,
                                }}
                            />

                            <Tooltip
                                cursor={false}
                                content={<CustomTooltip />}
                            />

                            <Area
                                type="linear"
                                dataKey="visitors"
                                stroke="#2563EB"
                                strokeWidth={1.5}
                                fill="url(#activeUsersGradient)"
                                activeDot={{
                                    r: 5,
                                    fill: "#2563EB",
                                    stroke: "#fff",
                                    strokeWidth: 2,
                                }}
                                animationDuration={1200}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default ActiveUsersChart;