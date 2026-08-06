
import { AdminStoryItem } from "@/types/AdminStoryTypes/adminStoryTypes";
 
export interface StoryByLanguageResponse {
    success: boolean;
    message: string;
    data: {
        story: AdminStoryItem;
    };
}
 
export interface StoryTitleTranslation {
    adminstorytranslation_id: number;
    adminstory_id: number;
    language_id: number;
    title: string;
    is_manual: boolean;
}
 
export interface StoryMediaTranslation {
    storymediatranslation_id: number;
    storymedia_id: number;
    language_id: number;
    content: string;
    is_manual: boolean;
}
 
export interface UpdateStoryTitleTranslationResponse {
    success: boolean;
    message: string;
    data: {
        translation: StoryTitleTranslation;
    };
}
 
export interface UpdateStoryMediaTranslationResponse {
    success: boolean;
    message: string;
    data: {
        translation: StoryMediaTranslation;
    };
}