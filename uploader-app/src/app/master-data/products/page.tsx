'use client';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { createProductSchema } from '@/features/master-data/products/createProductSchema';

export default function Page() {
    return (
        <main className='flex justify-center px-10'>
            <section id='form-login' className='py-10'>
                <h1 className='font-bold text-2xl'>
                    Create Product
                </h1>
                <Formik
                    validationSchema={createProductSchema}
                    initialValues={{
                        name: '',
                        price: '',
                        images: []
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        // Handle form submission
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <label className='input input-bordered flex items-center gap-2 my-2'>
                                <Field type='text' name='name' className='grow' placeholder='Product name' />
                            </label>
                            <ErrorMessage name='name' component='div' className='text-red-500' />

                            <label className='input input-bordered flex items-center gap-2 my-2'>
                                <Field type='number' name='price' className='grow' placeholder='Product price' />
                            </label>
                            <ErrorMessage name='price' component='div' className='text-red-500' />

                            <label className='flex items-center gap-2 my-2'>
                                <input
                                    type='file'
                                    name='images'
                                    onChange={(event) => {
                                        if(event!.target!.files!.length){
                                            setFieldValue('images', event!.target!.files);
                                        }
                                    }}
                                    className='file-input file-input-bordered w-full'
                                    multiple
                                />
                            </label>
                            <ErrorMessage name='images' component='div' className='text-red-500' />

                            <button type='submit' className='btn bg-red-500 text-white w-full my-2'>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
}
