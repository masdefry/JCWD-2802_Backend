'use client';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { createProductSchema } from '@/features/master-data/products/schemas/createProductSchema';
import { useCreateProductHooks } from '@/features/master-data/products/hooks/useCreateProductHooks';
import { useGetProductsHooks } from '@/features/master-data/products/hooks/useGetProductsHooks';
import Image from 'next/Image'

export default function Page() {
    const { mutationCreateProduct } = useCreateProductHooks()
    const { dataProducts } = useGetProductsHooks()
    console.log(dataProducts)

    if(!dataProducts) return <h1>Loading...</h1>
    return (
        <main className='flex flex-col items-center px-10'>
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
                        const fd = new FormData()
                        fd.append('product', JSON.stringify({
                            name: values.name, 
                            price: values.price
                        }))
                        for(let item of values.images){
                            fd.append('products', item)
                        }
                        
                        mutationCreateProduct({fd})
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
            <section>
                {dataProducts?.map((item, index) => {
                    return(
                        <div>
                            <h1>
                                {item?.name}
                            </h1>
                            {
                                item.product_images.length > 0?
                                    <Image 
                                        src={`http://localhost:5000/${item.product_images[0].url}`}
                                        width={100}
                                        height={100}
                                        alt={'Image Product'}
                                    />
                                :  
                                    null
                            }
                        </div>
                    )
                })}
            </section>
        </main>
    );
}
