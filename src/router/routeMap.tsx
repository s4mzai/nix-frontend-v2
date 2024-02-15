
import { Outlet } from "react-router-dom";

import ErrorPage from "@/error-page";
import Layout from "@/pages/Layout";
import React from "react";

//lazy imports
const NewStory = React.lazy(() => import("@/pages/story/NewStory"));
const AllStory = React.lazy(() => import("@/pages/story/AllStory"));
const AllRoles = React.lazy(() => import("@/pages/roles/AllRoles"));
const NewRole = React.lazy(() => import("@/pages/roles/NewRole"));
const AllMembers = React.lazy(() => import("@/pages/member/AllMembers"));
const Dashbboard = React.lazy(() => import("@/pages/dashboard"));


export const protectedRoutes = [
  {
    path: "/",
    element: <Layout><Outlet /> </Layout>,

    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard/",
        element: <Dashbboard />
      },
      {
        path: "story/",
        element: <><Outlet /></>,
        children: [
          {
            path: "all-story/",
            element: <AllStory />
          },
          {
            path: "new-story/",
            element: <NewStory />
          },
        ]
      },
      {
        path: "role/",
        element: <><Outlet /></>,
        children: [
          {
            path: "all-roles/",
            element: <AllRoles />,
          },
          {
            path: "new-role/",
            element: <NewRole />,
          },
        ]
      },
      {
        path: "member/",
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
