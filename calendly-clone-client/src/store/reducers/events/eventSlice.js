import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {API_ADDRESS, API_ENDPOINTS} from "../../../common/constants/api";

const apiUrlEvents = API_ADDRESS + API_ENDPOINTS.EVENTS;

export const fetchEvents = createAsyncThunk("events/fetchEvents", (userId) => {
    return axios.get(apiUrlEvents).then((response) => {
        return response.data.filter((event) =>
            event.ownerId === userId || event.participants.some((participant) => participant.id === userId)
        );
    });
});

export const addNewEvent = createAsyncThunk("events/addEvent", (newEvent) =>
    axios.post(apiUrlEvents, newEvent).then((response) => response.data)
);

export const changeParticipantStatus = createAsyncThunk(
    "events/changeEventStatus",
    ({eventId, participantId, status}) => {
        return axios.get(`${apiUrlEvents}/${eventId}`).then((response) => {
            const updatedEvent = {
                ...response.data,
                participants: response.data.participants.map((participant) => {
                    if (participant.id === participantId) {
                        return {
                            ...participant,
                            status: status,
                        };
                    }
                    return participant;
                }),
            };
            return axios
                .put(`${apiUrlEvents}/${eventId}`, updatedEvent)
                .then(() => ({eventId, participantId, status}));
        });
    }
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
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.events = action.payload;
            })
            .addCase(addNewEvent.fulfilled, (state, action) => {
                state.events = [action.payload, ...state.events];
            })
            .addCase(changeParticipantStatus.fulfilled, (state, action) => {
                const {eventId, userId, status} = action.payload;
                const updatedEvents = state.events.map((event) =>
                    event.id === eventId
                        ? {
                            ...event,
                            participants: event.participants.map((participant) =>
                                participant.id === userId
                                    ? {...participant, status: status}
                                    : participant
                            ),
                        }
                        : event
                );
                state.events = updatedEvents;
            })
    },
});

export const {createNewEvent} = eventSlice.actions;

export default eventSlice.reducer;