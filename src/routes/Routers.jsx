import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Login , SignUp , PostForm , AuthLayout } from '../components';
import  AllPost  from '../pages/AllPost'
import  Home  from '../pages/Home'
import Post from '../pages/Post';
import Main from '../pages/Main';
import Inactive from '../pages/Inactive';
import App from '../App';

function Routers() {
  return (
     <>
     <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}>
              <Route path='/' element={<Main/>} />
              <Route path='/home' element={ 
                 <AuthLayout>
                    <Home />
                  </AuthLayout>
                   } />
              <Route path='/addpost' element={ <PostForm /> } />
              <Route path='/allpost' element={ <AllPost />} />
              <Route path='/post/:id' element={ <Post />} />
              <Route path='/inactive' element={<Inactive/>} />
          </Route>
          <Route path='/login' element={<Login/> } />
          <Route path='/signup' element={ <SignUp/>} />
      </Routes>
      </BrowserRouter> 
     </>
  )
}

export default Routers