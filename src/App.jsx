import { Outlet } from 'react-router-dom';
import './App.css'
import { AppRoutes } from '@/routes';


function App() {
  return (
    <>
      hi this is root component (for now) 
      <Outlet/>
    </>
  )
}

export default App