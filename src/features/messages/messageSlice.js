import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMessagesByUserId } from "./messageApi";

const initialState = {
    userMessages: null,
    latestMessages: null,
    status: "idle"
}

export const fetchMessagesByUserIdAsync = createAsyncThunk(
  "messages/fetchMessagesByUserIdAsync",
  async (userId) => {
    const response = await fetchMessagesByUserId(userId);
    return response.data;
  }
);


export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.userMessages.push(action.payload);
        }
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

export const {addMessage} = messageSlice.actions;

export default messageSlice.reducer;