import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiForm from "@/screens/Emojis/EmojiForm";

export default function AddEmojiPage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <EmojiForm mode="add" />
            </div>
        </DashboardLayout>
    );
}
