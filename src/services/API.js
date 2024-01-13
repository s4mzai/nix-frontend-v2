import axios from 'axios';

// const API = axios.create({ baseURL: import.meta.env.REACT_APP_BASEURL }) not working 
const API = axios.create({ baseURL: "http://localhost:8080/api/v1" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export default API;