import React, {useEffect} from "react";
import {ListItem, ListItemText, Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import {getUserById} from "../../../store/reducers/users/userSlice";

const EventsListItem = ({event}) => {
    const dispatch = useDispatch();
    const ownerId = event.ownerId;

    useEffect(() => {
        dispatch(getUserById(ownerId));
    }, [dispatch, ownerId]);

    return (
        <Grid item xs={10}>
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
        </Grid>
    );
};

export default EventsListItem;