import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiForm from "@/screens/Emojis/EmojiForm";

export default function EditEmojiPage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <EmojiForm mode="edit" />
            </div>
        </DashboardLayout>
    );
}
