import { createMutationSlice } from "@/store/createMutationSlice";
import { addAvatar } from "./addAvatarThunk";

const addAvatarSlice = createMutationSlice("addAvatar", addAvatar);

export const { reset: resetAddAvatar } = addAvatarSlice.actions;
export default addAvatarSlice.reducer;
