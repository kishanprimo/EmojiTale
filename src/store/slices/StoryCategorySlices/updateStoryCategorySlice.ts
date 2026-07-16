import { createMutationSlice } from "@/store/createMutationSlice";
import { updateStoryCategory } from "./updateStoryCategoryThunk";

const updateStoryCategorySlice = createMutationSlice("updateStoryCategory", updateStoryCategory);

export const { reset: resetUpdateStoryCategory } = updateStoryCategorySlice.actions;
export default updateStoryCategorySlice.reducer;
