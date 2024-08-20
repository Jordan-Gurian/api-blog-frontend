import '../App.css'

function UserPost({ title, timestamp, message }) {

    return (
        <div>
            <header>
                <div>{title}</div>
                <div>{timestamp}</div>
            </header>
            <article>
                {message}
            </article> 
        </div>
    )
}

export default UserPost;