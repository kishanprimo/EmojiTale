import DashboardLayout from "@/layouts/DashboardLayout";
import ThemeForm from "@/screens/Themes/ThemeForm";

export default function EditThemePage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <ThemeForm mode="edit" />
            </div>
        </DashboardLayout>
    );
}
