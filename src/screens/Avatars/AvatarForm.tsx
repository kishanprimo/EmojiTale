"use client";
import { toast } from "react-hot-toast";
import { useEffect, useState, type ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";
import TogglableSwitch from "@/components/common/TogglableSwitch";
import {
    useRouter,
    useParams,
} from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";

import { resetAddAvatar } from "@/store/slices/AvatarSlices/addAvatarSlice";
import { addAvatar } from "@/store/slices/AvatarSlices/addAvatarThunk";
import { updateAvatar } from "@/store/slices/AvatarSlices/updateAvatarThunk";
import { resetUpdateAvatar } from "@/store/slices/AvatarSlices/updateAvatarSlice";
import { clearSelectedAvatar } from "@/store/slices/AvatarSlices/selectedAvatarSlice";
import { resolveImageUrl } from "@/lib/resolveImageUrl";

type AvatarFormProps = {
    mode?: "add" | "edit";
};
export default function AvatarForm({
    mode = "add",
}: AvatarFormProps) {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const selectedAvatar = useAppSelector(
        (state) => state.selectedAvatar.avatar
    );

    const addAvatarState = useAppSelector(
        (state) => state.addAvatar
    );

    const updateAvatarState = useAppSelector(
        (state) => state.updateAvatar
    );
    const loading =
        mode === "edit"
            ? updateAvatarState.loading
            : addAvatarState.loading;
    const success =
        mode === "edit"
            ? updateAvatarState.success
            : addAvatarState.success;
    const [name, setName] =
        useState("");

    const [gender, setGender] =
        useState<"male" | "female">(
            "male"
        );

    const [status, setStatus] =
        useState(true);

    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    const [fileName, setFileName] =
        useState("No file chosen");
    useEffect(() => {

        if (
            mode !== "edit" ||
            !selectedAvatar
        )
            return;

        setName(
            selectedAvatar.name
        );

        setGender(
            selectedAvatar.avatar_gender
        );

        setStatus(
            selectedAvatar.status
        );

        setPreview(
            resolveImageUrl(selectedAvatar.avatar_media ?? "") ?? ""
        );

        setFileName(
            "Current Image"
        );

    }, [
        mode,
        selectedAvatar,
    ]);
    // -------------------------------
    // Image
    // -------------------------------

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];

        if (!file) return;

        setSelectedImage(file);

        setFileName(file.name);

        setPreview(
            URL.createObjectURL(file)
        );

    };

    // -------------------------------
    // Submit
    // -------------------------------

    const handleSubmit = async () => {

        if (!name.trim()) {

            toast.error("Please enter Avatar Name");

            return;

        }
        if (
            mode === "add" &&
            !selectedImage
        ) {

            toast.error(
                "Please choose an Avatar Image"
            );

            return;

        }

        const formData = new FormData();

        formData.append("name", name);

        formData.append("avatar_gender", gender);

        formData.append("status", String(status));

        if (selectedImage) {

            formData.append(
                "avatar_media",
                selectedImage
            );

        }

        try {

            if (mode === "edit") {

                await dispatch(
                    updateAvatar({
                        avatarId:
                            selectedAvatar!.avatar_id,
                        formData,
                    })
                ).unwrap();

            } else {

                await dispatch(
                    addAvatar(formData)
                ).unwrap();

            }
        } catch (error: any) {

            toast.error(
                error || "Something went wrong"
            );

        }

    };

    // -------------------------------
    // Reset Form
    // -------------------------------

    useEffect(() => {

        if (!success) return;

        toast.success(
            mode === "edit"
                ? "Avatar updated successfully!"
                : "Avatar created successfully!"
        );

        if (mode === "edit") {

            dispatch(resetUpdateAvatar());

        } else {

            dispatch(resetAddAvatar());

        }
        dispatch(
            clearSelectedAvatar()
        );
        router.push("/avatar");

    }, [
        success,
        dispatch,
        router,
    ]);
    useEffect(() => {

        return () => {

            if (preview) {

                URL.revokeObjectURL(preview);

            }

        };

    }, [preview]);
    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {mode === "edit"
                        ? "Edit Avatar"
                        : "Add Avatar"}
                </h2>

            </div>

            {/* Body */}

            <div className="flex-1 p-6">

                <div className="space-y-7">

                    {/* Avatar Name */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Avatar Name

                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value.trimStart())
                            }
                            placeholder="Enter Avatar Name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Gender */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Gender

                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <div className="relative">

                            <select
                                value={gender}
                                onChange={(e) =>
                                    setGender(e.target.value as "male" | "female")
                                }
                                className="w-full h-12 rounded-[10px] border border-gray-300 bg-white px-4 pr-12 text-[#101828] outline-none appearance-none focus:border-blue-500"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            <ChevronDown
                                size={18}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                        </div>

                    </div>

                    {/* Avatar Image */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Avatar Image

                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <div className="flex overflow-hidden rounded-[10px] border border-gray-300">

                            <label
                                className="cursor-pointer border-r border-gray-300 bg-gray-100 px-5 py-3 font-medium text-[#101828] transition-colors hover:bg-gray-200 hover:text-[#101828]"
                            >

                                Choose Image

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}

                                />

                            </label>

                            <span className="flex items-center px-4 text-sm text-gray-500">

                                {fileName}

                            </span>

                        </div>

                        {preview && (
                            <div className="mt-4">
                                <img
                                    src={preview}
                                    alt="Avatar"
                                    className="h-28 w-28 rounded-xl border object-cover"
                                />
                            </div>
                        )}

                    </div>
                    {/* Status */}

                    <div>

                        <label className="block mb-4 text-[15px] font-semibold text-gray-700">

                            Status

                        </label>

                        <div className="flex items-center gap-4">

                            <TogglableSwitch
                                isActive={status}
                                onToggle={() =>
                                    setStatus(!status)
                                }
                                showLabel={false}
                            />

                            <span
                                className={`text-sm font-medium ${status
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >

                                {status
                                    ? "Active"
                                    : "Inactive"}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">

                <button
                    type="button"
                    onClick={() => {
                        setName("");

                        setGender("male");

                        setStatus(true);

                        setSelectedImage(null);

                        setPreview("");

                        setFileName("No file chosen");

                        router.push("/avatar");


                    }}
                    className="rounded-[10px] border border-gray-300 px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >

                    Cancel

                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`rounded-[10px] px-6 py-2 font-medium text-white transition-all

                        ${loading
                            ? "cursor-not-allowed bg-blue-300"
                            : "bg-[#2563EB] hover:bg-[#1D4ED8]"
                        }`}
                >

                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Saving...
                        </span>
                    ) : (
                        mode === "edit"
                            ? "Update Avatar"
                            : "Save Avatar"
                    )}

                </button>

            </div>

        </div>

    );

}