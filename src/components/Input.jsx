import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(
  function Input({
    label,
    labelClass = '',
    inputClass='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
    type= 'text',
    ...props
} , ref) {
  const id = useId()
  return (
     <>
        <div>
            <label htmlFor={id} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white${labelClass}`}>{label}</label>

            <input type={type}  className={`${inputClass}`}    {...props}  id={id}  ref={ref} />
        </div>
     </>
  )
}
)

export default Input