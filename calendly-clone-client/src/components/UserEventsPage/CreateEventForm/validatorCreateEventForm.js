import * as Yup from 'yup';

export const createEventValidationSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(3, 'At least 3 characters')
        .max(20, 'Not more than 20 characters')
        .required('Event name is required'),
    description: Yup
        .string()
        .min(10, 'At least 10 characters')
        .max(120, 'Not more than 120 characters')
        .required('Description is required'),
    selectedUsers: Yup
        .array()
        .required("This field is required"),
    dateTime: Yup
        .date()
        .required("This field is required"),
});