import { createMutationSlice } from "@/store/createMutationSlice";
import { deleteStoryCategory } from "./deleteStoryCategoryThunk";

const deleteStoryCategorySlice = createMutationSlice("deleteStoryCategory", deleteStoryCategory);

export const { reset: resetDeleteStoryCategory } = deleteStoryCategorySlice.actions;
export default deleteStoryCategorySlice.reducer;
