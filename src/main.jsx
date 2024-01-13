import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import {AppRoutes} from '@/routes/index.jsx';
import '@/index.css'
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter(AppRoutes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)