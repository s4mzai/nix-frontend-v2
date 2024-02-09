import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../services/API';
import { getCurrentUser } from '../redux/features/auth/authActions';
import { Navigate } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { useRoutes } from 'react-router-dom';

const ProtectedRoute = () => {
    const element = useRoutes([...protectedRoutes]);
    const authUser = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();


    // get current user
    const getUser = async () => {
        const { data } = getCurrentUser();
        // todo: this if check may not be required caz axios will throw error if status is not 2xx
        if (data?.status === 'success') {
            dispatch(getCurrentUser(data));
            console.log(data, "fetched");
            dispatch(data);
        }
        return data;
    };

    useEffect(() => {
        getUser()
            .then((data) => {
                // redirect to /dashboard
                console.log('User is authenticated with data', data);
            })
            .catch((err) => {
                console.log(err.message);
                alert('An error occurred while fetching user details');
            });
    }, [dispatch, authUser]);

    if (localStorage.getItem('token')) {
        return <>
            Error? : {error}
            {element}
        </>;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
