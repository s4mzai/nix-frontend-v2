
import { Outlet } from "react-router-dom";

import ErrorPage from "@/error-page";
import Layout from "@/pages/Layout";
import Permission from "@/types/permissions";
import React from "react";
import PendingStories from "@/pages/story/PendingStories";

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
        display: true,
      },
      {
        path: "story/",
        element: <><Outlet /></>,
        label: "Story",
        permission: [Permission.ReadBlog],
        display: true,
        children: [
          {
            path: "your-stories/",
            element: <YourStories />,
            label: "Your Stories",
            permission: [Permission.ReadBlog],
            display: true,
          },
          {
            path: "new-story/",
            element: <NewStory />,
            label: "New Story",
            permission: [Permission.CreateBlog],
            display: true,
          },
          {
            path: "pending-stories/",
            element: <PendingStories />,
            label: "Pending Stories",
            permission: [Permission.PublishBlog],
            display: true,
          },
          {
            path: "pending-stories/:blogId",
            element: <></>,
            label: "Read Story",
            permission: [Permission.ReadBlog, Permission.PublishBlog],
            display: false,
          }
        ]
      },
      {
        path: "role/",
        label: "Role",
        permission: [Permission.ReadRole],
        element: <><Outlet /></>,
        display: true,
        children: [
          {
            path: "all-roles/",
            element: <AllRoles />,
            permission: [Permission.ReadRole],
            label: "All Roles",
            display: true,
          },
          {
            path: "new-role/",
            element: <NewRole />,
            label: "New Role",
            permission: [Permission.CreateRole],
            display: true,
          },
        ]
      },
      {
        path: "member/",
        element: <><Outlet /></>,
        permission: [],
        label: "Member",
        display: true,
        children: [
          {
            path: "all-members/",
            element: <AllMembers />,
            permission: [],
            label: "All Members",
            display: true,
          }
        ]
      },
    ],
  },
];
