import axios from 'axios'

const auth_backend = axios.create({
    baseURL: 'https://web-production-ea6e.up.railway.app',
    // baseURL: 'http://localhost:5000',
    withCredentials: true
})

export default auth_backend