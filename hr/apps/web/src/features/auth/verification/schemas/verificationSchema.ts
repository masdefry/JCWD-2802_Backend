import * as Yup from 'yup';

export const verificationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'), 
    confirmPassword: Yup.string().required('Confirmation password is required')
    .oneOf([Yup.ref('password'), ''], 'Password doesnt match')
})