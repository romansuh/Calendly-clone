import React, {useEffect, useState} from 'react';
import {Button, Typography, Container, List} from '@mui/material';
import CreateEventForm from "../CreateEventForm/CreateEventForm";
import {fetchUsers} from "../../store/reducers/users/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents} from "../../store/reducers/events/eventSlice";
import EventsListItem from "./EventsListItem/EventsListItem";

const UserEventsPage = () => {
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const handleCreateEventForm = () => setIsModalFormOpen(!isModalFormOpen);
    const handleOpen = () => setIsModalFormOpen(true);
    const handleClose = () => setIsModalFormOpen(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.user);
    const userEvents = useSelector(state => state.events.events);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchEvents(currentUser.id))
    }, [dispatch, currentUser.id])

    return (
        <>
            <Container>
                <h2>Hello, {currentUser.username}</h2>
                <Typography variant="h4" gutterBottom>
                    You can create events easily!
                </Typography>

                {isModalFormOpen && <CreateEventForm handleOpen={handleOpen} handleClose={handleClose}/>}
                <Button onClick={() => handleCreateEventForm()} variant="contained" color="primary">
                    CREATE NEW EVENT
                </Button>

                <List>
                    {userEvents.map((event) => {
                        return <EventsListItem event={event}/>
                    })}
                </List>


            </Container>
        </>
    );
};

export default UserEventsPage;
