import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import customerSliceRtk from "../features/customers/customerSlice-rtk";
import accountSliceRtk from "../features/accounts/accountSlice-rtk";
import { logger } from "redux-logger";

const storeRTK = configureStore({
  middleware: [...getDefaultMiddleware(), logger],
  reducer: {
    customer: customerSliceRtk,
    account: accountSliceRtk,
  },
});

export default storeRTK;
