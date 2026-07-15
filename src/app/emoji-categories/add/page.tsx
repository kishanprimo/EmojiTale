import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiCategoryForm from "@/screens/EmojiCategories/EmojiCategoryForm";

export default function AddEmojiCategoryPage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <EmojiCategoryForm mode="add" />
            </div>
        </DashboardLayout>
    );
}
