import '../App.css'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react'
import { Link } from "react-router-dom";

function Navbar() {

    const [token, setToken] = useState(localStorage.token);

    function handleLogout(e) {
      e.preventDefault();
      localStorage.removeItem("token");
      setToken(localStorage.token);
    }

    if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.user._id;

        return (
            <nav>
                <Link to={`/users/${userId}/delete`}>You are logged in! But maybe you regret it? Delete your account</Link>
                <Link to={'/posts'}>Create a blog post!</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav> 
        )
    } else {
        return (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/users/register">Register</Link>
        </div>        
        )
    }
    
}


export default Navbar;