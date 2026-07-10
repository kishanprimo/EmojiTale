import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiCategoryForm from "@/screens/EmojiCategories/EmojiCategoryForm";
import EmojiCategoryLeft from "@/screens/EmojiCategories/EmojiCategoryLeft";

export default function EditEmojiCategoryPage() {
    return (
        <DashboardLayout>
            <div className="p-6 grid grid-cols-[320px_1fr] gap-6">
                <EmojiCategoryLeft />
                <EmojiCategoryForm mode="edit" />
            </div>
        </DashboardLayout>
    );
}
