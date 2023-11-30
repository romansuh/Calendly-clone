import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {Button, TextField, Typography} from '@mui/material';
import {fetchUsers, logInUser} from '../../store/reducers/users/userSlice';
import {submitSignInFormData} from './sumbitSignInFormData';
import {signInValidationSchema} from "./validatorSignInForm";

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: (values) => {
            const storedUser = users.find(
                user => user.email === values.email && user.password === values.password
            );

            submitSignInFormData(
                storedUser,
                (storedUser) => {
                dispatch(logInUser({...storedUser}));
                },
                (path, params) => {
                    navigate(path, params);
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

        </Paper>
    );
};

export default SignInForm;
