import { createMutationSlice } from "@/store/createMutationSlice";
import { addTheme } from "./addThemeThunk";

const addThemeSlice = createMutationSlice("addTheme", addTheme);

export const { reset: resetAddTheme } = addThemeSlice.actions;
export default addThemeSlice.reducer;
