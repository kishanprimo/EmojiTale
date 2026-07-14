import { createMutationSlice } from "@/store/createMutationSlice";
import { addStoryCategory } from "./addStoryCategoryThunk";

const addStoryCategorySlice = createMutationSlice("addStoryCategory", addStoryCategory);

export const { reset: resetAddStoryCategory } = addStoryCategorySlice.actions;
export default addStoryCategorySlice.reducer;
