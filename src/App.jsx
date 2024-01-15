import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from './public-protected routes/ProtectedRoute';
import HomePage from './features/HomePage';
import Login from '@/features/auth/Login';
import PublicRoute from './public-protected routes/PublicRoute';


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute><HomePage /></ProtectedRoute>
          // <HomePage />
        } />
        <Route path='/login' element={
          <PublicRoute><Login /></PublicRoute>
          // <Login />
        } />
      </Routes>
    </>
  )
}

export default App