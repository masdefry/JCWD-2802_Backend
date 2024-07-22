import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

export const useGetProductsQuery = () => {
    const{ data: dataProducts } = useQuery({
        queryKey: ['getProducts'], 
        queryFn: async() => {
            const response = await axios.get('http://localhost:5000/products')
            return response.data.data
        }
    })

    return {
        dataProducts
    }
}