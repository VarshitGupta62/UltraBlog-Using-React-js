import React from 'react'
import { Link , useParams , useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { useEffect , useState } from 'react';
import databaseService from '../appwrite/database';

function Post() {

    const { id } = useParams();
    const[post , setPost] = useState(null);
    let navigate = useNavigate();
    
    useEffect(() => {
        if (id) {

            databaseService.getPost(id).then((data) => {
                if (data) {
                    setPost(data);
                    console.log("Data : ",  post);
                }
                else{
                    navigate("/")
                    console.log( "No such post found!");
                }
            })
            
        }
        else{

            navigate("/")

        }
    }, [])

    const deletePost = () => {
        alert(`You clicked the Delete button! :: id : ${id}`);
    }


  return (
     <>
     <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
            <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Home
                    </a>
                </li>
                <li>
                    <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-300" aria-current="page">Post</span>
                    </div>
                </li>
                
                <li>
                    <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Your Post</span>
                    </div>
                </li>
                </ol>
            </nav>
            {/* ---------------------------- content ----------------------------------- */}
            <div className='mx-96 mb-36' >

            {/* ----------------------------- Start Card Component -------------------- */}
            <div className="">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {/* <Link to="#">
                    <img className="text-white rounded-t-lg" src={databaseService.fileViewer("65e731ebca861a50c9eb")} alt="Image not found" />
                    </Link> */}
                    <div className="p-5">
                    <Link >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">this is title</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">this is contnet</p>
                    <Link to={`/edit/${id}`} >
                    <Button
                    name='Edit'
                    buttonClass='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
                    />
                    </Link>
                    <Button
                    onClick = {deletePost}
                    name='Delete'
                    buttonClass='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
                    />
                    </div>
                </div>
            </div>
            {/* -----------------------------End Card Component -------------------- */}
            </div>
            {/* ----------------------------End  of content------------------------------ */}
        </div>
    </div>
     </>
  )
}

export default Post