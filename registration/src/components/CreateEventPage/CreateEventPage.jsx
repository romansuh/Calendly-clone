import React, {useState} from 'react';
import {Button, Typography, Container} from '@mui/material';
import CreateEventForm from "../CreateEventForm/CreateEventForm";

const CreateEventPage = () => {
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const handleCreateEvent = () => setIsModalFormOpen(true);

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
