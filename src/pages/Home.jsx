import React from 'react'
import { PostCard } from '../components'
import { useEffect , useState } from 'react'
import databaseService from '../appwrite/database'

function Home() {
   
  const [posts, setPosts] = useState([])
  // console.log(posts);
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
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Home
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
        { posts.length === 0 ?  
          <div id="alert-additional-content-3" className="p-4  my-36 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
          <div className="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Please Add your post.</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
          Secure your account with a strong password. Remember to use a mix of letters, numbers, and symbols. Avoid sharing your login details with anyone.
          </div>
        </div>
         : 
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
        } 
        {/* ----------------------------End  of content------------------------------ */}
    </div>
    </div>
     </>
  )
}

export default Home