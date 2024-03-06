import React from 'react'
import databaseService from '../appwrite/database'
import { Link } from 'react-router-dom'

function PostCard({ $id , title, content , image}) {
  // console.log(image);
  const [imageUrl, setImageUrl] = React.useState(null);
  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        const filePreview = await databaseService.fileViewer(image);
        setImageUrl(filePreview);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [image]);
  console.log(imageUrl);
  return (
     <>
     <Link to={`/post/${$id}`} >
        <div className="">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/* <Link to="#"> */}
              <img style={{height:"350px" ,width:"450px"}} className="text-white rounded-t-lg" src={imageUrl} alt="Image not found" />
            {/* </Link> */}
            <div className="p-5">
              <Link >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{content}</p>
            </div>
          </div>
        </div>
      </Link>
     </>
  )
}

export default PostCard