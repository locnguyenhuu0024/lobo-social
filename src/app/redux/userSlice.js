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
        },
        follow: {
            isFetching: false,
            error: false,
            success: false
        },
        block: {
            isFetching: false,
            error: false,
            success: false
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

        followReset: (state) => {
            state.follow.isFetching = false;
            state.follow.error = false;
            state.follow.success = false;
        },
        followStart: (state) => {
            state.follow.isFetching = true;
            state.follow.error = false;
            state.follow.success = false;
        },
        followSuccess: (state) => {
            state.follow.isFetching = false;
            state.follow.error = false;
            state.follow.success = true;
        },
        followFailed: (state) => {
            state.follow.isFetching = false;
            state.follow.error = true;
            state.follow.success = false;
        },

        blockStart: (state) => {
            state.follow.isFetching = true;
            state.follow.error = false;
            state.follow.success = false;
        },
        blockSuccess: (state) => {
            state.follow.isFetching = false;
            state.follow.error = false;
            state.follow.success = true;
        },
        blockFailed: (state) => {
            state.follow.isFetching = false;
            state.follow.error = true;
            state.follow.success = false;
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

    followReset,
    followStart,
    followSuccess,
    followFailed,
    
    blockStart,
    blockSuccess,
    blockFailed,
} = userSlice.actions;
export default userSlice.reducer;