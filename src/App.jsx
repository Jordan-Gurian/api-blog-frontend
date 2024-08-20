import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


function App() {

  if (localStorage.token) {
    const token = localStorage.token;
    const decoded = jwtDecode(token);
    const userId = decoded.user._id;

    return (
      <div className="App">
        <Link to={`users/${userId}/delete`}>You're logged in! But maybe you regret it? Delete your account</Link>
        <Link to={'posts'}>Create a blog post!</Link>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>
          <Link to="login">Login</Link>
        </div>
        <div>
          <Link to="users/register">Register</Link>
        </div>
      </div>
    )
  }

}

export default App
