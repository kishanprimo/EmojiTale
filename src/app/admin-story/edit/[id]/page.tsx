"use client";

import { useParams } from "next/navigation";
import EditAdminStory from "@/screens/AdminStory/EditAdminStory";

export default function EditAdminStoryPage() {
    const params = useParams();
    return <EditAdminStory id={Number(params.id)} />;
}
