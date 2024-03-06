import React from 'react'
import { PostCard } from '../components'
import { useEffect , useState } from 'react'
import databaseService from '../appwrite/database'

function AllPost() {

  const [posts, setPosts] = useState([])
  console.log(posts);

  useEffect(() => {
    databaseService.getPosts().then((data) => {
      if (data) {
        setPosts(data.documents)
      }
    })
  }, [])

  return (
     <>
     <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
     <div className="mb-4 col-span-full xl:mb-2">
        <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
                <svg className="flex-shrink-0 mr-4 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                   All Post
                </a>
              </li>
               
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Post</span>
                </div>
              </li>
            </ol>
        </nav>
        {/* ---------------------------- content ----------------------------------- */}
        

        <div className=" mb-40 grid grid-cols-1 gap-4 px-4 pt-6 md:grid-cols-2 xl:grid-cols-4 dark:bg-gray-900">
        {/* ----------------------------- Start Card Component -------------------- */}
         {
          posts.map((data , index) => (
            <div key={index} >
              <PostCard {...data} />
            </div>
          ))
        }
        {/* -----------------------------End Card Component -------------------- */}
         
        
      </div>

        {/* ----------------------------End  of content------------------------------ */}
    </div>
    </div>
     </>
  )
}

export default AllPost