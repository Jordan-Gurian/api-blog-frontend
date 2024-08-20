import { useState, useEffect } from 'react'
import '../App.css'
// import '../styles/style.css'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function DeleteUser() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL
    const [myError, setError] = useState('');
    const [deleteString, setDeleteString] = useState('');    

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.token;
        const decoded = jwtDecode(token);

        const userId = decoded.user._id;

        const bodyString = JSON.stringify(decoded);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        const options = {
            body: bodyString,
            method: "DELETE",
            headers: headers,
        }

        const URL = `${apiUrl}/users/${userId}/delete`

        if (deleteString === "delete") {
            try {
                const response = await fetch(URL, options);
                const responseDetails = await response.json();
                if (responseDetails) {
                    localStorage.removeItem("token")
                    navigate('/', { state: { successMessage: 'You have successfully deleted your account' } })   
                }
                } catch (error) {
                    setError('Unknown error');
            }
        } else {
            setError(`You must type "delete" before deleting your account`)
        }


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='deleteString'>Type "delete"
                    <input 
                        type='text'
                        id='deleteString' 
                        name='deleteString'
                        value={deleteString}
                        onChange={(e) => setDeleteString(e.target.value)}
                    />
                </label>
                <button type='submit'>Delete Account</button>
            </form>
            <div>
                {myError}
            </div>
        </div>
    )
}

export default DeleteUser;