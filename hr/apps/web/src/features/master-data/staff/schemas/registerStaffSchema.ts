import * as Yup from 'yup';

export const registerStaffSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'), 
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'), 
    password: Yup.string().required('Password is required'), 
    role: Yup.string().required('Role is required'), 
    shift: Yup.number().required('Shift is required'),
    position: Yup.number().required('Position is required')
})