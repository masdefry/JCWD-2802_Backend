import Image from 'next/image'
import styles from './page.module.css'
import { IoCalendarOutline, IoReceiptSharp, IoPerson } from 'react-icons/io5';
import { HiOutlineClock, HiMiniClock } from 'react-icons/hi2';
import { IoIosListBox } from 'react-icons/io';
import { BsCalendar2MinusFill } from 'react-icons/bs';

export default function Home() {
  return (
    <main className='flex justify-center px-10'>
      <section className='w-[600px] py-10'>
        <h1 className='text-2xl font-bold'>
          Good, Morning User01.
        </h1>
        <p>
          Dont miss your attendance today!
        </p>
        <section className='mt-10 bg-gray-100 px-5 py-5 rounded rounded-lg'>
          <div className='flex items-center gap-5'>
            <IoCalendarOutline className='text-xl font-bold' />
            <h1 className='text-xl font-bold'>
              09 July 2024 (09:00 - 18:00)
            </h1>
          </div>
          <div className='mt-3 flex items-center gap-3'>
            <button className='w-full flex items-center gap-3 bg-white rounded-md p-3'>
              <HiMiniClock />
              <h1>
                Clock-In
              </h1>
            </button>
            <button className='w-full flex items-center gap-3 bg-white rounded-md p-3'>
              <HiOutlineClock />
              <h1>
                Clock-Out
              </h1>
            </button>
          </div>
        </section>
        <section className='p-5 grid grid-cols-4 gap-3'>
          <div className='flex flex-col justify-center items-center p-3'>
            <IoIosListBox className='text-green-500' />
            Attendance
          </div>
          <div className='flex flex-col justify-center items-center p-3'>
            <IoReceiptSharp className='text-yellow-500' />
            Deduction
          </div>
          <div className='flex flex-col justify-center items-center'>
            <IoPerson className='text-blue-500' />
            Profile
          </div>
          <div className='flex flex-col justify-center items-center'>
            <BsCalendar2MinusFill className='text-purple-500' />
            Calendar
          </div>
        </section>
      </section>
    </main>
  )
}
