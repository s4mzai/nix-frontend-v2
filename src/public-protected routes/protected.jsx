import { Outlet } from 'react-router-dom';

import ErrorPage from '@/error-page';

import NewStory from '@/features/story/NewStory';
import AllRoles from '@/features/roles/AllRoles';
import NewRole from '@/features/roles/NewRole';
import Login from '@/features/auth/Login';
import AllMembers from '@/features/member/allMembers';

export const protectedRoutes = [
    {
        path: '/',
        element: <>hi<Outlet/> </>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'story/', 
                element: <> story root for now (TODO) <Outlet/></>,
                children: [
                    {
                        path: 'new-story/', 
                        element: <NewStory/>
                    },
                ]
            },
            {
                path: 'role/', 
                element: <> role root for now (TODO) <Outlet/></>,
                children: [
                    {
                        path: 'all-roles/', 
                        element: <AllRoles/>,
                    },
                    {
                        path: 'new-role/', 
                        element: <NewRole/>,
                    },
                ]
            },
            {
                path: 'member/',
                element: <><Outlet/></>,
                children: [
                    {
                        path: "all-members/",
                        element: <AllMembers/>
                    }
                ]
            },
        ],
    },
];

