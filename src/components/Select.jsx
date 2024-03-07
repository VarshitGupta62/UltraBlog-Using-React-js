import React , {useId} from 'react'


const Select = React.forwardRef(
    function Select({
        label,
        options,
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
        ...props
     } , ref) {
        const id = useId();
      return (
         <>
         <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
         <select id={id} ref={ref} className={` ${className}`} {...props}>
            {
                options.map((option , index) => (
                    <option key={index} value={option} >{option}</option>
                ))
            }
         </select>
         </>
      )
    }
)



export default Select