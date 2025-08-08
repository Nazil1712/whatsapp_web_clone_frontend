import { configureStore } from '@reduxjs/toolkit';

import userReducer from "../features/user/userSlice"
import messageReducer from "../features/messages/messageSlice"

export const store = configureStore({
  reducer: {
    users : userReducer,
    messages: messageReducer
  },
});
