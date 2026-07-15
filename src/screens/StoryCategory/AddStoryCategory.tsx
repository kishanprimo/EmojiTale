import DashboardLayout from "@/layouts/DashboardLayout";
import StoryCategoryForm from "./StoryCategoryForm";

export default function AddStoryCategory() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <StoryCategoryForm />
            </div>
        </DashboardLayout>
    );
}
