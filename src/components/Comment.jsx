import '../App.css'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'

function Comment({ commentId }) {

    const apiUrl = import.meta.env.VITE_API_URL
    const [comment, setComment] = useState({});
    const [username, setUsername] = useState('');
    const [myError, setError] = useState('');

    const options = {
        method: "GET",
    }

    const URL = `${apiUrl}/comments/${commentId}`

    async function loadPage() {
        try {
            const response = await fetch(URL, options);  
            const responseDetails = await response.json();  
            setComment(responseDetails[0])
        } catch (error) {
            console.log('Error loading page', myError);
            setError('Error loading page. Please try again.');
        }
    }

    async function loadUser() {
        const apiUrl = import.meta.env.VITE_API_URL
        const URL = `${apiUrl}/users/${comment.author}`

        if (comment.author !== undefined) {
            try {
                const response = await fetch(URL, options);  
                const responseDetails = await response.json();  
                setUsername(responseDetails[0].username)
            } catch (error) {
                console.log('Error loading page', myError);
                setError('Error loading page. Please try again.');
            }
        }
    }

    useEffect(() => {
        loadPage();
    }, [])

    useEffect(() => {
        loadUser();
    }, [comment])


    return (
        <div>
            <header>
                <div>{username}</div>{/*why doesn't this work*/}
                <div>{comment.timestamp}</div>
            </header>
            <article>
                <div>
                    {comment.message}
                </div>
            </article> 
        </div>
    )
}

Comment.propTypes = {
    commentId: PropTypes.string.isRequired,
}

export default Comment;