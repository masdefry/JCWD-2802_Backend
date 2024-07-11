'use client';
import {Formik, Form, ErrorMessage, Field} from 'formik';

export default function AuthVerificationPage(){
    return(
        <main className='flex justify-center px-10'>
            <section id='form-login' className='py-10'>
                <h1 className='font-bold text-2xl'>
                    Setup New Password & Verification Account
                </h1>
                <Formik
                    // validationSchema={}
                    initialValues={{
                        password: '', 
                        confirmPassword: ''                    
                    }}
                    onSubmit= {(values) => {
                        // mutationAuth({username: values.username, password: values.password})
                    }}
                >
                    <Form>
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='password' name='password' className='grow' placeholder='Password' />
                            {/* <GoPerson /> */}
                        </label>
                        <ErrorMessage name='username' component={'div'} className='text-red-500' />
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='password' name='confirmationPassword' className='grow' placeholder='Confirmation Password' />
                            {/* <CiLock /> */}
                        </label>
                        <ErrorMessage name='confirmationPassword' component={'div'} className='text-red-500' />
                        <button type='submit' className='btn bg-red-500 text-white w-full my-2'>
                            Submit Form
                        </button>
                    </Form>
                </Formik>
            </section>
        </main>
    )
}