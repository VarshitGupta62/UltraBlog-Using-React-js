import React, { useCallback } from 'react'
import { Input , Button , Select} from '../index'
import { useForm } from 'react-hook-form'
import databaseService from '../../appwrite/database'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm() {
  const userData = useSelector((state) => state.auth.userData)
  const [loader, setLoader] = React.useState(false)
  // console.log(userData.$id);
  const navigate = useNavigate();
  const {register, handleSubmit , watch, setValue } = useForm({
    defaultValues:{
      title: "",
      slug: "",
      content: "",
      status:""
    }
  })

  const Submit = async(data) => {
    // console.log("first data",data);
    setLoader(true);
    const file = await databaseService.uploadFile(data.image[0])
    if(file){
      const fileId = file.$id;
      // console.log(fileId);
      data.image = fileId;
      const dbpost = await databaseService.createPost({...data , userId: userData.$id});
      setLoader(false);
      alert("Your post has been submitted");
      navigate("/home")
    }
  }

  const slugTransform = useCallback((value) => {
    if(value) 
    return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z\d\s]+/g, "-")
    .replace(/\s/g, "-");


    return "";
    }, [])

    React.useEffect(() => {

      const watching = watch((value , { name }) => {
        if (name === 'title') {

          setValue( "slug",slugTransform(value.title))
          
        }
      })

      return () => watching.unsubscribe(); 
    }, [ watch , slugTransform , setValue]);

  return (
      
     loader ?
    <div className="text-center  my-48 ">
    <div className="p-4 bg-gray-900 text-center">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
    </div>
    </div>
    :
     <>
     <div className="px-4 pt-6">
     <div className=" col-span-full xl:mb-2">
        <nav className="flex " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
                <svg className="flex-shrink-0 w-6 h-6 mr-2.5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd"></path></svg>
                  Add Post
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Create Post</span>
                </div>
              </li>
            </ol>
        </nav>
        {/* <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Create something awesome here</h1> */}

        {/*------------------------------------ Content ------------------------------ */}
        <div className='py-8 px-4 max-w-3xl' >
          {/* <h2 class="mb-4 text-xl font-bold bg-slate-200 text-gray-800 text-center">Create a new Post</h2> */}
          <form onSubmit={handleSubmit(Submit)}  >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                      <Input
                        label= "Title"
                        type= "text"
                        placeholder="Title"
                        {...register( 'title',{ required: true})}
                      />
                  </div>
                  <div className="sm:col-span-2">
                      <Input
                        label= "Slug"
                        type= "text"
                        placeholder="Slug"
                        {...register('slug' ,{ required: true})}
                        onInput={(e) => {
                          "slug" , slugTransform(e.currentTarget.value)
                        }}
                      />
                  </div>
                  <div>
                      <Input
                        label= "Image"
                        type= "file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register('image' ,{ required: true} )}
                      />
                  </div>
                  <div>
                      <Select
                        label="Status"
                        options={[ "active", "inactive"]}
                        {...register("status" ,{ required: true})}
                      />
                  </div>
                  <div class="sm:col-span-2">
                       <Input
                          label= "Content"
                          type= "text"
                          placeholder="Your content here"
                          {...register( 'content',{ required: true})}
                      />
                  </div>
              </div>
              <br />
              <Button
                  type='submit'
                  name='Submit'
              />
          </form>
          </div>
        {/* ----------------------------------End  of content---------------------------*/}
    </div>
     </div>
     </>
  )
}

export default PostForm