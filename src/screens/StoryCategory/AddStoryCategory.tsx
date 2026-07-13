import DashboardLayout from "@/layouts/DashboardLayout";
import StoryCategoryLeft from "./StoryCategoryLeft";
import StoryCategoryForm from "./StoryCategoryForm";

export default function AddStoryCategory() {
    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50">
                <div className="h-full p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">
                        <div className="h-full">
                            <StoryCategoryLeft />
                        </div>
                        <div className="h-full">
                            <StoryCategoryForm />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
