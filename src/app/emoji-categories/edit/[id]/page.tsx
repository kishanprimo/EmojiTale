import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiCategoryForm from "@/screens/EmojiCategories/EmojiCategoryForm";

export default function EditEmojiCategoryPage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <EmojiCategoryForm mode="edit" />
            </div>
        </DashboardLayout>
    );
}
