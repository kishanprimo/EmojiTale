import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiCategoryFormUpdate from "@/screens/EmojiCategories/EmojiCategoryFormUpdate";

export default function EditEmojiCategoryPage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <EmojiCategoryFormUpdate mode="edit" />
            </div>
        </DashboardLayout>
    );
}
