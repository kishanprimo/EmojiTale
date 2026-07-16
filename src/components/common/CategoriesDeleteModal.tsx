import { Trash } from "lucide-react";

interface DeleteModalProps {
    onClose: () => void;
    onConfirm: () => void;

    title?: string;
    message?: string;
    confirmText?: string;

    loading?: boolean; // ADD
}
export default function CategoriesDeleteModal({
    onClose,
    onConfirm,

    title = "Are you sure want to delete ?",
    message = "This Item will be deleted Permanently. You can not undo this action.",
    confirmText = "Delete",

    loading = false, // ADD
}: DeleteModalProps) {

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

            <div className="bg-white rounded-2xl max-w-[440px] w-full mx-4 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Blue header strip */}
                <div className="bg-[#2563EB] px-8 pt-8 pb-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <Trash className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-white tracking-wide">{title}</h3>
                </div>

                {/* Body */}
                <div className="px-8 py-6 flex flex-col items-center text-center">
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{message}</p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Deleting..." : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}