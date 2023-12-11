import * as Yup from 'yup';

export const inviteUserValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Invalid email.')
        .required('Email is required'),
});