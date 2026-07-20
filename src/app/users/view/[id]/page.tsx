"use client";

import UserView from "@/screens/AllUsers/UserView";
import { useParams } from "next/navigation";

export default function UserViewPage() {
    const params = useParams();
    const userId = Number(params.id);
    return <UserView userId={userId} />;
}
