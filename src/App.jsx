import './index.css';
import { Route, Routes } from "react-router-dom";
import AuthLayout from './auth/AuthLayout';
import Otp from './auth/Forms/Otp';
import Signup from './auth/Forms/Signup';
import Home from './User/Editor/pages/Home';
import Signin from './auth/Forms/Signin';
import CreatorHome from './User/Creator/pages/CreatorHome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditorLayout from './User/Editor/EditorLayout';
import Profile from './User/Editor/pages/Profile';
import UpdateProfile from './User/Editor/pages/UpdateProfile';
import Explore from './User/Editor/pages/Explore';
import CreatorLayout from './User/Creator/CreatorLayout';
import CreatePost from './User/Creator/pages/CreatePost';
import AdminRootLayout from './Admin/AdminRootLayout';
import AdminIndex from './Admin/Pages/AdminIndex';
import Users from './Admin/Pages/Users';
import AdminSignin from './auth/Forms/AdminSignin';

function App() {

  return (
    <main className=" h-screen">
      <Routes>
                {/* public routes */}
              <Route path='/adminSignin' element={<AdminSignin />} />
               <Route element={< AuthLayout/>}>
                <Route exact path="/" element={<Signin />} />
                <Route path ="/signup" element={<Signup/>} />
                <Route path ="/otp" element={<Otp/>} />
              </Route>

                {/* private route */}
              <Route element={<EditorLayout />}>
                <Route path='/indexEditor' element={<Home/>} />
                <Route path='/explore' element={<Explore/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/updateProfile' element={<UpdateProfile/>} />
              </Route>
              
              <Route element={<CreatorLayout/>}>
                <Route path='/indexCreator' element={<CreatorHome />} />
                <Route path='/createPost' element={<CreatePost />} />
              </Route>

              <Route element={< AdminRootLayout />}>
                <Route path='/adminDashboard' element={<AdminIndex/>} />
                <Route path='/users' element={<Users/>} />
              </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </main>
    
  )
}

export default App
