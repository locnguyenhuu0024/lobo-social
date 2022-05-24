import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        loadFollowing: {
            isFetching: false,
            error: false,
            list: []
        },
        loadUser: {
            isFetching: false,
            error: false,
            user: null
        }
    },
    reducers:{
        loadFollowingStart: (state) => {
            state.loadFollowing.isFetching = true;
            state.loadFollowing.error = false;
            state.loadFollowing.list = []
        },
        loadFollowingSuccess: (state, action) => {
            state.loadFollowing.isFetching = false;
            state.loadFollowing.error = false;
            state.loadFollowing.list = action.payload;
        },
        loadFollowingFailed: (state) => {
            state.loadFollowing.isFetching = false;
            state.loadFollowing.error = true;
        },

        loadUserStart: (state) => {
            state.loadUser.isFetching = true;
            state.loadUser.error = false;
            state.loadUser.user = null;
        },
        loadUserSuccess: (state, action) => {
            state.loadUser.isFetching = false;
            state.loadUser.error = false;
            state.loadUser.user = action.payload;
        },
        loadUserFailed: (state) => {
            state.loadUser.isFetching = false;
            state.loadUser.error = true;
            state.loadUser.user = null;
        },
    }
});

export const {
    loadFollowingStart,
    loadFollowingSuccess,
    loadFollowingFailed,
    
    loadUserStart,
    loadUserSuccess,
    loadUserFailed,

    
} = userSlice.actions;
export default userSlice.reducer;