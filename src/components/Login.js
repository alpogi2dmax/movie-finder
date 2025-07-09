import React, { useState, useContext } from 'react'
import auth_backend from '../api/auth_backend'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
// import Signup from './Signup'
// import { CgPassword } from 'react-icons/cg'

function Login() {

    const { setAuth } = useContext(AuthContext)
    const [ username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        const password = formData.get('password')
        async function fetchSearch() {
            try {
                const response = await auth_backend.post('/login', {
                    username,
                    password
                })
                setAuth({ authenticated: true, username: response.data.username || username })
                navigate('/')
            } catch (err) {
                setError(err.response?.data?.message || 'Login failed')
            }
        }
        fetchSearch()
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-form-buttons'>
                <label>UserName</label>
                <input type='text' name='username' required />
                <label>Password</label>
                <input type='password' name='password' required />
                <button type='submit'>Login</button>
                {error && <p style={{color: 'red'}}>{error}</p>}

                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </div>
        </form>
    )
}

export default Login