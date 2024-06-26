import * as Yup from 'yup';

export const userSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    role: Yup.string().required(),
    password: Yup.string().min(4).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords mismatch'),
})