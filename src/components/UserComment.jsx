import '../App.css'

function UserComment({ timestamp, message }) {

    return (
        <div>
            <header>
                <div>{timestamp}</div>
            </header>
            <article>
                {message}
            </article> 
        </div>
    )
}

export default UserComment;