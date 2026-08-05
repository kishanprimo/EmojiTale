import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Dynamic translations type
 * Example:
 * {
 *   en: "Food",
 *   hi: "खाना",
 *   fr: "Nourriture"
 * }
 */
export type Translations = Record<string, string>;

export interface SelectedEmojiCategory {
  emoji_category_id: number;
  name: string;
  is_premium: boolean;
  emoji_category_image: string;

  // ✅ dynamic translations (no fixed languages)
  translations?: Translations;
}

interface SelectedEmojiCategoryState {
  category: SelectedEmojiCategory | null;

  // optional but useful for UI
  currentLanguage: string;
}

const initialState: SelectedEmojiCategoryState = {
  category: null,
  currentLanguage: "en", // default language
};

const selectedEmojiCategorySlice = createSlice({
  name: "selectedEmojiCategory",
  initialState,
  reducers: {
    // ✅ set full category
    setSelectedEmojiCategory(
      state,
      action: PayloadAction<SelectedEmojiCategory>
    ) {
      state.category = action.payload;
    },

    // ✅ clear category
    clearSelectedEmojiCategory(state) {
      state.category = null;
    },

    // ✅ change current language dynamically
    setCurrentLanguage(state, action: PayloadAction<string>) {
      state.currentLanguage = action.payload;
    },

    // ✅ update single translation dynamically
    updateTranslation(
      state,
      action: PayloadAction<{ lang: string; value: string }>
    ) {
      if (!state.category) return;

      if (!state.category.translations) {
        state.category.translations = {};
      }

      state.category.translations[action.payload.lang] =
        action.payload.value;
    },

    // ✅ replace all translations (useful for API response)
    setTranslations(state, action: PayloadAction<Translations>) {
      if (!state.category) return;
      state.category.translations = action.payload;
    },
  },
});

export const {
  setSelectedEmojiCategory,
  clearSelectedEmojiCategory,
  setCurrentLanguage,
  updateTranslation,
  setTranslations,
} = selectedEmojiCategorySlice.actions;

export default selectedEmojiCategorySlice.reducer;