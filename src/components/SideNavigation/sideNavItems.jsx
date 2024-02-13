import { useState } from "react";
import DownArrow from '@/assets/ChevronDownIcon';
import UpArrow from "@/assets/ChevronUpIcon";
import { Link } from "react-router-dom";

function SidebarItem({ items }) {
  const [open, setOpen] = useState(false);
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
        <div className={`${open ? "block" : "hidden"} pl-4`}>
          {items.submenuItems.map((item, index) => (
            <SidebarItem key={index} items={item} />
          ))}
        </div>
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
