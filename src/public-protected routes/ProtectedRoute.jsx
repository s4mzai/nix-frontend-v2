import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../services/API';
import { Navigate } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { useRoutes } from 'react-router-dom';

const ProtectedRoute = () => {
    const element = useRoutes([...protectedRoutes]);
    const authUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();


    // get current user
    const getUser = async () => {
        try {
            const { data } = getCurrentUser();
            // todo: this if check may not be required caz axios will throw error if status is not 2xx
            if (data?.status === 'success') {
                // dispatch(getCurrentUser(data));
                // this should fix the double api calls
                dispatch(data);
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        })
    };

    useEffect(() => {
        // Dispatch getCurrentUser only if auth.user is null
        if (!authUser) {
            getUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, authUser]);

    if (localStorage.getItem('token')) {
        return <>{element}</>;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
