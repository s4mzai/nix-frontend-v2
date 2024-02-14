import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from './public-protected routes';
import { Suspense } from 'react';
import { Spinner } from '@/components/Spinner';

function App() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center w-screen h-screen'>
          <Spinner size="xl" />
        </div>
      }
    >
      <ToastContainer />
      <AppRoute />
    </Suspense>
  );
}

export default App;
