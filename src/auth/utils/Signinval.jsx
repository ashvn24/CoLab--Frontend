import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string().email().ensure().required('Please enter your email'),
    password: Yup.string().min(4).nonNullable().required('Please enter your password')
})