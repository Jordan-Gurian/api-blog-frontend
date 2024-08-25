import { useState, useEffect } from 'react'
import '../App.css'
import Blogpost from './../components/Blogpost';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";
import AddComment from './../components/AddComment'
import Comment from './../components/Comment'

function BlogpostPage() {
    const { postId } = useParams()
    const apiUrl = import.meta.env.VITE_API_URL
    const [post, setPost] = useState({author: '', title: '', timestamp: '', message: '', comments: []})
    const [myError, setError] = useState('');

    const options = {
        method: "GET",
    }

    const URL = `${apiUrl}/posts/${postId}`

    async function loadPage() {
        try {
            const response = await fetch(URL, options);  
            const responseDetails = await response.json();  
            setPost(responseDetails[0])
        } catch (error) {
            console.log('Error loading page', myError);
            setError('Error loading page. Please try again.');
        }
    }

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <div>
            <article>
                <Blogpost key={uuidv4()}
                    post={post}
                />
                <AddComment 
                    postId={postId}
                    loadPage={() => loadPage()}  
                />
                {post.comments.map((comment) => {
                    return <Comment key={uuidv4()} commentId={comment} /> //why is this not on the page?
                })}
            </article>
            <div>
                {myError}
            </div>
        </div>
    )
}

export default BlogpostPage;