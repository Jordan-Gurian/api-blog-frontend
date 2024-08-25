import '../App.css'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Blogpost({ post }) {
        
    return (
        <div>
            <header>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                <div>{post.author}</div>
                <div>{post.timestamp}</div>
            </header>
            <article>
                {post.message}
            </article> 
            </div>
        )
}

Blogpost.propTypes = {
    post: PropTypes.object.isRequired,
}

export default Blogpost;