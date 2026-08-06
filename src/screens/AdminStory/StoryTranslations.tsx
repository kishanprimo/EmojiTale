"use client";
 
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { proxiedImage } from "@/lib/imageProxy";
import { toast } from "react-hot-toast";
import { ChevronDown, Languages, Loader2, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getLanguages } from "@/store/slices/LanguageSlices/languageThunk";
import {
    getAdminStoryByLanguage,
    updateStoryMediaTranslation,
    updateStoryTitleTranslation,
} from "@/store/slices/StoryTranslationSlices/storyTranslationThunk";
import { resetStoryTranslation } from "@/store/slices/StoryTranslationSlices/storyTranslationSlice";
 
interface Props {
    storyId: number;
}
 
interface TranslatedPage {
    storymedia_id: number;
    image: string;
    loadedContent: string;
    sourceContent: string;
}
 
/**
 * Manual per-language edit. Auto-translation already fills these in the
 * background — saving here marks the row as manual so it is never overwritten.
 */
export default function StoryTranslations({ storyId }: Props) {
    const dispatch = useAppDispatch();
 
    const { languages } = useAppSelector((state) => state.language);
    const { story, loading, saving } = useAppSelector((state) => state.storyTranslation);
 
    const [languageId, setLanguageId] = useState<number | "">("");
    // drafts hold only what the admin typed; everything else is derived from the API response
    const [titleDraft, setTitleDraft] = useState<string | null>(null);
    const [pageDrafts, setPageDrafts] = useState<Record<number, string>>({});
 
    const translatableLanguages = useMemo(
        () => languages.filter((lang) => !lang.is_original),
        [languages],
    );
 
    useEffect(() => {
        dispatch(getLanguages({ page: 1, limit: 100 }));
        return () => {
            dispatch(resetStoryTranslation());
        };
    }, [dispatch]);
 
    useEffect(() => {
        if (!languageId) return;
        dispatch(getAdminStoryByLanguage({ id: storyId, language_id: Number(languageId) }));
    }, [dispatch, storyId, languageId]);
 
    const handleLanguageChange = (value: number | "") => {
        setLanguageId(value);
        setTitleDraft(null);
        setPageDrafts({});
    };
 
    const loadedTitle = story?.title ?? "";
    const sourceTitle = story?.original_title ?? loadedTitle;
    const title = titleDraft ?? loadedTitle;
 
    const pages: TranslatedPage[] = useMemo(
        () =>
            story
                ? [...story.media]
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((media) => ({
                          storymedia_id: media.storymedia_id,
                          image: media.image,
                          loadedContent: media.content ?? "",
                          sourceContent: media.original_content ?? media.content ?? "",
                      }))
                : [],
        [story],
    );
 
    const contentOf = (page: TranslatedPage) => pageDrafts[page.storymedia_id] ?? page.loadedContent;
 
    const updatePageContent = (storymedia_id: number, content: string) => {
        setPageDrafts((prev) => ({ ...prev, [storymedia_id]: content }));
    };
 
    const changedPages = pages.filter((page) => contentOf(page).trim() !== page.loadedContent.trim());
    const titleChanged = title.trim() !== loadedTitle.trim();
    const hasChanges = titleChanged || changedPages.length > 0;
 
    const handleSave = async () => {
        if (!languageId || !hasChanges) return;
 
        if (titleChanged && !title.trim()) {
            toast.error("Translated title cannot be empty");
            return;
        }
        if (changedPages.some((page) => !contentOf(page).trim())) {
            toast.error("Translated page text cannot be empty");
            return;
        }
 
        try {
            if (titleChanged) {
                await dispatch(
                    updateStoryTitleTranslation({
                        id: storyId,
                        language_id: Number(languageId),
                        title: title.trim(),
                    }),
                ).unwrap();
            }
 
            for (const page of changedPages) {
                await dispatch(
                    updateStoryMediaTranslation({
                        storymedia_id: page.storymedia_id,
                        language_id: Number(languageId),
                        content: contentOf(page).trim(),
                    }),
                ).unwrap();
            }
 
            toast.success("Translation saved successfully");
            setTitleDraft(null);
            setPageDrafts({});
            dispatch(getAdminStoryByLanguage({ id: storyId, language_id: Number(languageId) }));
        } catch (error) {
            toast.error((error as string) || "Failed to save translation");
        }
    };
 
    return (
        <div className="mt-6 bg-white border border-gray-200 hidden rounded-2xl">
            <div className="border-b border-gray-100 px-6 py-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF]">
                        <Languages size={20} className="text-[#2563EB]" />
                    </div>
                    <div>
                        <h2 className="text-[17px] font-semibold text-[#101828]">Translations</h2>
                        <p className="text-sm text-[#667085] mt-0.5">
                            Pick a language to review or manually edit the translated title and page text.
                        </p>
                    </div>
                </div>
            </div>
 
            <div className="p-6 space-y-6">
                <div className="max-w-sm">
                    <label className="block mb-2 text-[14px] font-semibold text-gray-700">Language</label>
                    <div className="relative">
                        <select
                            value={languageId}
                            onChange={(e) => handleLanguageChange(e.target.value ? Number(e.target.value) : "")}
                            className="w-full h-12 rounded-[10px] border border-gray-300 bg-white px-4 pr-12 text-[#101828] outline-none appearance-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">Select a language</option>
                            {translatableLanguages.map((lang) => (
                                <option key={lang.language_id} value={lang.language_id}>
                                    {lang.flag ? `${lang.flag} ` : ""}{lang.name} ({lang.code.toUpperCase()})
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
 
                {!languageId ? (
                    <div className="rounded-xl bg-[#EEF4FF] border border-blue-100 p-4">
                        <p className="text-xs font-semibold text-[#2563EB] mb-1">How it works</p>
                        <p className="text-xs text-[#3B82F6] leading-relaxed">
                            Every language is translated automatically when a story is created or its text is
                            updated. Edit here only when you want to fine-tune one language — manually edited
                            text is never overwritten by auto-translation.
                        </p>
                    </div>
                ) : loading ? (
                    <div className="flex items-center gap-2 py-8 text-sm text-[#667085]">
                        <Loader2 size={16} className="animate-spin" /> Loading translation...
                    </div>
                ) : (
                    <>
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Translated Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitleDraft(e.target.value)}
                                placeholder="Translated title..."
                                className="w-full h-12 rounded-[10px] border border-gray-300 bg-white px-4 text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors"
                            />
                            <p className="mt-1.5 text-xs text-[#98A2B3]">Original: {sourceTitle || "—"}</p>
                        </div>
 
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Translated Pages
                            </label>
                            <div className="space-y-4">
                                {pages.length === 0 && (
                                    <p className="text-sm text-[#667085]">No pages found for this story.</p>
                                )}
                                {pages.map((page, index) => (
                                    <div key={page.storymedia_id} className="rounded-xl border border-gray-200 p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-semibold text-gray-700">Page {index + 1}</h4>
                                        </div>
                                        <div className="flex gap-4">
                                            {page.image && (
                                                <Image
                                                    src={proxiedImage(page.image)!}
                                                    alt={`Page ${index + 1}`}
                                                    width={112}
                                                    height={112}
                                                    unoptimized
                                                    className="h-28 w-28 rounded-xl object-cover border border-gray-200"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <textarea
                                                    value={contentOf(page)}
                                                    onChange={(e) => updatePageContent(page.storymedia_id, e.target.value)}
                                                    rows={4}
                                                    placeholder="Translated text for this page..."
                                                    className="w-full resize-none rounded-[10px] border border-gray-300 px-3 py-2 text-sm text-[#101828] placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors"
                                                />
                                                <p className="mt-1.5 text-xs text-[#98A2B3] line-clamp-2">
                                                    Original: {page.sourceContent || "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
 
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving || !hasChanges}
                                className={`flex items-center gap-2 rounded-[10px] px-6 py-2 text-sm font-medium text-white transition-all ${saving || !hasChanges ? "cursor-not-allowed bg-blue-300" : "bg-[#2563EB] hover:bg-[#1D4ED8]"}`}
                            >
                                {saving ? (
                                    <><Loader2 size={16} className="animate-spin" /> Saving...</>
                                ) : (
                                    <><Save size={16} /> Save Translation</>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}