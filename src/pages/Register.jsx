import { useState, useEffect } from 'react'
import '../App.css'
// import '../styles/style.css'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL
    const [myError, setError] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    async function handleSubmit(e) {
        e.preventDefault();

        const body = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        const bodyString = JSON.stringify(body);

        const headers = {
            "Content-Type": "application/json"
        };

        const options = {
            body: bodyString,
            method: "POST",
            headers: headers,
        }

        const URL = `${apiUrl}/users/register`

        try {
            const response = await fetch(URL, options);
            const responseDetails = await response.json();
            if (responseDetails.token) {
                localStorage.setItem("token", responseDetails.token)
                navigate('/', { state: { successMessage: 'You have successfully logged in' } })    
            } else {
                setError(responseDetails.message);
            }

            } catch (error) {
                setError('Unknown error');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username
                    <input 
                        type='text'
                        id='username' 
                        name='username'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label htmlFor='email'>Email
                    <input 
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor='password'>Password
                    <input 
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type='submit'>Register</button>
            </form>
            <div>
                {myError}
            </div>
        </div>
    )
}

export default Login;