import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Login , SignUp , PostForm  } from '../components';
import  AllPost  from '../pages/AllPost'
import  Home  from '../pages/Home'
import Post from '../pages/Post';
import App from '../App';

function Routers() {
  return (
     <>
     <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}>
              <Route path='/' element={<Home />} />
              <Route path='/addpost' element={<PostForm/>} />
              <Route path='/allpost' element={<AllPost/>} />
              <Route path='/post/:id' element={<Post/>} />
              <Route path='/edit/:eid' element={<PostForm/>} />
          </Route>
          <Route path='/login' element={<Login/> } />
          <Route path='/signup' element={ <SignUp/>} />
      </Routes>
      </BrowserRouter> 
     </>
  )
}

export default Routers