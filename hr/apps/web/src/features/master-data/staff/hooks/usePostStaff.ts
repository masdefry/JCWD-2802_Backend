import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/utils/axiosInstance'

export const usePostStaff = () => {
    const { mutate: mutationCreateStaff } = useMutation({
        mutationFn: async({firstName, lastName, email, password, role, position, shift}: any) => {
            await axiosInstance.post('/auth/register-staff', {
                firstName, 
                lastName, 
                email, 
                password, 
                role, 
                position, 
                shift
            })
        }, 
        onSuccess: (response) => {
            toast.success('Create Staff Success!')
        }, 
        onError: (error) => {
            toast.error('Create Staff Failed!')
        }
    })

    return {
        mutationCreateStaff
    }
}