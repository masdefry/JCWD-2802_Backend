import { useGetProductsQuery } from "../api/useGetProductsQuery"

export const useGetProductsHooks = () => {
    const { dataProducts } = useGetProductsQuery()

    return {
        dataProducts
    }
}