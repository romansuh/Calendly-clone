import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {API_ADDRESS, API_ENDPOINTS} from "../../../common/constants/api";
import {LOCAL_STORAGE_KEYS} from "../../../common/constants/constants";

const apiUrlUsers = API_ADDRESS + API_ENDPOINTS.USERS;

export const fetchUsers = createAsyncThunk("users/fetchUsers", () =>
    axios.get(apiUrlUsers).then((response) => response.data)
);

export const addUser = createAsyncThunk("users/addUser", (newUser) =>
    axios.post(apiUrlUsers, newUser).then((response) => response.data)
);

export const getUserById = createAsyncThunk("users/getUserById", (userId) =>
    axios.get(`${apiUrlUsers}/${userId}`).then((response) => response.data)
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
        token: null,
    },
    reducers: {
        logInUser: (state, action) => {
            let encodedToken = btoa(JSON.stringify(action.payload));
            state.token = encodedToken;
            state.user = action.payload;
            localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, encodedToken);
        },
        logOutUser: (state) => {
            state.token = null;
            state.user = {};
            localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
        },
        getToken: (state) => {
            state.token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users = [action.payload, ...state.users];
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.currentEventOwner = action.payload[0];
            });
    },
});

export const {logInUser, logOutUser, getToken} = userSlice.actions;

export default userSlice.reducer;
