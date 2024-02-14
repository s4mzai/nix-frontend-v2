import { useState } from "react";
import DownArrow from '../../assets/ChevronDownIcon';
import UpArrow from "../../assets/ChevronUpIcon";
import { Link } from "react-router-dom";
import Permission from "../../data/permissions";
import React from "react";

type Superuser = "*";

function SidebarItem({ items, user_perm }: { items: any, user_perm: Permission[] | Superuser }) {
  const [open, setOpen] = useState(false);
  if (!(user_perm === "*") && items.permission?.length > 0 && !items.permission.some((perm: Permission) => user_perm.includes(perm))) {
    return <></>;
  }
  if (items.submenuItems) {
    return (
      // make this div appear in full screen
      <div className="flex flex-col">
        <div
          className="flex items-center justify-between text-white p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center">
            <span>{items.label}</span>
          </div>
          <div>{open ? <UpArrow /> : <DownArrow />}</div>
        </div>
        {open ? <div className="pl-4">
          {items.submenuItems.map((item, index) => (
            <SidebarItem key={index} items={
              {
                ...item,
                href: `${items.href}${item.href}`,
              }
            }
              user_perm={user_perm}
            />
          ))}
        </div> : <></>
        }

      </div>
    );
  } else {
    return (
      <Link to={items.href}>
        <div className="flex items-center text-white p-2 cursor-pointer hover:bg-gray-500 hover:rounded">
          <span>{items.label}</span>
        </div>
      </Link>
    );
  }
}

export default SidebarItem;
