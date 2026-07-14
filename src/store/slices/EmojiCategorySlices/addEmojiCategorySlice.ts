import { createMutationSlice } from "@/store/createMutationSlice";
import { addEmojiCategory } from "./addEmojiCategoryThunk";

const addEmojiCategorySlice = createMutationSlice("addEmojiCategory", addEmojiCategory);

export const { reset: resetAddEmojiCategory } = addEmojiCategorySlice.actions;
export default addEmojiCategorySlice.reducer;
