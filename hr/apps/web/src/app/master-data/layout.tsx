'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/navigation';

export default function MasterDataLayout({ children }: {children: React.ReactNode}){
    
    const auth = useSelector((state: any) => state.auth.auth)
    const router = useRouter()

    useEffect(() => {
        if(auth?.role !== undefined){
            if(auth?.role !== 'HR') return router.push('/')
        }  
    }, [auth])

    return(
        <>
            {children}
        </>
    )
}