import { createMutationSlice } from "@/store/createMutationSlice";
import { addLanguage } from "./addLanguageThunk";

const addLanguageSlice = createMutationSlice("addLanguage", addLanguage);

export const { reset: resetAddLanguage } = addLanguageSlice.actions;
export default addLanguageSlice.reducer;
