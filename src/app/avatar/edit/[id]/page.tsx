import DashboardLayout from "@/layouts/DashboardLayout";
import AvatarForm from "@/screens/Avatars/AvatarForm";

export default function EditAvatarPage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <AvatarForm mode="edit" />
            </div>
        </DashboardLayout>
    );
}