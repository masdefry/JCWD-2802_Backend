'use client'
import { ReactNode, FC } from 'react';

interface Props {
    children: ReactNode;
}

const AuthProvider: FC<Props> = ({children}) => {



    return(
        <>
            {children}
        </>
    )
}

export default AuthProvider