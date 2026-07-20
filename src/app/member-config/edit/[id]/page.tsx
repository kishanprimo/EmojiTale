"use client";

import EditMemberConfig from "@/screens/MemberConfig/EditMemberConfig";
import { useParams } from "next/navigation";

export default function EditMemberConfigPage() {
    const params = useParams();
    const configId = Number(params.id);
    return <EditMemberConfig configId={configId} />;
}
