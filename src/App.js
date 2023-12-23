import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Base from "./components/Base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import UserProfileInfo from "./pages/user-routes/UserProfileInfo";
import CreatePost from "./pages/user-routes/CreatePost";
import SinglePost from "./pages/SinglePost";
import UserPosts from "./pages/user-routes/UserPosts";
import UserProvider from "./context/UserProvider";
import UpdatePost from "./pages/user-routes/UpdatePost";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts/:postId" element={<SinglePost />} />

          <Route path="/user" element={<PrivateRoute />}>
            <Route path="posts" element={<UserPosts />} />
            <Route path="profile/:userId" element={<UserProfileInfo />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
