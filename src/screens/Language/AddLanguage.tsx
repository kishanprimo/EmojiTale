import DashboardLayout from "@/layouts/DashboardLayout";
import LanguageForm from "./LanguageForm";

export default function AddLanguage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <LanguageForm />
            </div>
        </DashboardLayout>
    );
}
