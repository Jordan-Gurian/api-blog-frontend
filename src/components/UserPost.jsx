import '../App.css'
import PropTypes from 'prop-types';
import Blogpost from './Blogpost'
import { jwtDecode } from 'jwt-decode';

function UserPost({ post }) {

    const token = localStorage.token;
    let decoded;
    let userId;
    let authorIsUser;
    if (token === undefined) {
        authorIsUser = false;
    } else { 
        decoded = jwtDecode(token);
        userId = decoded.user._id;
        authorIsUser = userId === post.author;
    }

    if (authorIsUser) {
        return (
            <div>
                <Blogpost 
                    post={post}
                />
                <button>Delete</button>
            </div>
        )
    } else {
        return (
            <div>
                <Blogpost 
                    post={post}
                />
            </div>
        )
    }
}

UserPost.propTypes = {
    post: PropTypes.object.isRequired,
}

export default UserPost;