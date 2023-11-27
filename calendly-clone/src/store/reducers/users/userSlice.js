import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {LOCAL_STORAGE_KEYS} from "../../../common/constants";
import axios from "axios";
import {API_ADDRESS, API_ENDPOINTS} from "../../../common/api/api";

const apiUrlUsers = API_ADDRESS + API_ENDPOINTS.USERS;

export const fetchUsers = createAsyncThunk("users/fetchUsers", () =>
    axios.get(apiUrlUsers).then((response) => response.data)
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
    },
    reducers: {
        signUpUser: (state, action) => {
            const newUser = action.payload;
            state.users = [...state.users, newUser];
            localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(state.users));
        },
        signInUser: (state, action) => {
            const storedUser = action.payload;
            state.email = storedUser.email;
            state.isSignedIn = true;

            const storedUserStorageData = JSON.parse(localStorage.getItem(state.email));
            // storedUserStorageData.isSignedIn = true;

            localStorage.setItem(state.email, JSON.stringify(storedUserStorageData));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    },
});

export const {signUpUser, signInUser} = userSlice.actions;

export default userSlice.reducer;
