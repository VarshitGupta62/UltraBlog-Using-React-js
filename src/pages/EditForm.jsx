import { Link , useParams , useNavigate } from 'react-router-dom'
import { Button , Input , Select } from '../components'
import { useEffect , useState } from 'react';
import databaseService from '../appwrite/database';
import { useForm } from 'react-hook-form'
import React from 'react';

function EditForm({toggleModal , post}) {
    const {register, handleSubmit , watch, setValue } = useForm({
        defaultValues:{
          title: "",
          slug: "",
          content: "",
          status:""
        }
      })
    //   console.log(post);
      console.log(post.image);
      useEffect(() => {
        setValue("title", post.title);  
        setValue("content", post.content);
        setValue("status", post.status);
    }, [post.title, setValue]);

    const slugTransform = React.useCallback((value) => {
        if(value && typeof value === "string") 
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
        }, [  watch , slugTransform , setValue]);

        const [imageUrl, setImageUrl] = React.useState(null);
        React.useEffect(() => {
            const fetchImage = async () => {
            try {
                const filePreview = await databaseService.fileViewer(post.image);
                setImageUrl(filePreview);
                // setValue("image" , imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
            };

            fetchImage();
        }, [post.image , setValue]);
        console.log(imageUrl);


  return (
     <>
         <div id="crud-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
                <div className="relative p-4 w-full max-w-md">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                         Edit Post
                        </h3>
                        <button
                        onClick={toggleModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <form onSubmit={''} className="p-4">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <Input
                                label= "Title"
                                type= "text"
                                // data={setValue.title}
                                placeholder="Title"
                                inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                {...register( 'title',{ required: true})}
                            />
                        </div>
                        <div className="col-span-2">
                            <Input
                                label= "Slug"
                                type= "text"
                                placeholder="Slug"
                                inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                {...register("slug" ,{ required: true})}
                                onChange={(e) => {
                                    setValue("slug", slugTransform(e.target.value));
                                }}
                            />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <Input
                                label= "Image"
                                type= "file"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                {...register('image' ,{ required: true} )}
                            />
                       </div>
                       <div class="col-span-2 sm:col-span-1">
                            <Select
                                label="Status"
                                options={[ "active", "inactive"]}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                {...register("status" ,{ required: true})}
                            />
                        </div>
                        <div class="col-span-2">
                            <Input
                                label= "Content"
                                type= "text"
                                placeholder="Your content here"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                {...register( 'content',{ required: true})}
                            />                   
                        </div>
                        {/* Add other input fields */}
                        </div>
                        <Button
                            name='Submit' 
                            type='submit'
                        />
                    </form>
                    </div>
                </div>
         </div>
     </>
  )
}

export default EditForm