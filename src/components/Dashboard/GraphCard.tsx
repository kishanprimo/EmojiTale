"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { GraphPeriod, GraphPoint } from "@/types/DashboardTypes/dashboardTypes";

const PERIOD_OPTIONS: { value: GraphPeriod; label: string }[] = [
    { value: "day", label: "Daily" },
    { value: "week", label: "Weekly" },
    { value: "month", label: "Monthly" },
    { value: "year", label: "Yearly" },
];

function formatLabel(period: GraphPeriod, label: string) {
    const date = new Date(label);
    if (isNaN(date.getTime())) return label;

    switch (period) {
        case "day":
        case "week":
            return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
        case "month":
            return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        case "year":
            return String(date.getFullYear());
    }
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
    period: GraphPeriod;
}

function CustomTooltip({ active, payload, label, period }: CustomTooltipProps) {
    if (!active || !payload?.length || !label) return null;
    return (
        <div className="rounded-[8px] border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <p className="text-xs text-[#667085]">{formatLabel(period, label)}</p>
            <p className="text-sm font-semibold text-[#101828]">{payload[0].value} count</p>
        </div>
    );
}

interface GraphCardProps {
    title: string;
    subtitle?: string;
    data: GraphPoint[];
    period: GraphPeriod;
    onPeriodChange: (period: GraphPeriod) => void;
    loading?: boolean;
    color?: string;
    dateRange?: { from: string; to: string };
    onDateRangeChange?: (range: { from: string; to: string }) => void;
}

export default function GraphCard({
    title,
    subtitle,
    data,
    period,
    onPeriodChange,
    loading = false,
    color = "#2563EB",
    dateRange,
    onDateRangeChange,
}: GraphCardProps) {
    const [showDateFilter, setShowDateFilter] = useState(false);

    const gradientId = useMemo(
        () => `graph-gradient-${title.replace(/\s+/g, "-").toLowerCase()}`,
        [title]
    );

    const total = data.reduce((sum, d) => sum + d.count, 0);

    return (
        <div className="bg-white p-5 rounded-[10px] border border-gray-200">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                <div>
                    <h3 className="text-[16px] font-semibold text-[#101828] font-poppins">{title}</h3>
                    {subtitle ? (
                        <p className="text-[13px] text-[#667085] mt-0.5">{subtitle}</p>
                    ) : null}
                </div>

                <div className="flex items-center gap-2">
                    {onDateRangeChange ? (
                        <button
                            type="button"
                            onClick={() => setShowDateFilter((s) => !s)}
                            className="h-9 rounded-[8px] border border-gray-300 bg-white px-3 text-[13px] font-medium text-[#344054] hover:bg-gray-50 transition-colors"
                        >
                            Custom range
                        </button>
                    ) : null}

                    <div className="relative">
                        <select
                            value={period}
                            onChange={(e) => onPeriodChange(e.target.value as GraphPeriod)}
                            className="h-9 rounded-[8px] border border-gray-300 bg-white pl-3 pr-8 text-[13px] font-medium text-[#344054] outline-none appearance-none focus:border-blue-500 transition-colors"
                        >
                            {PERIOD_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>

            {showDateFilter && onDateRangeChange ? (
                <div className="flex flex-wrap items-center gap-2 mt-3 mb-1">
                    <input
                        type="date"
                        value={dateRange?.from ?? ""}
                        onChange={(e) => onDateRangeChange({ from: e.target.value, to: dateRange?.to ?? "" })}
                        className="h-9 rounded-[8px] border border-gray-300 bg-white px-3 text-[13px] text-[#344054] outline-none focus:border-blue-500"
                    />
                    <span className="text-[13px] text-[#667085]">to</span>
                    <input
                        type="date"
                        value={dateRange?.to ?? ""}
                        onChange={(e) => onDateRangeChange({ from: dateRange?.from ?? "", to: e.target.value })}
                        className="h-9 rounded-[8px] border border-gray-300 bg-white px-3 text-[13px] text-[#344054] outline-none focus:border-blue-500"
                    />
                </div>
            ) : null}

            <p className="text-[26px] font-bold text-[#101828] mt-2">{total.toLocaleString()}</p>
            <p className="text-[13px] text-[#667085] mb-4">Total in selected range</p>

            <div className="h-[260px] w-full">
                {loading ? (
                    <div className="h-full w-full bg-gray-100 rounded-[8px] animate-pulse" />
                ) : data.length === 0 ? (
                    <div className="h-full w-full flex items-center justify-center text-sm text-[#667085]">
                        No data for selected range
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF1F4" />
                            <XAxis
                                dataKey="label"
                                tickFormatter={(label: string) => formatLabel(period, label)}
                                tick={{ fontSize: 12, fill: "#667085" }}
                                axisLine={{ stroke: "#EEF1F4" }}
                                tickLine={false}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 12, fill: "#667085" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip period={period} />} />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke={color}
                                strokeWidth={2}
                                fill={`url(#${gradientId})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
