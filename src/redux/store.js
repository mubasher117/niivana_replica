import { configureStore } from "@reduxjs/toolkit"
import navReducer from "./reducers/nav"
import authReducer from "./reducers/auth"
import chatReducer from "./reducers/chat"
export const store = configureStore({
  reducer: {
    nav: navReducer,
    auth: authReducer,
    chat: chatReducer,
  }
})
