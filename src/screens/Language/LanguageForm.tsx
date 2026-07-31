"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Select, { SingleValue, StylesConfig, FilterOptionOption } from "react-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLanguage } from "@/store/slices/LanguageSlices/addLanguageThunk";
import { resetAddLanguage } from "@/store/slices/LanguageSlices/addLanguageSlice";
import { updateLanguage } from "@/store/slices/LanguageSlices/updateLanguageThunk";
import { resetUpdateLanguage } from "@/store/slices/LanguageSlices/updateLanguageSlice";
import { LanguageItem } from "@/types/LanguageTypes/languageTypes";
import { languageOptions, LanguageOption } from "@/data/languageOptions";

interface Props {
    editItem?: LanguageItem;
}

const selectStyles: StylesConfig<LanguageOption, false> = {
    control: (base, state) => ({
        ...base,
        minHeight: 48,
        borderRadius: 10,
        borderColor: state.isFocused ? "#2563EB" : "#D1D5DB",
        boxShadow: "none",
        "&:hover": { borderColor: "#2563EB" },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#2563EB" : state.isFocused ? "#EFF6FF" : "white",
        color: state.isSelected ? "white" : "#101828",
    }),
    valueContainer: (base) => ({ ...base, padding: "2px 16px" }),
};

function filterByCountry(option: FilterOptionOption<LanguageOption>, input: string) {
    if (!input) return true;
    return option.data.country.toLowerCase().includes(input.toLowerCase());
}

function optionLabel(option: LanguageOption) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-xl leading-none">{option.flag}</span>
            <span className="font-medium text-[#101828]">{option.country}</span>
            <span className="text-sm text-[#667085]">
                {option.name} ({option.native_label})
            </span>
            <span className="ml-auto text-xs uppercase text-[#98A2B3]">{option.code}</span>
        </div>
    );
}

export default function LanguageForm({ editItem }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const isEdit = !!editItem;

    const { loading: addLoading, success: addSuccess } = useAppSelector((state) => state.addLanguage);
    const { loading: updateLoading, success: updateSuccess } = useAppSelector((state) => state.updateLanguage);

    const loading = isEdit ? updateLoading : addLoading;
    const success = isEdit ? updateSuccess : addSuccess;

    const [selected, setSelected] = useState<LanguageOption | null>(() => {
        if (!editItem) return null;
        return (
            languageOptions.find(
                (o) => o.code === editItem.code && o.flag === editItem.flag
            ) ??
            languageOptions.find((o) => o.code === editItem.code) ?? {
                country: editItem.name,
                countryCode: editItem.code,
                code: editItem.code,
                name: editItem.name,
                native_label: editItem.native_label,
                flag: editItem.flag ?? "",
            }
        );
    });
    const [isOriginal, setIsOriginal] = useState(editItem?.is_original ?? false);

    useEffect(() => {
        if (!success) return;
        toast.success(isEdit ? "Language updated successfully!" : "Language created successfully!");
        if (isEdit) dispatch(resetUpdateLanguage());
        else dispatch(resetAddLanguage());
        router.push("/language/all");
    }, [success, dispatch, router, isEdit]);

    const handleSubmit = async () => {
        if (!selected) { toast.error("Please select a language"); return; }

        const payload = {
            code: selected.code,
            name: selected.name,
            native_label: selected.native_label,
            flag: selected.flag || null,
            is_original: isOriginal,
        };

        try {
            if (isEdit) {
                await dispatch(updateLanguage({ id: editItem!.language_id, payload })).unwrap();
            } else {
                await dispatch(addLanguage(payload)).unwrap();
            }
        } catch (error) {
            toast.error((error as string) || "Something went wrong");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {isEdit ? "Edit Language" : "Add Language"}
                </h2>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 space-y-7">

                <div>
                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                        Language <span className="text-red-500">*</span>
                    </label>
                    <Select<LanguageOption, false>
                        options={languageOptions}
                        value={selected}
                        onChange={(option: SingleValue<LanguageOption>) => setSelected(option)}
                        getOptionValue={(option) => option.countryCode}
                        getOptionLabel={(option) => option.country}
                        formatOptionLabel={optionLabel}
                        filterOption={filterByCountry}
                        placeholder="Select a country"
                        isSearchable
                        styles={selectStyles}
                    />
                </div>

                <label className="flex items-center gap-3 cursor-pointer w-fit">
                    <input
                        type="checkbox"
                        checked={isOriginal}
                        onChange={(e) => setIsOriginal(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-[#2563EB] focus:ring-blue-500"
                    />
                    <span className="text-[15px] font-medium text-gray-700">Mark as original language</span>
                </label>

            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push("/language/all")}
                    className="rounded-[10px] border border-gray-300 px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`rounded-[10px] px-6 py-2 font-medium text-white transition-all ${loading ? "cursor-not-allowed bg-blue-300" : "bg-[#2563EB] hover:bg-[#1D4ED8]"}`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            {isEdit ? "Updating..." : "Saving..."}
                        </span>
                    ) : isEdit ? "Update Language" : "Save Language"}
                </button>
            </div>
        </div>
    );
}
