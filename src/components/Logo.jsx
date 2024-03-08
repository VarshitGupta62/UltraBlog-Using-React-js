import React from 'react'
import logo from './static/images/logo.svg';
import { Link } from 'react-router-dom';

function Logo({ 
              lname = "flex ml-2 md:mr-24",
              iname = "",
              sname = "" 
}) 
{
  return (
     <>
       <Link to={"/home"} className={`${lname}`}>
          <img src={logo} className={` mr-3  h-8${iname}`} alt="FlowBite Logo" /> 
          <span className={`self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ${sname}`}>Z-Tube</span>
        </Link> 
     </>
  )
}

export default Logo