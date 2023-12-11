import React from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField
} from '@mui/material';
import {useFormik} from 'formik';
import {inviteUserValidationSchema} from "./validatorInviteUserForm";

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

const InviteUserForm = ({handleOpen, handleClose}) => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: inviteUserValidationSchema,
        onSubmit: (values) => {
            formik.resetForm();
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
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            margin="normal"
                        />
                        <Button
                            style={{marginBottom: 10}}
                            type="submit"
                            variant="contained"
                            color="primary">
                            <Typography variant="button">SEND INVITE</Typography>
                        </Button>
                    </form>

                    <Button onClick={() => handleClose()} variant="outlined" color="primary">
                        <Typography variant="button">CLOSE</Typography>
                    </Button>
                </Box>
            </Modal>
        </div>
    )
};

export default InviteUserForm;