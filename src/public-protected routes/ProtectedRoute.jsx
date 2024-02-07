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
    const getUser = () => {
        API.get('/user/current-user').then((d) => {
            console.log(d);
            console.log("hi");
            const data = d.data.data;
            if (data?.status === 'success') {
                dispatch(data);
            } else { throw data; }
        }).catch((error) => {
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
