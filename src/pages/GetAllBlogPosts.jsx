import { useState, useEffect } from 'react'
import '../App.css'
import Blogpost from './../components/Blogpost';
import { v4 as uuidv4 } from 'uuid';

function GetAllBlogPosts() {
    const apiUrl = import.meta.env.VITE_API_URL
    const [posts, setPosts] = useState([])
    const [myError, setError] = useState('');

    const options = {
        method: "GET",
    }

    const URL = `${apiUrl}/posts`

    async function loadPosts() {
        try {
            const response = await fetch(URL, options);
            const responseDetails = await response.json();
            let newPostArray = [];
            responseDetails.map((post) => {
                if (post.published) {
                    newPostArray = [...newPostArray, post];
                }
            })      
            setPosts([...newPostArray])
        } catch (error) {
            console.log('Error loading posts', myError);
            setError('Error loading posts. Please try again.');
        }
    }

    useEffect(() => {
        loadPosts();
    }, [])

    return (
        <div>
            <article>
                {posts.map((post) => 
                    <Blogpost key={uuidv4()}
                        post={post}
                    />
                )}
            </article>
            <div>
                {myError}
            </div>
        </div>
    )
}

export default GetAllBlogPosts;