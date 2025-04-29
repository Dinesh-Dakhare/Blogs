import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./pages/Home.jsx";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthContextProvider } from "./assets/authContext.jsx";
import { BlogContextProvider } from "./Context/BlogContext.jsx";

import BlogForm2 from "./pages/BlogForm2.jsx";
import SearchBlog from "./pages/SearchBlog.jsx";
import NotFound from "./pages/NotFound.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import BLogs from "./pages/BLogs.jsx";
import SettingSideBar from "./Component/SettingSideBar.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Notification from "./Component/Notification.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <BlogContextProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="settings" element={<SettingSideBar />}>
                <Route path="edit-profile" element={<EditProfile/>} />
                <Route path="dashboard/blogs" element={<Dashboard/>} />
                <Route path="dashboard/notification" element={<Notification/>} />


                <Route
                  path="change-password"
                  element={<ChangePassword/>}
                />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/blog/edit" element={<BlogForm2 />} />
              <Route path="/blog/edit/:blog_id" element={<BlogForm2 />} />
              <Route path="/blog/:blogId" element={<BLogs />} />
              <Route path="/search/:query" element={<SearchBlog />} />
              <Route path="/" element={<Home />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BlogContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
