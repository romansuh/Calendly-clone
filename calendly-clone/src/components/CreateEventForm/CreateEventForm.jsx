import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import {useFormik} from 'formik';
import {createEventValidationSchema} from "./validatorCreateEventForm";
import {submitCreateEventFormData} from "./submitCreateEventFormData";
import {useDispatch, useSelector} from 'react-redux';
import {createNewEvent} from '../../store/reducers/events/eventSlice';
import {fetchUsers} from "../../store/reducers/users/userSlice";

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
    const users = useSelector(state => state.users.users);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            selectedUser: "",
            dateTime: new Date(),
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
                        <FormControl>
                            <Select
                                labelId="selectedUser-label"
                                id="selectedUser"
                                name="selectedUser"
                                label="Select User"
                                value={formik.values.selectedUser}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.selectedUser &&
                                    Boolean(formik.errors.selectedUser)
                                }
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.name}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            id="dateTime"
                            name="dateTime"
                            label="Date and Time"
                            type="datetime-local"
                            value={formik.values.dateTime}
                            onChange={formik.handleChange}
                            error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                            helperText={formik.touched.dateTime && formik.errors.dateTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
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