import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from './public-protected routes';


function App() {
  return (
    <>
      <ToastContainer/>
      <AppRoute/>
    </>
  )
}

export default App