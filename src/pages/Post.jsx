import React from 'react'
import { Link , useParams , useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { useEffect , useState } from 'react';
import databaseService from '../appwrite/database';
import EditForm from './EditForm';
import { useSelector } from 'react-redux'

function Post() {

    const { id } = useParams();
    const[post , setPost] = useState([]);
    let navigate = useNavigate();
    const [loader, setLoader] = React.useState(false)
    const  userData = useSelector((state) => state.auth.userData)
    const [ isAuthor , setisAuthor ] = React.useState(false);
    // const  isAuthor =   post.userId === userData.$id ?  true : false;
     
    React.useEffect(() => {
        if ( post.userId === userData.$id  ) {
            setisAuthor(true)
        }
        console.log(isAuthor);
        console.log(" author post" , post);

    }, [isAuthor , userData , post]);
    
    useEffect(() => {
        if (id) {
            databaseService.getPost(id).then((data) => {
                if (data) {
                    // console.log(data);
                    setPost(data);
                }
                else{
                    navigate("/home")
                    console.log( "No such post found!");
                }
            })
        }
        else{
            navigate("/home")
        }
    }, [])

    const [imageUrl, setImageUrl] = React.useState(null);
    React.useEffect(() => {
      const fetchImage = async () => {
        try {
          const filePreview = await databaseService.fileViewer(post.image);
          setImageUrl(filePreview);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
      if (post.image) {
        fetchImage(); 
      }
    }, [post.image]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const deletePost = () => {
        const  confirmation = confirm("Are you sure?");
        if (confirmation) {
            databaseService.deletePost(id).then((res) => {
                if (res) {

                    databaseService.deleteFile(post.image);
                    alert( "Deleted successfully!" );
                    navigate('/home');
                    
                }
            })  
        }
    }


    const alldata = async (data) => {
        console.log("data", data);
        try {
            // Upload the image file if it exists in the data
            let file = null;
            setLoader(true);
            if (data.image && data.image.length > 0) {
                file = await databaseService.uploadFile(data.image[0]);
                console.log("File uploaded:", file);
            }
    
            // If a new file was uploaded and the post has an existing image, delete the old file
            if (file && post.image) {
                await databaseService.deleteFile(post.image);
                console.log("Old file deleted");
            }
    
            // If a new file was uploaded, update the data with its ID
            if (file) {
                data.image = file.$id;
                console.log("New file ID:", file.$id);
            }
    
            // Update the post data
            const dbUpdate = await databaseService.updatePost(post.$id, { ...data });
    
            if (dbUpdate) {
                navigate("/home");
                setLoader(false);
                console.log("Post updated successfully");
                alert("Post updated successfully ! ");
            }
        } catch (error) {
            console.error("Error post page:", error);
        }
    };
    


  return (
    loader ?
    <div class="text-center my-48">
    <div class="p-4 bg-gray-900 text-center">
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
    </div>
    </div>
    :
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
                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-300" aria-current="page">Post</span>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page"> Choose Post</span>
                    </div>
                </li>
                </ol>
            </nav>
            {/* ---------------------------- content ----------------------------------- */}

            <div className='mx-96 mb-36' >
            {/* ----------------------------- Start Card Component -------------------- */}
            <div className="">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to="#">
                    <img style={{height:"350px" ,width:"450px"}} className="text-white rounded-t-lg" src={imageUrl} alt="Image not found" />
                    </Link>
                    <div className="p-5">
                    <Link >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
                    {/*---------------------------------button----------------------- */}
                    {isAuthor && (
                        <>
                        <Button
                    name='Edit'
                    onClick={toggleModal}
                    buttonClass=' text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
                    svg={<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>}
                    />
                    <Button
                    onClick = {deletePost}
                    name='Delete'
                    svg={<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>}
                    buttonClass='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
                    />
                        </>
                    )} 
                    
                    {/* ------------------------end of button------------------------- */}
                    </div>
                </div>
            </div>
            {/* -----------------------------End Card Component -------------------- */}
            {/* ------------------------ edit form start ---------------------------- */}
            {/* Main modal */}
            {isOpen && (
                 <EditForm
                 toggleModal={toggleModal}
                 post={post}
                 alldata={alldata}
                 />
            )}
            {/* -------------------------- end edit form----------------------------- */}
            </div>
            {/* ----------------------------End  of content------------------------------ */}
        </div>
    </div>
     </>
  )
}

export default Post