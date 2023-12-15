import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    Typography,
    Container,
    List,
    Box,
    Tab,
    Paper,
    Grid,
    AppBar,
    Toolbar,
    Tooltip,
    IconButton
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateEventForm from "./CreateEventForm/CreateEventForm";
import {fetchUsers, logOutUser} from "../../store/reducers/users/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchEvents} from "../../store/reducers/events/eventSlice";
import EventsListItem from "./EventsListItem/EventsListItem";
import InviteUserForm from "./InviteUserForm/InviteUserForm";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {LOCAL_STORAGE_KEYS, NAVIGATION_PATHS, PARTICIPANT_STATUS} from "../../common/constants/constants";
import {useNavigate} from "react-router-dom";

const UserEventsPage = () => {
    const [tabType, setTabType] = useState('own');
    const [isFirstUser, setIsFirstUser] = useState(false);
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const currentUser = useSelector(state => state.users.user);
    const userEvents = useSelector(state => state.events.events);

    const [ownedEvents, participatedEvents, pendingEvents] = useMemo(() => {
        const owned = userEvents.filter(event => {
            return event.ownerId === currentUser.id
        });

        const participated = userEvents.filter(event => {
            const filteredEvents = event.participants.filter(participant =>
                participant.status === PARTICIPANT_STATUS.ACCEPTED && participant.id === currentUser.id
            );
            return filteredEvents.length > 0
        });

        const pending = userEvents.filter(event => {
            const filteredEvents = event.participants.filter(participant =>
                participant.status === PARTICIPANT_STATUS.PENDING && participant.id === currentUser.id
            );
            return filteredEvents.length > 0
        })

        return [owned, participated, pending];
    }, [userEvents, currentUser]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        dispatch(fetchEvents(currentUser.id));
    }, [currentUser.id]);

    useEffect(() => {
        if (users.length === 1)
            setIsFirstUser(true)
    }, [users]);


    const handleCreateEventForm = () => setIsModalFormOpen(!isModalFormOpen);
    const handleOpenCreateEvent = () => setIsModalFormOpen(true);
    const handleCloseCreateEvent = () => setIsModalFormOpen(false);

    const handleInviteForm = () => setIsInviteFormOpen(!isInviteFormOpen);
    const handleOpenInviteUser = () => setIsModalFormOpen(true);
    const handleCloseInviteUser = () => setIsModalFormOpen(false);

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
        dispatch(logOutUser());
        navigate(NAVIGATION_PATHS.SIGN_IN);
    };

    const handleChange = (event, newType) => {
        setTabType(newType);
    };

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                            Hello, {currentUser.username}! You can create events easily!
                        </Typography>

                        <Button
                            disabled={isFirstUser}
                            onClick={() => handleCreateEventForm()}
                            color="inherit"
                        >
                            <Typography variant="button">CREATE NEW EVENT</Typography>
                        </Button>

                        <Tooltip title="Log out">
                            <IconButton
                                variant="text"
                                type="submit"
                                onClick={() => handleLogout()}
                            >
                                <LogoutOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container>
                {isModalFormOpen && <CreateEventForm
                    handleOpen={handleOpenCreateEvent}
                    handleClose={handleCloseCreateEvent}
                    users={users}/>}

                {isInviteFormOpen && <InviteUserForm
                    handleOpen={handleOpenInviteUser}
                    handleClose={handleCloseInviteUser}/>}

                {isFirstUser &&
                <Typography variant="h4" gutterBottom>
                    Congratulations! You are the first user!
                    Invite other people to create events with them.
                </Typography> &&
                <Button
                    style={{marginLeft: 10}}
                    onClick={() => handleInviteForm()}
                    variant="contained"
                    color="primary"
                >
                    <Typography variant="button">INVITE NEW USER</Typography>
                </Button>
                }

                <TabContext value={tabType}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange}>
                            <Tab label="Owning" value="own"/>
                            <Tab label="Participating" value="part"/>
                            <Tab label="Pending a reply" value="pending"/>
                        </TabList>
                    </Box>

                    <Paper style={{maxHeight: 460, overflow: 'auto'}}>
                        <Grid container spacing={2}>
                            <TabPanel value="own">
                                {ownedEvents.length === 0 ?
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
                                {participatedEvents.length === 0 ?
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
                                {pendingEvents.length === 0 ?
                                    <Typography variant="h6" gutterBottom>
                                        You replied to all invitations by now!
                                    </Typography> :
                                    <List style={{maxHeight: "100", overflow: "auto"}}>
                                        {pendingEvents.map((event) => {
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
