import React from 'react'

function Button({
    type="Button",
    name='Button',
    buttonClass="w-full px-5 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 sm:w-auto",
    ...props
}) {
  return (
     <>
     <button type={type} className={`${buttonClass}`} {...props}>{name}</button>
     </>
  )
}

export default Button