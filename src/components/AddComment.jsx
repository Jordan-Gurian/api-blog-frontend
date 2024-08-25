import { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

function AddComment({ postId, loadPage }) {
    
    const apiUrl = import.meta.env.VITE_API_URL
    const [message, setMessage] = useState('');
    const [myError, setError] = useState('');
    
    async function handleSubmit(e) {
        e.preventDefault();
    
        const token = localStorage.token;
        let decoded;
        let userId;
        if (token === undefined) {
            decoded = undefined;
            userId = undefined;
        } else { 
            decoded = jwtDecode(token);
            userId = decoded.user._id;
        }

    
        const body = {
            author: userId,
            message: message,
            blogpost: postId,
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
    
        const URL = `${apiUrl}/comments`
    
        try {
            const response = await fetch(URL, options);
            if (response.status === 201) {
                e.target.value = '';
                loadPage();
                setMessage(e.target.value);
            } else {
                setError('You must login to comment');
            }
            } catch (error) {
                setError('Unknown error');
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor='message'>Message
                <input 
                    type='text'
                    id='message' 
                    name='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </label>
            <button type="submit">Post Comment</button>
            <div style={{color:"red"}}>{myError}</div>
        </form>
    )
}

AddComment.propTypes = {
    postId: PropTypes.string.isRequired,
}

export default AddComment;
