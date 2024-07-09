'use client';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import { GoPerson, GoPersonFill } from 'react-icons/go';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';
import { registerStaffSchema } from '@/features/master-data/staff/schemas/registerStaffSchema';

import {useGetShiftsAndPositions} from '@/features/master-data/staff/hooks/useGetShiftsAndPositions'
import {usePostStaff} from '@/features/master-data/staff/hooks/usePostStaff'

export default function MasterDataStaffPage(){

    const { dataShifts, 
        isErrorShifts,
        dataPositions, 
        isErrorPositions } = useGetShiftsAndPositions()

    const { mutationCreateStaff } = usePostStaff()

    return(
        <main className='flex justify-center px-10'>
            <section id='form-create-staff' className='w-[600px] py-10'>
                <h1 className='font-bold text-2xl'>
                    Master Data
                </h1>
                <p>
                    This form to create new staff account
                </p>
                <Formik
                    initialValues={{
                        firstName: '', 
                        lastName: '',
                        email: '',
                        password: '',
                        role: '',
                        position: null, 
                        shift: null
                    }}
                    validationSchema={registerStaffSchema}
                    onSubmit= {(values) => {
                        mutationCreateStaff({
                            firstName: values.firstName, 
                            lastName: values.lastName, 
                            email: values.email, 
                            password: values.password, 
                            role: values.role, 
                            position: values.position, 
                            shift: values.shift
                        })
                    }}
                >
                    <Form>
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='text' name='firstName' className='grow' placeholder='Firts name' />
                            <GoPerson />
                        </label>
                        <ErrorMessage name='firstName' component={'div'} className='text-red-500' />
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='text' name='lastName' className='grow' placeholder='Last name' />
                            <GoPersonFill />
                        </label>
                        <ErrorMessage name='lastName' component={'div'} className='text-red-500' />
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='text' name='email' className='grow' placeholder='Email' />
                            <MdOutlineAlternateEmail />
                        </label>
                        <ErrorMessage name='email' component={'div'} className='text-red-500' />
                        <label className='input input-bordered flex items-center gap-2 my-2'>
                            <Field type='password' name='password' className='grow' placeholder='Password' />
                            <CiLock />
                        </label>
                        <ErrorMessage name='password' component={'div'} className='text-red-500' />
                        <Field as='Select' name='role' className='select select-bordered w-full'>
                            <option disabled selected>Please, Select Role First!</option>
                            <option value='HR'>
                                HR
                            </option>
                            <option value='STAFF'>
                                Staff
                            </option>
                        </Field>
                        <ErrorMessage name='role' component={'div'} className='text-red-500' />
                        <Field as='Select' name='shift' className='select select-bordered w-full my-2'>
                            <option disabled selected>Please, Select Shift First!</option>
                            {
                                dataShifts?.map((item: any, index: number) => {
                                    return(
                                        <option value={item.id} key={index}>
                                            {item?.startTime} - {item?.endTime}
                                        </option>
                                    )
                                })
                            }
                        </Field>
                        <ErrorMessage name='shift' component={'div'} className='text-red-500' />
                        <Field as='Select' name='position' className='select select-bordered w-full'>
                            <option disabled selected>Please, Select Position First!</option>
                            {
                                dataPositions?.map((item: any, index: number) => {
                                    return(
                                        <option value={item.id} key={index}>
                                            {item?.name}
                                        </option>
                                    )
                                })
                            }
                        </Field>
                        <ErrorMessage name='position' component={'div'} className='text-red-500' />
                        {/* Disabled Button for Paralel Fetching */}
                        <button disabled={isErrorShifts === true || isErrorPositions === true} type='submit' className='btn bg-red-500 text-white w-full my-2'>
                            Submit Form
                        </button>
                    </Form>
                </Formik>
            </section>
        </main>
    )
}