import React, { useState, useContext } from 'react'
import auth_backend from "../api/auth_backend"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

    const { setAuth } = useContext(AuthContext)

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        const password = formData.get('password')

        try {
            const response = await auth_backend.post('/register', {
                username,
                password
            })
            setAuth({ authenticated: true, username: response.data.username || username })
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed')
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-form-buttons'>
                <label>Username</label>
                <input type='text' name='username' required />
                <label>Password</label>
                <input type='password' name='password' required />
                <button type='submit'>Sign Up</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </div>
        </form>
    )
}

export default Signup