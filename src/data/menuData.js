const sidebar_items = [
  {
    "href": "/dashboard",
    "label": "Dashboard"
  },
  {
    "href": "/login",
    "label": "Logout"
  },
  {
    "href": "/story",
    "label": "Story",
    "submenuItems": [
      {
        "href": "/new-story",
        "label": "New Story"
      }
    ]
  },
  {
    "href": "/role",
    "label": "Role",
    "submenuItems": [
      {
        "href": "/all-roles",
        "label": "All Roles"
      },
      {
        "href": "/new-role",
        "label": "New Role"
      }
    ]
  },
  {
    "href": "/member",
    "label": "Member",
    "submenuItems": [
      {
        "href": "/all-members",
        "label": "All Members"
      }
    ]
  }
]

export default sidebar_items;