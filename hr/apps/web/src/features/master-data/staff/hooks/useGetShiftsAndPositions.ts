import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/axiosInstance'

export const useGetShiftsAndPositions = () => {
    // Paralel
    const { data: dataShifts, isError: isErrorShifts } = useQuery({
        queryKey: ['get-shifts'],
        queryFn: async() => {
            const res = await axiosInstance.get('/shifts')
            return res.data.data
        }
    })

    const { data: dataPositions, isError: isErrorPositions } = useQuery({
        queryKey: ['get-positions'],
        queryFn: async() => {
            const res = await axiosInstance.get('/positions')
            return res.data.data
        }
    })

    return {
        dataShifts, 
        isErrorShifts,
        dataPositions, 
        isErrorPositions
    }
}