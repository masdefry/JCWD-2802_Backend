'use client'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ReactNode, FC } from 'react';

interface Props {
    children: ReactNode;
}

const ReduxProvider: FC<Props> = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider