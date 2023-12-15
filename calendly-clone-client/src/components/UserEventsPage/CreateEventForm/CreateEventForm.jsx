import React from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {useFormik} from 'formik';
import {createEventValidationSchema} from "./validatorCreateEventForm";
import {submitCreateEventFormData} from "./submitCreateEventFormData";
import {useDispatch, useSelector} from 'react-redux';
import {addNewEvent} from '../../../store/reducers/events/eventSlice';
import CloseIcon from '@mui/icons-material/Close';

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

const CreateEventForm = ({handleOpen, handleClose, users}) => {
    const currentUser = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            selectedUsers: [],
            dateTime: '',
        },
        validationSchema: createEventValidationSchema,
        onSubmit: (values) => {
            console.log(values.selectedUsers);
            submitCreateEventFormData(
                values,
                currentUser.id,
                (newEvent) => {
                    dispatch(addNewEvent(newEvent))
                });
            handleClose();
        }
    })

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
            >
                <Box sx={boxStyle}>
                    <Typography variant="h4" gutterBottom>
                        Create your event
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{marginBottom: 10}}
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
                            style={{marginBottom: 10}}
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
                        <FormControl style={{minWidth: 200, marginBottom: 10}}>
                            <InputLabel id="selectedUsers-label">Select User</InputLabel>
                            <Select
                                fullWidth
                                multiple
                                labelId="selectedUsers-label"
                                id="selectedUsers"
                                name="selectedUsers"
                                label="Select Users"
                                value={formik.values.selectedUsers}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.selectedUsers &&
                                    Boolean(formik.errors.selectedUsers)
                                }
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user}>
                                        {user.username}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            style={{marginBottom: 10}}
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
                        <Button
                            style={{marginBottom: 10}}
                            type="submit"
                            variant="contained"
                            color="primary">
                            CREATE EVENT
                        </Button>
                    </form>

                    <Button onClick={() => handleClose()} variant="outlined" color="primary">
                        CLOSE<CloseIcon/>
                    </Button>
                </Box>
            </Modal>
        </div>
    )
};

export default CreateEventForm;