import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import API from '../services/API';
import { getCurrentUser } from '../redux/features/auth/authActions';
import { Navigate } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { useRoutes } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const element = useRoutes([...protectedRoutes]);

    const getUser = async () => {
        try {
            const { data } = await API.get('/user/current-user');
            if (data?.status === "success") {
                dispatch(getCurrentUser(data));
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    }
    useEffect(() => {
        getUser();
    });

    
    if (localStorage.getItem('token')) {
        return <>{element}</>;
    } else {
        return <Navigate to='/login'/>
    }
}

export default ProtectedRoute