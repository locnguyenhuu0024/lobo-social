import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers: {
        // Khi login
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isFetching = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        // Khi register
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;

            setTimeout(() => {state.register.success = false;}, 10000);
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },

        // Khi logout
        logoutStart: (state) => {
            state.login.isFetching = true;
            state.login.error = false;
        },
        logoutSuccess: (state) => {
            state.login.currentUser = null;
            state.login.isFetching = false;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        
        // Update
        updateCurrentUser: (state, action) => {
            if(state.login.currentUser.user._id == action.payload._id){
                state.login.currentUser.user = action.payload;
            }
        },

        // Clear After Registered
        registerReset: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = false;
        },
    }
})

export const {
    loginStart, 
    loginSuccess, 
    loginFailed,

    registerStart,
    registerSuccess,
    registerFailed,

    logoutStart,
    logoutSuccess,
    logoutFailed,

    updateCurrentUser,
    registerReset,
} = authSlice.actions;
export default authSlice.reducer;