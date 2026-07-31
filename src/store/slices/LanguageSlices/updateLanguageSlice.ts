import { createMutationSlice } from "@/store/createMutationSlice";
import { updateLanguage } from "./updateLanguageThunk";

const updateLanguageSlice = createMutationSlice("updateLanguage", updateLanguage);

export const { reset: resetUpdateLanguage } = updateLanguageSlice.actions;
export default updateLanguageSlice.reducer;
