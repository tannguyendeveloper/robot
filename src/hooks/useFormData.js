import { useState } from 'react';
const useFormData = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const setKeyValue = (name, value) => {
        setValues({...values, [name]: value});
    } 
    return {
        values,
        setKeyValue,
        setValues
    }
}

export default useFormData;