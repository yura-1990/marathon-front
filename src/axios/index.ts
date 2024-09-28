import axios from 'axios'
import Cookies from 'js-cookie';

type Token = string | undefined;

const token: Token = Cookies.get('auth_token');

const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...(token && { 'Authorization': `Bearer ${token}` }), // Add Authorization header if token exists
};

export default axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api', // Use env variable if available
    headers,
})


