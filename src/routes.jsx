import App from "./App";
// import ErrorPage from "./ErrorPage";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import UserCommentsPage from "./pages/UserCommentsPage";
import Register from "./pages/Register";
import DeleteUser from "./pages/DeleteUser";
import CreateBlogPost from "./pages/CreateBlogPost";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users/:userId",
    element: <UserPage />
  },
  {
    path: "/users/:userId/comments",
    element: <UserCommentsPage />
  },
  {
    path: "/users/register",
    element: <Register />
  },
  {
    path: "/users/:userId/delete",
    element: <DeleteUser />
  },
  {
    path: "/posts",
    element: <CreateBlogPost />
  },
];

export default routes;
