"use client";

import { useParams } from "next/navigation";
import UserXPHistory from "@/screens/UserXPHistory/UserXPHistory";

export default function UserXPHistoryPage() {
    const params = useParams();

    const userId = Number(params.id);

    return <UserXPHistory userId={userId} />;
}