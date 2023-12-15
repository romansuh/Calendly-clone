import * as Yup from 'yup';
import {FORM_VALIDATION_REGEXP} from "../../common/constants/constants";

export const signUpValidationSchema = Yup.object().shape({
    username: Yup
        .string()
        .required('Username is required'),
    email: Yup
        .string()
        .email('Invalid email.')
        .required('Email is required'),
    password: Yup
        .string()
        .matches(
            FORM_VALIDATION_REGEXP.PASSWORD,
            'Invalid password: Minimum eight characters, at least one letter and one number.'
        )
        .required('Password is required'),
    confirmPassword: Yup
        .string()
        .oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
        )
        .required('Confirmation is required'),
});