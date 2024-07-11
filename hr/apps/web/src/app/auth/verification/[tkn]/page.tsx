'use client';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import { verificationSchema } from '../../../../features/auth/verification/schemas/verificationSchema';
import { CiLock } from 'react-icons/ci';
import { usePatchVerification } from '@/features/auth/verification/hooks/usePatchVerification'
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
 
export default function AuthVerificationPage({params}: any){

    const token = params.tkn
    const router = useRouter()
    const { mutationVerification } = usePatchVerification()

    useLayoutEffect(() => {
        const token = localStorage.getItem('tkn')

        if(token) router.push('/')
    }, [])
    
    return(
        <main className='flex justify-center px-10'>
            <section id='form-login' className='py-10'>
                <h1 className='font-bold text-2xl'>
                    Setup New Password & Verification Account
                </h1>
                <Formik
                    validationSchema={verificationSchema}
                    initialValues={{
                        password: '', 
                        confirmPassword: ''                    
                    }}
                    onSubmit= {(values) => {
                        mutationVerification({password: values.password, token})
                    }}
                >
                    <Form>
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='password' name='password' className='grow' placeholder='Password' />
                            <CiLock />
                        </label>
                        <ErrorMessage name='password' component={'div'} className='text-red-500' />
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='password' name='confirmPassword' className='grow' placeholder='Confirm Password' />
                            <CiLock />
                        </label>
                        <ErrorMessage name='confirmPassword' component={'div'} className='text-red-500' />
                        <button type='submit' className='btn bg-red-500 text-white w-full my-2'>
                            Submit Form
                        </button>
                    </Form>
                </Formik>
            </section>
        </main>
    )
}