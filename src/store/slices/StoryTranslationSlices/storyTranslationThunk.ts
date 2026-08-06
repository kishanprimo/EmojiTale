import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import {
    StoryByLanguageResponse,
    UpdateStoryMediaTranslationResponse,
    UpdateStoryTitleTranslationResponse,
} from "@/types/StoryTranslationTypes/storyTranslationTypes";
 
export const getAdminStoryByLanguage = createApiThunk<
    StoryByLanguageResponse,
    { id: number; language_id: number }
>(
    "storyTranslation/getStoryByLanguage",
    ({ id, language_id }) => axios.get(`/admin-story/${id}`, { params: { language_id } }),
    "Failed to fetch story translation",
);
 
export const updateStoryTitleTranslation = createApiThunk<
    UpdateStoryTitleTranslationResponse,
    { id: number; language_id: number; title: string }
>(
    "storyTranslation/updateTitle",
    ({ id, language_id, title }) =>
        axios.patch(`/admin-story/${id}/translation`, { language_id, title }),
    "Failed to update story title translation",
);
 
export const updateStoryMediaTranslation = createApiThunk<
    UpdateStoryMediaTranslationResponse,
    { storymedia_id: number; language_id: number; content: string }
>(
    "storyTranslation/updateMedia",
    ({ storymedia_id, language_id, content }) =>
        axios.patch(`/admin-story/media/${storymedia_id}/translation`, { language_id, content }),
    "Failed to update page translation",
);

