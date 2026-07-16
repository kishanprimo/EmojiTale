import { createMutationSlice } from "@/store/createMutationSlice";
import { updateAdminStory } from "./updateAdminStoryThunk";

const updateAdminStorySlice = createMutationSlice("updateAdminStory", updateAdminStory);

export const { reset: resetUpdateAdminStory } = updateAdminStorySlice.actions;
export default updateAdminStorySlice.reducer;
