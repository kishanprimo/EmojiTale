"use client";

import { useParams } from "next/navigation";
import EditLanguage from "@/screens/Language/EditLanguage";

export default function EditLanguagePage() {
    const params = useParams();
    return <EditLanguage id={Number(params.id)} />;
}
