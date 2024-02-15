
import { Outlet } from "react-router-dom";

import ErrorPage from "@/error-page";
import Layout from "@/pages/Layout";
import Permission from "@/types/permissions";
import React from "react";

//lazy imports
const NewStory = React.lazy(() => import("@/pages/story/NewStory"));
const YourStories = React.lazy(() => import("@/pages/story/YourStories"));
const AllRoles = React.lazy(() => import("@/pages/roles/AllRoles"));
const NewRole = React.lazy(() => import("@/pages/roles/NewRole"));
const AllMembers = React.lazy(() => import("@/pages/member/AllMembers"));
const Dashbboard = React.lazy(() => import("@/pages/dashboard"));


/** This route map serves the routes as well as is used to
 * generate nav bar menu, so the links can never be broken */
export const protectedRoutes = [
  {
    path: "/",
    element: <Layout><Outlet /> </Layout>,

    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard/",
        element: <Dashbboard />,
        permission: [],
        label: "Dashboard",
      },
      {
        path: "story/",
        element: <><Outlet /></>,
        label: "Story",
        permission: [Permission.ReadBlog],
        children: [
          {
            path: "your-stories/",
            element: <YourStories />,
            label: "Your Stories",
            permission: [Permission.ReadBlog],
          },
          {
            path: "new-story/",
            element: <NewStory />,
            label: "New Story",
            permission: [Permission.CreateBlog],
          },
        ]
      },
      {
        path: "role/",
        label: "Role",
        permission: [Permission.ReadRole],
        element: <><Outlet /></>,
        children: [
          {
            path: "all-roles/",
            element: <AllRoles />,
            permission: [Permission.ReadRole],
            label: "All Roles",
          },
          {
            path: "new-role/",
            element: <NewRole />,
            label: "New Role",
            permission: [Permission.CreateBlog],
          },
        ]
      },
      {
        path: "member/",
        element: <><Outlet /></>,
        permission: [],
        label: "Member",
        children: [
          {
            path: "all-members/",
            element: <AllMembers />,
            permission: [],
            label: "All Members",
          }
        ]
      },
    ],
  },
];
