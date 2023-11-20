import {createSlice} from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
    },
    reducers: {
        createNewEvent: (state, action) => {
            const newEvent = action.payload;
            state.events = [...state.events, newEvent];
        }
    }
});

export const {createNewEvent} = eventSlice.actions;

export default eventSlice.reducer;