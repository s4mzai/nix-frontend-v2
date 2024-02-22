
import { Outlet } from "react-router-dom";

import ErrorPage from "@/error-page";
import Layout from "@/pages/Layout";
import Permission from "@/types/permissions";
import CustomRouteElement from "@/types/routeElement";
import React from "react";

//lazy imports
const Login = React.lazy(() => import("@/pages/auth/Login"));
const NewStory = React.lazy(() => import("@/pages/story/NewStory"));
const YourStories = React.lazy(() => import("@/pages/story/YourStories"));
const PendingStories = React.lazy(() => import("@/pages/story/PendingStories"))
const ReadStory = React.lazy(() => import("@/pages/story/ReadStory"))
const PublishedStories = React.lazy(() => import("@/pages/story/PublishedStories"))
const AllRoles = React.lazy(() => import("@/pages/roles/AllRoles"));
const NewRole = React.lazy(() => import("@/pages/roles/NewRole"));
const AllMembers = React.lazy(() => import("@/pages/member/AllMembers"));
const Dashbboard = React.lazy(() => import("@/pages/dashboard"));
const AddMember = React.lazy(() => import("@/pages/member/AddMember"));


/** This route map serves the routes as well as is used to
 * generate nav bar menu, so the links can never be broken */
const routeMap: CustomRouteElement[] = [
  {
    path: "dashboard/",
    element: <Dashbboard />,
    permission: [],
    label: "Dashboard",
  },
  {
    path: "login?forcedLogout=true",
    element: <Login />,
    permission: [],
    label: "Logout"
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
      {
        path: "pending-stories/",
        element: <PendingStories />,
        label: "Pending Stories",
        permission: [Permission.PublishBlog],
      },
      {
        path: "pending-stories/:blogId",
        element: <ReadStory />,
        label: "Read Story",
        permission: [Permission.ReadBlog, Permission.PublishBlog],
        hide: true
      },
      {
        path: "published-stories/",
        element: <PublishedStories />,
        label: "Published Stories",
        permission: [Permission.PublishBlog],
      }
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
        element: <NewRole key="new-role" />,
        label: "New Role",
        permission: [Permission.CreateRole],
      },
      {
        path: "update-role/",
        element: <NewRole update_page={true} key="update-role" />,
        label: "Update Role",
        permission: [Permission.UpdateRole],
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
      },
      {
        path: "add-member/",
        element: <AddMember />,
        permission: [],
        label: "Add Member",
      }
    ]
  },
];

export const protectedRoutes = [
  {
    path: "/",
    element: <Layout><Outlet /> </Layout>,
    errorElement: <ErrorPage />,
    children: routeMap
  },
];
