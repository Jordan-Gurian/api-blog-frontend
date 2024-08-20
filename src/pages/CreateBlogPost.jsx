import { useState, useEffect } from 'react'
import '../App.css'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function CreateBlogPost() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL
    const [myError, setError] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [published, setPublished] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.token;
        const decoded = jwtDecode(token);
        const userId = decoded.user._id;

        const body = {
            author: userId,
            title: e.target.title.value,
            message: e.target.message.value,
            published: published,
        };

        const bodyString = JSON.stringify(body);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        const options = {
            body: bodyString,
            method: "POST",
            headers: headers,
        }

        const URL = `${apiUrl}/posts`

        try {
            const response = await fetch(URL, options);
            const responseDetails = await response.json();
            if (responseDetails) {
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
                <label htmlFor='title'>Title
                    <input 
                        type='text'
                        id='title' 
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label htmlFor='message'>Message
                    <input 
                        type='text'
                        id='message'
                        name='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
                <button type='submit'>Save blog</button>
                <button type='submit' onClick={() => setPublished(true)}>Post blog</button>
            </form>
            <div>
                {myError}
            </div>
        </div>
    )
}

export default CreateBlogPost;