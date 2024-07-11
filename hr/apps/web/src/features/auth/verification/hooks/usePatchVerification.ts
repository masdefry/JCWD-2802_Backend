import { axiosInstance } from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query'

export const usePatchVerification = () => {
    
    const { mutate: mutationVerification } = useMutation({
        mutationFn: async({password, token}: any) => {
            await axiosInstance.patch('/auth', 
                {
                    password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        }, 
        onSuccess: (response) => {
            toast.success('Verification Success')
        }, 
        onError: (error) => {
            toast.error('Verification Error!')
        }
    })

    return {
        mutationVerification
    }
}