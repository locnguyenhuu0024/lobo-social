import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
    name: 'notify',
    initialState:{
        loadNotify: {
            isFetching: false,
            notifies: [],
            error: false
        }
    },
    reducers:{
        // Load thông báo về
        loadNotifyStart: (state) => {
            state.loadNotify.isFetching = true;
            state.loadNotify.error = false;
            state.loadNotify.notifies = []
        },
        loadNotifySuccess: (state, action) => {
            state.loadNotify.isFetching = false;
            state.loadNotify.error = false;
            state.loadNotify.notifies = action.payload;
        },
        loadNotifyFailed: (state) => {
            state.loadNotify.isFetching = false;
            state.loadNotify.error = true;
        },
        
    }
});

export const {
    loadNotifyStart,
    loadNotifySuccess,
    loadNotifyFailed,
} = notifySlice.actions;
export default notifySlice.reducer;