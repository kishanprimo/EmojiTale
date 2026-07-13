"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, ChevronDown, Bell } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNotification } from "@/store/slices/NotificationSlices/addNotificationThunk";
import { resetAddNotification } from "@/store/slices/NotificationSlices/addNotificationSlice";

export default function AddNotification() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, success } = useAppSelector((state) => state.addNotification);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [platform, setPlatform] = useState<"ios" | "android" | "all">("all");

    useEffect(() => {
        if (!success) return;
        toast.success("Notification broadcast initiated!");
        dispatch(resetAddNotification());
        router.push("/notifications/all");
    }, [success, dispatch, router]);

    const handleSubmit = async () => {
        if (!title.trim()) { toast.error("Please enter a title"); return; }
        if (!message.trim()) { toast.error("Please enter a message"); return; }
        try {
            await dispatch(createNotification({ title, message, platform })).unwrap();
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50">
                <div className="h-full p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">

                        {/* Left Panel */}
                        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-[24px] font-semibold text-[#101828]">Notifications</h2>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF4FF]">
                                    <Bell size={28} className="text-[#2563EB]" />
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold text-[#101828]">Broadcast to All Users</p>
                                    <p className="mt-1 text-sm text-[#667085]">Send a push notification to all users on iOS, Android, or both platforms at once.</p>
                                </div>
                                <div className="w-full mt-2 space-y-3 text-left">
                                    {[
                                        { label: "iOS", desc: "Send to Apple device users" },
                                        { label: "Android", desc: "Send to Android device users" },
                                        { label: "All", desc: "Send to all platforms" },
                                    ].map((p) => (
                                        <div key={p.label} className="flex items-start gap-3 rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-3">
                                            <div className="mt-0.5 h-2 w-2 rounded-full bg-[#2563EB] shrink-0" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#101828]">{p.label}</p>
                                                <p className="text-xs text-[#667085]">{p.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Right Panel — Form */}
                        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">
                            <div className="border-b border-gray-200 px-6 py-5">
                                <h2 className="text-[26px] font-semibold text-[#101828]">Add Notification</h2>
                                <p className="text-sm text-[#667085] mt-1">Fill in the details below to broadcast a push notification.</p>
                            </div>

                            <div className="flex-1 p-6 space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value.trimStart())}
                                        placeholder="Enter notification title"
                                        className="w-full h-12 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value.trimStart())}
                                        placeholder="Enter notification message"
                                        rows={6}
                                        className="w-full rounded-[10px] border border-gray-300 px-4 py-3 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500 resize-none"
                                    />
                                </div>

                                {/* Platform */}
                                <div>
                                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                                        Platform <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={platform}
                                            onChange={(e) => setPlatform(e.target.value as "ios" | "android" | "all")}
                                            className="w-full h-12 rounded-[10px] border border-gray-300 bg-white px-4 pr-12 text-[#101828] outline-none appearance-none focus:border-blue-500"
                                        >
                                            <option value="all">All</option>
                                            <option value="ios">iOS</option>
                                            <option value="android">Android</option>
                                        </select>
                                        <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.push("/notifications/all")}
                                    className="rounded-[10px] border border-gray-300 px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className={`rounded-[10px] px-6 py-2 font-medium text-white transition-all ${loading ? "cursor-not-allowed bg-blue-300" : "bg-[#2563EB] hover:bg-[#1D4ED8]"}`}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 size={18} className="animate-spin" />
                                            Sending...
                                        </span>
                                    ) : "Send Notification"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
