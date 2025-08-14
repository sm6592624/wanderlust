import { useState } from 'react'

// Custom hook for handling form state and submission
export const useForm = (initialState = {}, apiCall) => {
    const [inputValues, setInputValues] = useState(initialState)
    const [result, setResult] = useState({})
    const [errors, setErrors] = useState({})

    // Handle input field changes
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    }

    // Submit form data to API
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await apiCall(inputValues)
            setResult(response)
            setErrors({}) // Clear any previous errors
        } catch (err) {
            console.error('Form submission error:', err)
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors)
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' })
            }
        }
    }

    // Reset form to initial state
    const handleReset = () => {
        setInputValues(initialState)
        setErrors({})
    }


    return {
        inputValues,
        handleOnChange,
        handleOnSubmit,
        result,
        errors,
        handleReset
    }
}

