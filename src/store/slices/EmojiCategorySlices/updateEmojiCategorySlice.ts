import { createMutationSlice } from "@/store/createMutationSlice";
import { updateEmojiCategory } from "./updateEmojiCategoryThunk";

const updateEmojiCategorySlice = createMutationSlice("updateEmojiCategory", updateEmojiCategory);

export const { reset: resetUpdateEmojiCategory } = updateEmojiCategorySlice.actions;
export default updateEmojiCategorySlice.reducer;
