import React, { createContext, useState, useEffect } from 'react';
import auth_backend from '../api/auth_backend.js'

const AuthContext = createContext()

function AuthProvider({children}) {

    const [auth, setAuth] = useState(null)

    useEffect(() => {
        async function checkAuth() {
              try {
                const response = await auth_backend.get('/checksession')
                
                setAuth(response.data)
              } catch (error) {
                console.error('Error fetching movies:', error)
              }
            }
            checkAuth()
    }, [])

    async function logout() {
        try {
            await auth_backend.post('/logout')
            setAuth({authenticated: false})
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }