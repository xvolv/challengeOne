import { configureStore } from "@reduxjs/toolkit";

import nameReducer from "./nameSlice";

export const store = configureStore({
    reducer: {
        name: nameReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;