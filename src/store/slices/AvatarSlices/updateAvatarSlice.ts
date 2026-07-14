import { createMutationSlice } from "@/store/createMutationSlice";
import { updateAvatar } from "./updateAvatarThunk";

const updateAvatarSlice = createMutationSlice("updateAvatar", updateAvatar);

export const { reset: resetUpdateAvatar } = updateAvatarSlice.actions;
export default updateAvatarSlice.reducer;
