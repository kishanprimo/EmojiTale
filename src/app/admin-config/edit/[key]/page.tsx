"use client";

import { Suspense } from "react";
import EditAdminConfig from "@/screens/AdminConfig/EditAdminConfig";
import { useParams } from "next/navigation";

function EditAdminConfigWrapper() {
    const params = useParams();
    const configKey = decodeURIComponent(params.key as string);
    return <EditAdminConfig configKey={configKey} />;
}

export default function EditAdminConfigPage() {
    return (
        <Suspense>
            <EditAdminConfigWrapper />
        </Suspense>
    );
}
