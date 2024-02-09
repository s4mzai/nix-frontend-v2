import { Outlet } from 'react-router-dom';

import ErrorPage from '@/error-page';

import NewStory from '@/features/story/NewStory';
import AllRoles from '@/features/roles/AllRoles';
import NewRole from '@/features/roles/NewRole';
import AllMembers from '@/features/member/allMembers';
import AllStory from '@/features/story/AllStory';
import Layout from '@/features/Layout';
import Dashbboard from '@/features/dashboard';

export const protectedRoutes = [
    {
        path: '/',
        element: <Layout><Outlet /> </Layout>,

        errorElement: <ErrorPage />,
        children: [
            {
                path: 'dashboard/',
                element: <Dashbboard />
            },
            {
                path: 'story/',
                element: <><Outlet /></>,
                children: [
                    {
                        path: 'all-story/',
                        element: <AllStory />
                    },
                    {
                        path: 'new-story/',
                        element: <NewStory />
                    },
                ]
            },
            {
                path: 'role/',
                element: <><Outlet /></>,
                children: [
                    {
                        path: 'all-roles/',
                        element: <AllRoles />,
                    },
                    {
                        path: 'new-role/',
                        element: <NewRole />,
                    },
                ]
            },
            {
                path: 'member/',
                element: <><Outlet /></>,
                children: [
                    {
                        path: "all-members/",
                        element: <AllMembers />
                    }
                ]
            },
        ],
    },
];
