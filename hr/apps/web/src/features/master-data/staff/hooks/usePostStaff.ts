import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const usePostStaff = () => {
    const { mutate: mutationCreateStaff } = useMutation({
        mutationFn: async({firstName, lastName, email, password, role, position, shift}: any) => {
            const token = localStorage.getItem('tkn')

            await axios.post('http://localhost:8000/auth/register-staff', {
                firstName, 
                lastName, 
                email, 
                password, 
                role, 
                position, 
                shift
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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