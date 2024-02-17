import DownArrow from "@/assets/ChevronDownIcon";
import UpArrow from "@/assets/ChevronUpIcon";
import { PermissionProtector } from "@/components/PermissionProtector";
import RouteElement from "@/types/routeElement";
import { useState } from "react";
import { Link } from "react-router-dom";

function SidebarItem({ items }: { items: RouteElement }) {
  const [open, setOpen] = useState(false);

  if (items.hide) { return null; }

  if (items.children) {
    return (
      <PermissionProtector permission={items.permission} silent={true}>
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
            {items.children.map((item, index) => (
              <PermissionProtector key={`nested-${item.label}.${index}`} permission={item.permission} silent={true}>
                <SidebarItem items={
                  {
                    ...item,
                    path: `${items.path}${item.path}`,
                  }
                }
                />
              </PermissionProtector>
            ))}
          </div> : <></>
          }
        </div>
      </PermissionProtector>
    );
  } else {
    return (
      <PermissionProtector permission={items.permission} silent={true}>
        <Link to={items.path}>
          <div className="flex items-center text-white p-2 cursor-pointer hover:bg-gray-500 hover:rounded">
            <span>{items.label}</span>
          </div>
        </Link>
      </PermissionProtector>
    );
  }
}

export default SidebarItem;
