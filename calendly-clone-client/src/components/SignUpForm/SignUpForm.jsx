import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {Button, TextField, Typography} from '@mui/material';
import {addUser} from '../../store/reducers/users/userSlice';
import {submitSignUpFormData} from './submitSignUpFormData';
import {signUpValidationSchema} from "./validatorSignUpForm";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const initialEmail = location.state?.newUserEmail;


    const formik = useFormik({
        initialValues: {
            username: '',
            email: initialEmail,
            password: '',
            confirmPassword: '',
        },
        validationSchema: signUpValidationSchema,
        onSubmit: (values) => {
            submitSignUpFormData(
                values,
                (newUser) => {
                    dispatch(addUser(newUser));
                },
                (path) => {
                    navigate(path);
                });
        },
    });

    return (
        <Paper
            sx={{
                maxWidth: 350,
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '20px'
            }}
            elevation={3}
            square={false}
        >
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
                    helperText={formik.touched.username && formik.errors.username}
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
        </Paper>
    );
};

export default SignUpForm;
