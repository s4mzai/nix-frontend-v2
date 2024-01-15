import React from 'react'
import { Navigate } from 'react-router-dom'
import { publicRoutes } from './protected'
import { useRoutes } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const element = useRoutes([...publicRoutes]);

    if(localStorage.getItem('token')) {
        console.log("hi");
        return <Navigate to='/' />
    }else {
        return <>{element}</>;
    }
}

export default PublicRoute