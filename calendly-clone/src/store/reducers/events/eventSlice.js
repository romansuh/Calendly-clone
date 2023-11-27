import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {API_ADDRESS, API_ENDPOINTS} from "../../../common/api/api";

const apiUrlEvents = API_ADDRESS + API_ENDPOINTS.EVENTS;

export const addNewEvent = createAsyncThunk("events/addEvent", (newEvent) =>
    axios.post(apiUrlEvents, newEvent).then((response) => response.data)
);

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewEvent.fulfilled, (state, action) => {
                state.events = [action.payload, ...state.events];
            })
    },
});

export const {createNewEvent} = eventSlice.actions;

export default eventSlice.reducer;