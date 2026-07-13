import DashboardLayout from "@/layouts/DashboardLayout";
import EmojiCategoryForm from "@/screens/EmojiCategories/EmojiCategoryForm";
import EmojiCategoryLeft from "@/screens/EmojiCategories/EmojiCategoryLeft";

export default function AddEmojiCategoryPage() {
    return (
        <DashboardLayout>
            <div className="h-full bg-gray-50 p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">
                    <EmojiCategoryLeft />
                    <EmojiCategoryForm mode="add" />
                </div>
            </div>
        </DashboardLayout>
    );
}
