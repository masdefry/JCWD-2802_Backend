'use client';
import { GoPerson } from 'react-icons/go';
import { CiLock } from 'react-icons/ci';
import { authSchema } from '@/features/authSchema';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AuthPage(){

    const {mutate: mutationAuth} = useMutation({
        mutationFn: async({username, password}: {username: string, password: string}) => {
            return await axios.post('http://localhost:8000/auth', 
                {
                    username, 
                    password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        },
        onSuccess: (response) => {
            localStorage.setItem('tkn', response.data.data.token)
            toast.success(response.data.message)
        }, 
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return(
        <main className='flex justify-center'>
            <section id='form-login'>
                <h1 className='font-bold text-2xl'>
                    Sign in
                </h1>
                <Formik
                    validationSchema={authSchema}
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit= {(values) => {
                        mutationAuth({username: values.username, password: values.password})
                    }}
                >
                    <Form>
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='text' name='username' className='grow' placeholder='Username or email' />
                            <GoPerson />
                        </label>
                        <ErrorMessage name='username' component={'div'} className='text-red-500' />
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='password' name='password' className='grow' placeholder='Password' />
                            <CiLock />
                        </label>
                        <ErrorMessage name='password' component={'div'} className='text-red-500' />
                        <button type='submit' className='btn bg-red-500 text-white w-full my-2'>
                            Sign in
                        </button>
                    </Form>
                </Formik>
            </section>
        </main>
    )
}