import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import API from '../services/API';
import { getCurrentUser } from '../redux/features/auth/authActions';
import { Navigate, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../features/HomePage';
import Login from '../features/auth/Login';
import NewRole from '../features/roles/NewRole';

const AppRoute = ({ children }) => {
    // const dispatch = useDispatch();
    // console.log('Rendered element for path:', window.location.pathname);

    // //get current user
    // const getUser = async () => {
    //     try {
    //         const { data } = await API.get('/user/current-user');
    //         if (data?.status === "success") {
    //             dispatch(getCurrentUser(data));
    //         }
    //     } catch (error) {
    //         localStorage.clear();
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     getUser();
    // });

    // const isAuthenticated = !!localStorage.getItem('token');

    // // if (!isAuthenticated) {
    // //     return <Navigate to="/login"/>;
    // // }

    return (
        <>
            <Routes>
            <Route path="/login" element={<NewRole/>} />
            <Route path="/*" element={<ProtectedRoute />} />
            <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    )
}

export default AppRoute