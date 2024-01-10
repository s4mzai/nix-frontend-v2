import App from '@/App.jsx';
import ErrorPage from '@/error-page';

import NewStory from '@/features/story/NewStory';
import Login from '@/features/auth/Login';
import { Outlet } from 'react-router-dom';

export const AppRoutes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'login/', 
                element: <Login/>
            },
            {
                path: 'story/', 
                element: <> story root for now (TODO) <Outlet/></>,
                children: [
                    {
                        path: 'new-story', 
                        element: <NewStory/>
                    },
                ]
            },
        ],
    },
];