import { useState, useEffect } from 'react'
import '../App.css'
// import '../styles/style.css'
import { useParams } from "react-router-dom";
import UserPost from './../components/UserPost';
import { v4 as uuidv4 } from 'uuid'

function UserPage() {

    const { userId } = useParams()
    const apiUrl = import.meta.env.VITE_API_URL
    const [posts, setPosts] = useState([])
    const [myError, setError] = useState('');

    const URL = `${apiUrl}/users/${userId}/posts`;

    async function loadPosts() {
        try {
            const response = await fetch(URL);
            const responseDetails = await response.json();      
            setPosts([...responseDetails])
        } catch (error) {
            console.log('Error loading user page', myError);
            setError('Error loading user page. Please try again.');
        }
    }

    useEffect(() => {
        loadPosts()
    }, []);


    return (
        <div>
            <header>User page</header>
            <article>
                {posts.map((post) => 
                    <UserPost key={uuidv4()}
                        post={post}
                    />
                )}
            </article> 
        </div>
    )
}

export default UserPage;