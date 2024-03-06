import { Navbar, Footer , Sidebar } from "./components" 
import { Outlet } from 'react-router-dom';
// import conf from "./conf/conf"

function App() {

  // console.log(import.meta.env.VITE_APPWRITE_URL);
  // console.log("asdsd");
  // console.log(conf.appwriteUrl);
   
  return (
    <>
       <Navbar/>
       <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
              {/* {{ sidebar }} */}
              <Sidebar/>
              <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                <main>
                {/* {{ Content }} */}
                <Outlet/>
                </main>
                {/* {{ Footer }} */}
                <Footer/>
              </div>
          </div>
    </>
  )
}

export default App
