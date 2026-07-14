import { createMutationSlice } from "@/store/createMutationSlice";
import { generateAdminStory } from "./generateStoryThunk";

const generateStorySlice = createMutationSlice("generateStory", generateAdminStory);

export const { reset: resetGenerateStory } = generateStorySlice.actions;
export default generateStorySlice.reducer;
