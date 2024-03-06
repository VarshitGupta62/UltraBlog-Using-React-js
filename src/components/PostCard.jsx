import React from 'react'
import databaseService from '../appwrite/database'
import { Link } from 'react-router-dom'
import {Button} from './index'

function PostCard({ $id , title, content , image}) {
  console.log(image);
  return (
     <>
     <Link to={`post/${$id}`} >
        <div className="">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/* <Link to="#">
              <img className="text-white rounded-t-lg" src={databaseService.fileViewer("65e731ebca861a50c9eb")} alt="Image not found" />
            </Link> */}
            <div className="p-5">
              <Link >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{content}</p>
              {/* <Button
              name='Edit'
              buttonClass='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
              />
              <Button
              name='Delete'
              buttonClass='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
              /> */}
            </div>
          </div>
        </div>
      </Link>
     </>
  )
}

export default PostCard