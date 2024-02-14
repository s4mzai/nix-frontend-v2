import Permission from "./permissions";

const sidebar_items = [
  {
    "href": "/dashboard",
    "label": "Dashboard",
    "permission": []
  },
  {
    "href": "/login?forcedLogout=true",
    "label": "Logout",
    "permission": []
  },
  {
    "href": "/story",
    "label": "Story",
    "permission": [Permission.ReadBlog],
    "submenuItems": [
      {
        "href": "/new-story",
        "label": "New Story",
        "permission": [Permission.CreateBlog]
      }
    ]
  },
  {
    "href": "/role",
    "label": "Role",
    "permission": [Permission.ReadRole],
    "submenuItems": [
      {
        "href": "/all-roles",
        "label": "All Roles",
        "permission": [Permission.ReadRole]
      },
      {
        "href": "/new-role",
        "label": "New Role",
        "permission": [Permission.CreateBlog]
      }
    ]
  },
  {
    "href": "/member",
    "label": "Member",
    "permission": [],
    "submenuItems": [
      {
        "href": "/all-members",
        "label": "All Members",
        "permission": []
      },
      {
        "href": "/new-member",
        "label": "New Member",
        "permission": [Permission.CreateProfile]
      }
    ]
  }
]

export default sidebar_items;