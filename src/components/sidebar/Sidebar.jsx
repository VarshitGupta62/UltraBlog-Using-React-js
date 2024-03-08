import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from '../LogoutBtn'

function Sidebar() {
    const authStatus = useSelector((state) => state.auth.status)
    // console.log(authStatus);

    const navItems = [
    
        {
            name: "Home",
            path: "/home",
            svg: <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>,
            active: true
        },
        {
            name: "SignUp", 
            path: "/signup",
            svg: <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v6H5a1 1 0 100 2h4v6a1 1 0 102 0v-6h4a1 1 0 100-2h-4V3a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>,
            active: !authStatus
        },
        {
            name: "Login", 
            path: "/login",
            svg:  <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>,
            active: !authStatus
        },
        {
            name: "Add Post", 
            path: "/addpost",
            svg:  <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd"></path></svg>,
            active: authStatus
        },
        {
            name: "All Post", 
            path: "/allpost",
            svg: <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>,
            active: authStatus
        },
        {
            name: "Other Post", 
            path: "/allpost",
            svg: <svg class="w-6 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"/>
            </svg>,
            active: authStatus
        }      
    ]



    return (
    <>
    <aside id="sidebar" className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width" aria-label="Sidebar">
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <ul className="pb-2 space-y-2">
                        {navItems.map((item , index) => 
                        item.active ?  (
                        <li key={index} >
                        <Link to={item.path} className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                            {item.svg}
                            <span className="ml-3" sidebar-toggle-item>
                                  {item.name}  
                            </span>
                        </Link>
                        </li> ) : null)}
                        {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                        )} 
                    </ul> 
                </div>
            </div>
        </div>
    </aside>
    </>
  )
}

export default Sidebar