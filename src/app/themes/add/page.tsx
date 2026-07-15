import DashboardLayout from "@/layouts/DashboardLayout";
import ThemeForm from "@/screens/Themes/ThemeForm";

export default function AddThemePage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <ThemeForm mode="add" />
            </div>
        </DashboardLayout>
    );
}
