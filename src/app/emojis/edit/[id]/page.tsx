import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiForm from "@/screens/Emojis/EmojiForm";
import EmojiLeft from "@/screens/Emojis/EmojiLeft";

export default function EditEmojiPage() {
    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50 p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">
                    <EmojiLeft />
                    <EmojiForm mode="edit" />
                </div>
            </div>
        </DashboardLayout>
    );
}
