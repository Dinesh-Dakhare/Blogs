import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Sport from "./pages/Sport";
import Political from "./pages/Political.jsx";
import Health from "./pages/Health.jsx";
import Business from "./pages/Business.jsx";
import Finance from "./pages/Finance.jsx";
import Entertainment from "./pages/Entertainment.jsx";
import Life from "./pages/Life.jsx";
import Home from "./pages/Home.jsx";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthContextProvider } from "./assets/authContext.jsx";
import { BlogContextProvider } from "./Context/BlogContext.jsx";

import BlogForm2 from "./pages/BlogForm2.jsx";

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
              <Route path="/sport" element={<Sport />} />
              <Route path="/political" element={<Political />} />
              <Route path="/life" element={<Life />} />
              <Route path="/health" element={<Health />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/business" element={<Business />} />
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
