import { createMutationSlice } from "@/store/createMutationSlice";
import { addEmoji } from "./addEmojiThunk";

const addEmojiSlice = createMutationSlice("addEmoji", addEmoji);

export const { reset: resetAddEmoji } = addEmojiSlice.actions;
export default addEmojiSlice.reducer;
