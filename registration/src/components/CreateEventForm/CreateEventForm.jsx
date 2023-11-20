import React, {useState} from 'react';
import {Box, Button, Typography, Modal, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {createEventValidationSchema} from "./validatorCreateEventForm";
import {submitCreateEventFormData} from "./submitCreateEventFormData";
import {useDispatch} from 'react-redux';
import {createNewEvent} from '../../store/reducers/events/eventSlice';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CreateEventForm = () => {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            // TODO: selector of users and date picker
        },
        validationSchema: createEventValidationSchema,
        onSubmit: (values) => {
            submitCreateEventFormData(
                values,
                (newEvent) => {
                    dispatch(createNewEvent(newEvent))
                });
            // console.table(values);
            handleClose();
        }
    })

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={boxStyle}>
                    <Typography variant="h4" gutterBottom>
                        Create your event
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            id="description"
                            name="description"
                            label="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            CREATE EVENT
                        </Button>
                    </form>

                    <Button onClick={() => handleClose()} variant="outlined" color="primary">
                        CLOSE
                    </Button>
                </Box>
            </Modal>
        </div>
    )
};

export default CreateEventForm;