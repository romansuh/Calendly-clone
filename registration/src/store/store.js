// TODO:rework userSlice and eventSlice so events and users store in localStorage (by keys 'EVENTS' and 'USERS')
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/users/userSlice';
import eventReducer from './reducers/events/eventSlice';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        users: userReducer,
        events: eventReducer,
    },
    middleware: [thunk],
});

export default store;