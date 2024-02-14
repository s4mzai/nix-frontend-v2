import { Navigate } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { createContext, useState } from 'react';
import { useRoutes } from 'react-router-dom';

const appContext = createContext();

const ProtectedRoute = () => {
  const [error, setError] = useState('');
  const updateValue = (data) => {
    const err_code = data?.response?.status;
    if (err_code && (err_code === 401 || err_code === 403)) {
      localStorage.clear();
      setError(true);
    }
  };
  const element = useRoutes([...protectedRoutes]);

  if (localStorage.getItem('token')) {
    return (<appContext.Provider value={{ updateValue }}>{error ? <Navigate to="/login?sessionExpired=true" /> : element}</appContext.Provider>);
  } else {
    return <Navigate to="/login?sessionExpired=true" />;
  }
};

export default ProtectedRoute;
export { appContext };