import React, {useEffect} from "react";
import {ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../../store/reducers/users/userSlice";

const EventsListItem = ({event}) => {
    // const currentUser = useSelector(state => state.users.user);
    // const owner = useSelector(state => state.users.currentEventOwner)
    const dispatch = useDispatch();
    const ownerId = event.ownerId;

    useEffect(() => {
        dispatch(getUserById(ownerId));
    }, [dispatch, ownerId]);

    return (
        <>
            <ListItem key={event.id}>
                <ListItemText
                    primary={event.name}
                    secondary={
                        <>
                            <span>Description: {event.description}</span>
                            <br/>
                            <span>
                                Date: {(new Date(event.dateTime)).toLocaleDateString()}
                                <br/>
                                Time: {(new Date(event.dateTime)).toLocaleTimeString().slice(0,5)}
                            </span>
                            <br/>
                            <span>Participants: {
                                event.participants.map(participant => {
                                    return (<span key={participant.id}>{participant.name}   </span>)
                                })
                            }
                            </span>
                        </>
                    }
                />
            </ListItem>
        </>
    );
};

export default EventsListItem;