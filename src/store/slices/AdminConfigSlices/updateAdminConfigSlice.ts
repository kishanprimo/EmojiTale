import { createMutationSlice } from "@/store/createMutationSlice";
import { updateAdminConfig } from "./updateAdminConfigThunk";

const updateAdminConfigSlice = createMutationSlice("updateAdminConfig", updateAdminConfig);

export const { reset: resetUpdateAdminConfig } = updateAdminConfigSlice.actions;
export default updateAdminConfigSlice.reducer;
