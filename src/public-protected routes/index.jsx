import {Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
// import HomePage from '../features/HomePage';
import Login from '../features/auth/Login';

const AppRoute = ({ children }) => {
    return (
        <>
            <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/*" element={<ProtectedRoute />} />
            {/* <Route path="/" element={<HomePage />} /> */}
            </Routes>
        </>
    )
}

export default AppRoute