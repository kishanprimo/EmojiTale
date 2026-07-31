import { createMutationSlice } from "@/store/createMutationSlice";
import { deleteLanguage } from "./deleteLanguageThunk";

const deleteLanguageSlice = createMutationSlice("deleteLanguage", deleteLanguage);

export const { reset: resetDeleteLanguage } = deleteLanguageSlice.actions;
export default deleteLanguageSlice.reducer;
