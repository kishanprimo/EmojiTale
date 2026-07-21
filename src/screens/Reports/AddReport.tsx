"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createReport } from "@/store/slices/ReportSlices/createReportThunk";
import { resetCreateReport } from "@/store/slices/ReportSlices/createReportSlice";

export default function AddReport() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, success } = useAppSelector((state) => state.createReport);

    const [reportText, setReportText] = useState("");

    useEffect(() => {
        if (!success) return;
        toast.success("Report created successfully!");
        dispatch(resetCreateReport());
        router.push("/reports/all");
    }, [success, dispatch, router]);

    const handleSubmit = async () => {
        if (!reportText.trim()) { toast.error("Please enter report text"); return; }
        try {
            await dispatch(createReport({ report_text: reportText.trim() })).unwrap();
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="text-[26px] font-semibold text-[#101828]">Add Report</h2>
                    </div>

                    <div className="flex-1 p-6">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Report Text <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value.trimStart())}
                            placeholder="Enter report text..."
                            rows={6}
                            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500 resize-none transition-colors"
                        />
                    </div>

                    <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.push("/reports/all")}
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
                                    <Loader2 size={18} className="animate-spin" /> Saving...
                                </span>
                            ) : "Save Report"}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
