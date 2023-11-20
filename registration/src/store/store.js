import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/users/userSlice';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        users: userReducer,
    },
    middleware: [thunk],
});

export default store;