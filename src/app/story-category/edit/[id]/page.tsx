"use client";

import { useParams } from "next/navigation";
import EditStoryCategory from "@/screens/StoryCategory/EditStoryCategory";

export default function EditStoryCategoryPage() {
    const params = useParams();
    return <EditStoryCategory id={Number(params.id)} />;
}
