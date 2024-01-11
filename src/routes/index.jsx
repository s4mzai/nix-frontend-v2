import App from '@/App.jsx';
import ErrorPage from '@/error-page';

import { Outlet } from 'react-router-dom';

import NewStory from '@/features/story/NewStory';
import Login from '@/features/auth/Login';
import AllRoles from '@/features/roles/AllRoles';
import NewRole from '@/features/roles/NewRole';



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
            {
                path: 'role/', 
                element: <> role root for now (TODO) <Outlet/></>,
                children: [
                    {
                        path: 'all-roles', 
                        element: <AllRoles/>,
                    },
                    {
                        path: 'new-role', 
                        element: <NewRole/>,
                    },
                ]
            },
        ],
    },
];