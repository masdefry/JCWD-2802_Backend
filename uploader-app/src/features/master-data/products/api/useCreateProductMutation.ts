import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateProductMutation = () => {
    const { mutate: mutationCreateProduct } = useMutation({
        mutationFn: async({fd}: any) => {
            console.log('>>>')
            console.log(fd)
            await axios.post('http://localhost:5000/products', fd)
        },
        onSuccess: (response) => {
            alert('Success')
        }, 
        onError: (err) => {
            alert('Error')
        }
    })

    return {
        mutationCreateProduct
    }
}