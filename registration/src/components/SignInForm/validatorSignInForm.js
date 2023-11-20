import * as Yup from "yup";

export const signInValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Invalid email.')
        .required('Email is required'),
    password: Yup
        .string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Invalid password: Minimum eight characters, at least one letter and one number.'
        )
        .required('Password is required'),
});