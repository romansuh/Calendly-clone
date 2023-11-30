import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {API_ADDRESS, API_ENDPOINTS} from "../../../common/api/api";
import {LOCAL_STORAGE_KEYS} from "../../../common/constants";

const apiUrlUsers = API_ADDRESS + API_ENDPOINTS.USERS;

export const fetchUsers = createAsyncThunk("users/fetchUsers", () =>
    axios.get(apiUrlUsers).then((response) => response.data)
);

export const addUser = createAsyncThunk("users/addUser", (newUser) =>
    axios.post(apiUrlUsers, newUser).then((response) => response.data)
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
        token: undefined,
    },
    reducers: {
        logInUser: (state, action) => {
            let encodedToken = btoa(JSON.stringify(action.payload));
            state.token = encodedToken;
            localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, encodedToken);
        },
        logOutUser: (state) => {
            state.token = undefined;
            state.user = {};
            localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
        },
        getUserId: (state) => {
            const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
            if (storedToken) {
                const decodedToken = atob(storedToken);
                const userInfo = JSON.parse(decodedToken);
                const foundUser = state.users.find(
                    (user) => user.email === userInfo.email
                );

                state.user = foundUser || {};
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users = [action.payload, ...state.users];
            });
    },
});

export const {logInUser, logOutUser} = userSlice.actions;

export default userSlice.reducer;
