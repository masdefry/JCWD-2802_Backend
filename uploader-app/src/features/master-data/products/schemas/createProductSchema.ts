import * as Yup from 'yup';

export const createProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().min(1, { message: 'Price cannot be zero' }).required('Product price is required'),
    images: Yup
    .mixed()
    .required('Choose at least one image')
    .test('fileSize', 'File size is too large (maximum file size is 236Kb)', value =>  {
        if(value && value?.length > 0){
            for(let item of value){
                if(item.size > 236000) return false
            }

        }
        return true
    })
})