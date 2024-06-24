'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
    const [showTime, setShowTime] = useState(false)

    return (
      <main className='p-10'>
        <section>
          <h1 className='text-3xl font-bold text-yellow-600'>
            e-tick
          </h1>
          <div className='flex gap-3 py-3'>
            <h5>
              <Link href='/'>
                All Movies
              </Link>
            </h5>
            <h5 className='border-b-2'>
                <Link href='/movies/on-showing'>
                    On Showing Movies
                </Link>
            </h5>
          </div>
        </section>
        <section>
            <input type='date' placeholder='Type here' className='input w-[50%] border border-gray-300' />
            <button className='btn bg-yellow-600 text-white hover:text-black'>Search</button>
        </section>
        <section className='py-5'>
          <div className='grid grid-cols-12 gap-5'>
            <div className='card bg-base-100 shadow-xl col-span-3'>
              <figure><img src='https://statik.tempo.co/data/2023/12/13/id_1262844/1262844_720.jpg' alt='Movie_Poster' /></figure>
              <div className='card-body'>
                <h2 className='card-title'>Agak Laen</h2>
                <p>Description</p>
                {
                    showTime?
                        <>
                            <h2 className='font-bold mt-3'>
                                Select Time 
                            </h2>
                            <div className='flex gap-3'>
                                <div className='bg-gray-300 text-black p-1 rounded-md'>
                                09:00
                                </div>
                                <div className='bg-gray-300 text-black p-1 rounded-md'>
                                10:00
                                </div>
                            </div>
                        </>
                    :
                        null
                }
                <div className='card-actions justify-end'>
                  <button onClick={() => setShowTime(true)} className='btn bg-yellow-600 text-white hover:text-black'>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
  