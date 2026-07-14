import { createMutationSlice } from "@/store/createMutationSlice";
import { createNotification } from "./addNotificationThunk";

const addNotificationSlice = createMutationSlice("addNotification", createNotification);

export const { reset: resetAddNotification } = addNotificationSlice.actions;
export default addNotificationSlice.reducer;
