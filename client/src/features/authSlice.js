import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch2 } from "../helpers/fetch";

const initialState = {
    token: "",
    loading: false,
    error: ""
}


export const userSignup = createAsyncThunk(
    'usersignup',
    async (body) => {
        const result = await fetch2('/signup', body)
        return result
    }
)

export const userSignin = createAsyncThunk(
    'usersignin',
    async (body) => {
        const result = await fetch2('/signin', body)
        return result
    }
)

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken : (state , action)=>{
           state.token = localStorage.getItem('token')
        },

        logOut : (state , action)=>{
            state.token = null 
            localStorage.removeItem('token')

        }
    },
    extraReducers : {
        [userSignup.fulfilled] : (state , {payload : {error , message}})=>{
            state.loading = false
            if(error)
            {
                state.error = error
            }else{
                state.error = message
            }
        },
        [userSignup.pending] : (state , action)=>{
            state.loading = true
        },
        [userSignin.pending] : (state , action)=>{
            state.loading = true
        },

        [userSignin.fulfilled] : (state , {payload : {error , token}})=>{
            state.loading = false
            if(error)
            {
                state.error = error
            }else{
                state.token = token
                localStorage.setItem('token',token)
            }
        },

    }

})

export const {addToken , logOut} = authSlice.actions;

export default authSlice.reducer;