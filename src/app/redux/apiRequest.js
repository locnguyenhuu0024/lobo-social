import axios from "axios";
import { 
    loginFailed, 
    loginStart, 
    loginSuccess, 
    registerFailed, 
    registerStart, 
    registerSuccess 
} from "./authSlice";
import {
    getPostsStart,
    getPostsSuccess,
    getPostsFailed
} from './postSlice'


export const loginUser = async (url, user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(url, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
}

export const registerUser = async (url, user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(url, user);
        dispatch(registerSuccess());
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const getPosts = async (url, dispatch) => {
    dispatch(getPostsStart());
    try {
        const res = await axios.get(url);
        dispatch(getPostsSuccess(res.data));
    } catch (error) {
        dispatch(getPostsFailed());
    }
}