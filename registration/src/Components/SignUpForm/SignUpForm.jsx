import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Typography, Container} from '@mui/material';
import {signUpUser} from '../../store/reducers/userSlice';
import {submitSignUpFormData} from '../../submitting/submitSignInFormData';
import {signUpValidationSchema} from "../../validation/validateLoginData";

const SignUpForm = ({initialEmail}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: initialEmail,
            password: '',
            confirmPassword: '',
        },
        validationSchema: signUpValidationSchema,
        onSubmit: (values) => {
            submitSignUpFormData(values, dispatch, signUpUser, navigate);
        },
    });

    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.email && formik.errors.username}
                    margin="normal"
                />
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
                <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    SIGN UP
                </Button>
            </form>

        </Container>
    );
};

export default SignUpForm;
