import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMessagesByUserId } from "./messageApi";

const initialState = {
    userMessages: null,
    status: "idle"
}

export const fetchMessagesByUserIdAsync = createAsyncThunk(
  "messages/fetchMessagesByUserIdAsync",
  async (userId) => {
    // console.log("Thunk called...")
    const response = await fetchMessagesByUserId(userId);
    return response.data;
  }
);

export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchMessagesByUserIdAsync.pending, (state) => {
                state.status = "loading";
             })
            .addCase(fetchMessagesByUserIdAsync.fulfilled, (state, action) => {
                state.status = "idle";
                // console.log("Got Payload",action.payload)
                state.userMessages= action.payload || [];
                // console.log("user Info",state.userInfo)
                // state.userLoaded = true;
            })
            .addCase(fetchMessagesByUserIdAsync.rejected, (state, action) => {
                state.status = "idle";
                // state.userLoaded = true;
            });
    }
})

export default messageSlice.reducer;