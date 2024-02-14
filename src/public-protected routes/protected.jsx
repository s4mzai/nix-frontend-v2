import React from 'react';
import { Outlet } from 'react-router-dom';

import Layout from '@/features/Layout';
import ErrorPage from '@/error-page';

//lazy imports
const NewStory = React.lazy(() => import("@/features/story/NewStory"));
const AllStory = React.lazy(() => import("@/features/story/AllStory"));
const AllRoles = React.lazy(() => import("@/features/roles/AllRoles"));
const NewRole = React.lazy(() => import("@/features/roles/NewRole"));
const AllMembers = React.lazy(() => import("@/features/member/AllMembers"));
const Dashbboard = React.lazy(() => import("@/features/dashboard"));


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
