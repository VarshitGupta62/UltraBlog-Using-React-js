import React from 'react'
import { PostCard } from '../components'
import { useEffect , useState } from 'react'
import databaseService from '../appwrite/database'

function Inactive() {
    const [posts, setPosts] = useState([])
  console.log(posts);

  useEffect(() => {
    databaseService.getInactivePosts().then((data) => {
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
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-2 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                  Inactive Post
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

export default Inactive