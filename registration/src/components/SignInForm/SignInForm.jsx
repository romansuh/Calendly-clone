import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Typography, Container} from '@mui/material';
import {signInUser} from '../../store/reducers/users/userSlice';
import {submitSignInFormData} from './sumbitSignInFormData';
import {signInValidationSchema} from "./validatorSignInForm";

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: (values) => {
            submitSignInFormData(
                values,
                (storedUser) => {
                dispatch(signInUser(storedUser));
                },
                (path) => {
                    navigate(path);
                });
        },
    });

    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    Sign In
                </Typography>
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
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    SIGN IN
                </Button>
            </form>

        </Container>
    );
};

export default SignInForm;
