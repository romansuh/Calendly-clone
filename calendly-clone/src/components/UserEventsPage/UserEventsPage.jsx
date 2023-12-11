import React, {useEffect, useMemo, useState} from 'react';
import {Button, Typography, Container, List, Box, Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateEventForm from "../CreateEventForm/CreateEventForm";
import {fetchUsers} from "../../store/reducers/users/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents} from "../../store/reducers/events/eventSlice";
import EventsListItem from "./EventsListItem/EventsListItem";

const UserEventsPage = () => {
    const [tabType, setTabType] = useState('own');

    const handleChange = (event, newType) => {
        setTabType(newType);
    };

    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const handleCreateEventForm = () => setIsModalFormOpen(!isModalFormOpen);
    const handleOpen = () => setIsModalFormOpen(true);
    const handleClose = () => setIsModalFormOpen(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.user);
    const userEvents = useSelector(state => state.events.events);

    const ownedEvents = useMemo(() => {
        return userEvents.filter(event => {
            return event.ownerId === currentUser.id
        });
    }, [userEvents, currentUser]);

    const participatedEvents = useMemo(() => {
        return userEvents.filter(event => {
            return event.participants.some(
                participant => participant.id === currentUser.id
            );
        });
    }, [userEvents, currentUser]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchEvents(currentUser.id));
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

                <TabContext value={tabType}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Owning" value="own"/>
                            <Tab label="Participating" value="part"/>
                            <Tab label="Pending a reply" value="pending"/>
                        </TabList>
                    </Box>
                    <TabPanel value="own">
                        The events you have created will display in this tab.
                        <List>
                            {ownedEvents.map((event) => {
                                return <EventsListItem event={event}/>
                            })}
                        </List>

                    </TabPanel>
                    <TabPanel value="part">
                        The events in which you take part will display in this tab.
                        <List>
                            {participatedEvents.map((event) => {
                                return <EventsListItem event={event}/>
                            })}
                        </List>
                    </TabPanel>
                    <TabPanel value="pending">
                        The events pending your reply for participation will display in this tab.
                    </TabPanel>
                </TabContext>


            </Container>
        </>
    );
};

export default UserEventsPage;
