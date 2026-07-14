import { createMutationSlice } from "@/store/createMutationSlice";
import { updateTheme } from "./updateThemeThunk";

const updateThemeSlice = createMutationSlice("updateTheme", updateTheme);

export const { reset: resetUpdateTheme } = updateThemeSlice.actions;
export default updateThemeSlice.reducer;
