import React, {useEffect, useState} from 'react';
import {Button, Typography, Container} from '@mui/material';
import CreateEventForm from "../CreateEventForm/CreateEventForm";
import {fetchUsers} from "../../store/reducers/users/userSlice";
import {useDispatch} from "react-redux";

const CreateEventPage = () => {
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const handleCreateEvent = () => setIsModalFormOpen(true);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <>
            <Container>
                <Typography variant="h4" gutterBottom>
                    You can create events easily!
                </Typography>

                {isModalFormOpen ? <CreateEventForm/> : ''}
                <Button onClick={() => handleCreateEvent()} variant="contained" color="primary">
                    CREATE NEW EVENT
                </Button>


            </Container>
        </>
    );
};

export default CreateEventPage;
