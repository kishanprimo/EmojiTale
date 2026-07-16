import { createMutationSlice } from "@/store/createMutationSlice";
import { deleteAdminStory } from "./deleteAdminStoryThunk";

const deleteAdminStorySlice = createMutationSlice("deleteAdminStory", deleteAdminStory);

export const { reset: resetDeleteAdminStory } = deleteAdminStorySlice.actions;
export default deleteAdminStorySlice.reducer;
