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

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <BlogContextProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog" element={<BlogForm2 />} />
              <Route path="/search/:query" element={<SearchBlog />} />
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </BlogContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
