import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        password: '',
        isSignedIn: false,
    },
    reducers: {
        signUpUser: (state, action) => {
            const {username, email, password} = action.payload;
            state.username = username;
            state.email = email;
            state.password = password;
            state.isSignedIn = true;
            localStorage.setItem(state.email, JSON.stringify(state));
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
