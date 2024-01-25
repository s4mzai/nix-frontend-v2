import { Outlet } from 'react-router-dom';

import ErrorPage from '@/error-page';

import NewStory from '@/features/story/NewStory';
import AllRoles from '@/features/roles/AllRoles';
import NewRole from '@/features/roles/NewRole';
import AllMembers from '@/features/member/allMembers';
import Layout from '@/features/HomePage';

export const protectedRoutes = [
    {
        path: '/',
        element: <Layout><Outlet/> </Layout>,
        
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'story/', 
                element: <><Outlet/></>,
                children: [
                    {
                        path: 'new-story/', 
                        element: <NewStory/>
                    },
                ]
            },
            {
                path: 'role/', 
                element: <><Outlet/></>,
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

