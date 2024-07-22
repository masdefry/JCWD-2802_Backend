import { useCreateProductMutation } from '../api/useCreateProductMutation';

export const useCreateProductHooks = () => {
    const { mutationCreateProduct } = useCreateProductMutation()

    return {
        mutationCreateProduct
    }
}