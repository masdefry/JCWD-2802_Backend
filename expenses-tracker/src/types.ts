export interface IExpenses{
    id: number, 
    title: string, 
    nominal: number, 
    type: string, 
    category: string, 
    date: Date
}

export interface IError extends Error{
    status: number
}