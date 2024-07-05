import { GoPerson } from 'react-icons/go';
import { CiLock } from 'react-icons/ci';

export default function AuthPage(){
    return(
        <main className='flex justify-center'>
            <section id='form-login'>
                <h1 className='font-bold text-2xl'>
                    Sign in
                </h1>
                <label className='input input-bordered flex items-center gap-2 my-2'>
                    <input type='text' className='grow' placeholder='Username or email' />
                    <GoPerson />
                </label>
                <label className='input input-bordered flex items-center gap-2 my-2'>
                    <input type='text' className='grow' placeholder='Password' />
                    <CiLock />
                </label>
                <button className='btn bg-red-500 text-white w-full my-2'>
                    Sign in
                </button>
            </section>
        </main>
    )
}