'use client'
import { ReactNode, FC, useEffect } from 'react';
import {useMutation} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/authSlice';
import { axiosInstance } from '@/utils/axiosInstance';

interface Props {
    children: ReactNode;
}

const AuthProvider: FC<Props> = ({children}) => {
    const dispatch = useDispatch()

    const { mutate: mutationKeepAuth } = useMutation({
        mutationFn: async() => {
            return await axiosInstance.get('/auth')
        }, 
        onSuccess: (response) => {
            dispatch(setAuth(
                response.data.data
            ))
        },
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        mutationKeepAuth()
    }, [])

    return <>{children}</>
}

export default AuthProvider