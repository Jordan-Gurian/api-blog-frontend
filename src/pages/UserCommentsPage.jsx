import { useState, useEffect } from 'react'
import '../App.css'
import { useParams } from "react-router-dom";
import UserComment from './../components/UserComment';
import { v4 as uuidv4 } from 'uuid';

function UserCommentsPage() {

    const { userId } = useParams()
    const apiUrl = import.meta.env.VITE_API_URL
    const [comments, setComments] = useState([])
    const [myError, setError] = useState('');

    const URL = `${apiUrl}/users/${userId}/comments`;

    async function loadComments() {
        try {
            const response = await fetch(URL);
            const responseDetails = await response.json();      
            setComments([...responseDetails])
        } catch (error) {
            console.log('Error loading user page', myError);
            setError('Error loading user page. Please try again.');
        }
    }

    useEffect(() => {
        loadComments()
    }, []);


    return (
        <div>
        <header>User page</header>
        <article>
            {comments.map((comment) => 
                <UserComment key={uuidv4()}
                    timestamp={comment.timestamp}
                    message={comment.message}
                />
            )}
        </article> 
        </div>
    )
}

export default UserCommentsPage;