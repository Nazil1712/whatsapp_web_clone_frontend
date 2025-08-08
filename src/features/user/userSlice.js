import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, fetchUserById } from "./userApi";

const initialState = {
    users: null,
    selectedUser: null,
    status: "idle"
}

export const fetchAllUsersAsync = createAsyncThunk(
  "users/fetchAllUsersAsync",
  async (userId) => {
    // console.log("Thunk called...")
    const response = await fetchAllUsers(userId);
    return response.data;
  }
);

export const fetchUserByIdAsync = createAsyncThunk(
  "users/fetchUserByIdAsync",
  async (userId) => {
    // console.log("Thunk called...")
    const response = await fetchUserById(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchAllUsersAsync.pending, (state) => {
                state.status = "loading";
             })
            .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
                state.status = "idle";
                // console.log("Got Payload",action.payload)
                state.users = action.payload || [];
                // console.log("user Info",state.userInfo)
                // state.userLoaded = true;
            })
            .addCase(fetchAllUsersAsync.rejected, (state, action) => {
                state.status = "idle";
                // state.userLoaded = true;
            })
            .addCase(fetchUserByIdAsync.pending, (state) => {
                state.status = "loading";
             })
            .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
                state.status = "idle";
                // console.log("Got Payload",action.payload)
                state.selectedUser = action.payload;
                // console.log("Payload",action.payload)
                // console.log("user Info",state.userInfo)
                // state.userLoaded = true;
            })
            .addCase(fetchUserByIdAsync.rejected, (state, action) => {
                state.status = "idle";
                // state.userLoaded = true;
            });
    }
})

export default userSlice.reducer;