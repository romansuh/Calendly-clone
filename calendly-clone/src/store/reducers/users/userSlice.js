import {createSlice} from '@reduxjs/toolkit';
import {LOCAL_STORAGE_KEYS} from "../../../common/constants";

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
    },
    reducers: {
        signUpUser: (state, action) => {
            // const {username, email, password} = action.payload;
            // state.username = username;
            // state.email = email;
            // state.password = password;
            // state.isSignedIn = true;
            // localStorage.setItem(state.email, JSON.stringify(state));

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
});

export const {signUpUser, signInUser} = userSlice.actions;

export default userSlice.reducer;
