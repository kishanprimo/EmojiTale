import DashboardLayout from "@/layouts/DashboardLayout";
import ThemeForm from "@/screens/Themes/ThemeForm";
import ThemeLeft from "@/screens/Themes/ThemeLeft";

export default function EditThemePage() {
    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50 p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">
                    <ThemeLeft />
                    <ThemeForm mode="edit" />
                </div>
            </div>
        </DashboardLayout>
    );
}
