import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
// import ErrorPage from "./ErrorPage";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import UserCommentsPage from "./pages/UserCommentsPage";
import Register from "./pages/Register";
import DeleteUser from "./pages/DeleteUser";
import CreateBlogPost from "./pages/CreateBlogPost";
import BlogpostPage from "./pages/BlogpostPage";
import GetAllBlogPosts from './pages/GetAllBlogPosts';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<GetAllBlogPosts/>}/>
        <Route
          path="/login" element={<Login/>}/>
        <Route path="/users/:userId" element={<UserPage />}/>
        <Route path="/users/:userId/comments" element={<UserCommentsPage />}/>
        <Route path="/users/register" element={<Register />}/>
        <Route path="/users/:userId/delete" element={<DeleteUser />}/>
        <Route path="/posts" element={<CreateBlogPost />}/>
        <Route path="/posts/:postId" element={<BlogpostPage />}/>
      </Routes>
    </>
  )
}

export default App
