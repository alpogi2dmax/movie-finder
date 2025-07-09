import React, { useState, useContext } from React
import auth_backend from "../api/auth_backend"
import { AuthContext } from "../context/AuthContext"

function Signup() {

    const { setAuth } = useContext(AuthContext)

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
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed')
        }
    }

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <div className='signup-form-fields'>
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