import {combineReducers, configureStore} from '@reduxjs/toolkit';
import users from './reducers/users/userSlice';
import events from './reducers/events/eventSlice';

const store = configureStore({
    reducer: combineReducers({
        users,
        events
    })
});

export default store;