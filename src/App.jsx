import "./index.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import Otp from "./auth/Forms/Otp";
import Signup from "./auth/Forms/Signup";
import Home from "./User/Editor/pages/Home";
import Signin from "./auth/Forms/Signin";
import CreatorHome from "./User/Creator/pages/CreatorHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorLayout from "./User/Editor/EditorLayout";
import Explore from "./User/Editor/pages/Explore";
import CreatorLayout from "./User/Creator/CreatorLayout";
import CreatePost from "./User/Creator/pages/CreatePost";
import AdminRootLayout from "./Admin/AdminRootLayout";
import AdminIndex from "./Admin/Pages/AdminIndex";
import Users from "./Admin/Pages/Users";
import AdminSignin from "./auth/Forms/AdminSignin";
import MyPost from "./User/Creator/pages/MyPost";
import MypostDetail from "./User/Creator/pages/MypostDetail";
import PostDetail from "./User/Editor/pages/PostDetail";
import CreatorProfile from "./User/Creator/pages/CreatorProfile";
import Profile from "./User/Editor/pages/Profile";
import CreatorActivity from "./User/Creator/pages/CreatorActivity";
import Work from "./User/Editor/pages/Work";

function App() {
  return (
    <main className=" h-screen">
      <Routes>
        {/* public routes */}
        <Route path="/adminSignin" element={<AdminSignin />} />
        <Route element={<AuthLayout />}>
          <Route exact path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
        </Route>

        {/* private route */}
        <Route element={<EditorLayout />}>
          <Route path="/indexEditor" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postDetail/:id" element={<PostDetail />} />
          <Route path="/work" element={<Work />} />
        </Route>

        <Route element={<CreatorLayout />}>
          <Route path="/indexCreator" element={<CreatorHome />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/my_post" element={<MyPost />} />
          <Route path="/mypostDetail/:id" element={<MypostDetail />} />
          <Route path="/creatorProfile" element={<CreatorProfile />} />
          <Route path="/activity" element={<CreatorActivity />} />
        </Route>

        <Route element={<AdminRootLayout />}>
          <Route path="/adminDashboard" element={<AdminIndex />} />
          <Route path="/users" element={<Users />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
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
  );
}

export default App;
