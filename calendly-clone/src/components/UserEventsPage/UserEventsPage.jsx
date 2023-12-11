import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    Typography,
    Container,
    List,
    Box,
    Tab,
    Paper,
    Grid
} from '@mui/material';
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
    const pendingEvents = false;
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

                    <Paper style={{maxHeight: 460, overflow: 'auto'}}>
                        <Grid container spacing={2}>
                            <TabPanel value="own">
                                {!ownedEvents ?
                                    <Typography variant="h6" gutterBottom>
                                        You have not created any events, you may like to try!
                                    </Typography> :
                                    <List style={{maxHeight: "100", overflow: "auto"}}>
                                        {ownedEvents.map((event) => {
                                            return <EventsListItem event={event}/>
                                        })}
                                    </List>
                                }
                            </TabPanel>

                            <TabPanel value="part">
                                {!participatedEvents ?
                                    <Typography variant="h6" gutterBottom>
                                        You are not taking part in any events, you may like to check pending tab!
                                    </Typography> :
                                    <List style={{maxHeight: "100", overflow: "auto"}}>
                                        {participatedEvents.map((event) => {
                                            return <EventsListItem event={event}/>
                                        })}
                                    </List>
                                }
                            </TabPanel>

                            <TabPanel value="pending">
                                {!pendingEvents ?
                                    <Typography variant="h6" gutterBottom>
                                        You replied to all invitations by now!
                                    </Typography> :
                                    <List style={{maxHeight: "100", overflow: "auto"}}>
                                        {participatedEvents.map((event) => {
                                            return <EventsListItem event={event}/>
                                        })}
                                    </List>
                                }
                            </TabPanel>
                        </Grid>
                    </Paper>
                </TabContext>
            </Container>
        </>
    );
};

export default UserEventsPage;
