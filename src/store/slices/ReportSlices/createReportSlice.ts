import { createMutationSlice } from "@/store/createMutationSlice";
import { createReport } from "./createReportThunk";

const createReportSlice = createMutationSlice("createReport", createReport);

export const { reset: resetCreateReport } = createReportSlice.actions;
export default createReportSlice.reducer;
