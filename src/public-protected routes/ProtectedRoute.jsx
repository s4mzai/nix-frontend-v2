import { Navigate } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { useRoutes } from 'react-router-dom';

const ProtectedRoute = () => {
    const element = useRoutes([...protectedRoutes]);

    if (localStorage.getItem('token')) {
        return <>{element}</>
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
