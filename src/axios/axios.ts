import axios from 'axios'
import Cookies from 'js-cookie';

type Token = string | undefined;

const token: Token = Cookies.get('auth_token');

export default axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});
