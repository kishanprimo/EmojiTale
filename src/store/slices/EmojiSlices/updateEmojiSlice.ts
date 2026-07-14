import { createMutationSlice } from "@/store/createMutationSlice";
import { updateEmoji } from "./updateEmojiThunk";

const updateEmojiSlice = createMutationSlice("updateEmoji", updateEmoji);

export const { reset: resetUpdateEmoji } = updateEmojiSlice.actions;
export default updateEmojiSlice.reducer;
