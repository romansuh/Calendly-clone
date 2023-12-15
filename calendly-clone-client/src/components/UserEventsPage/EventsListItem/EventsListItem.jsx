import React, {useEffect} from "react";
import {ListItem, ListItemText, Grid, IconButton, Tooltip} from "@mui/material";
import {useDispatch} from "react-redux";
import {getUserById} from "../../../store/reducers/users/userSlice";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import {PARTICIPANT_STATUS} from "../../../common/constants/constants";
import './eventItem.css';

const EventsListItem = ({event, isPendingFlag, handleStatusChange}) => {
    const dispatch = useDispatch();
    const ownerId = event.ownerId;

    useEffect(() => {
        dispatch(getUserById(ownerId));
    }, [dispatch, ownerId]);

    return (
        <Grid item xs={12}>
            <ListItem key={event.id} divider={true}>
                <ListItemText
                    primary={event.name}
                    secondary={
                        <>
                            <p>Description: {event.description}</p>
                            <span>
                                Date: {(new Date(event.dateTime)).toLocaleDateString()}
                                <br/>
                                Time: {(new Date(event.dateTime)).toLocaleTimeString().slice(0, 5)}
                            </span>
                            <br/>
                            <span>Participants: {
                                event.participants.map(participant => {
                                    return (
                                        < >
                                            <div
                                                className={`event-participant ${participant.status}`}
                                                key={participant.id}
                                            >
                                                {participant.name}
                                            </div>
                                        </>
                                    )
                                })
                            }
                            </span>

                            {isPendingFlag &&
                            <Tooltip title="Accept event">
                                <IconButton
                                    edge="end"
                                    aria-label="accept"
                                    onClick={() => handleStatusChange(event.id, PARTICIPANT_STATUS.ACCEPTED)}
                                >
                                    <CheckIcon/>
                                </IconButton>
                            </Tooltip>
                            }

                            {isPendingFlag &&
                            <Tooltip title="Decline event">
                                <IconButton
                                    edge="end"
                                    aria-label="cancel"
                                    onClick={() => handleStatusChange(event.id, PARTICIPANT_STATUS.DECLINED)}
                                >
                                    <CancelIcon/>
                                </IconButton>
                            </Tooltip>
                            }
                        </>
                    }
                />
            </ListItem>
        </Grid>
    );
};

export default EventsListItem;