import React from 'react'

function Button({
    type="Button",
    name='Button',
    svg= null,
    buttonClass="w-full px-5 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 sm:w-auto",
    ...props
}) {
  return (
     <>
     <button type={type} className={`${buttonClass}`} {...props}
     > 
     {svg && (
                <span className="me-1 -ms-1 inline-flex items-center">
                    {svg}
                </span>
            )}
            {name}
     </button>
     </>
  )
}

export default Button