import { protectedRoutes } from "@/router/routeMap";
import SidebarItem from "./sideNavItems.jsx";
import { Link } from "react-router-dom";
import TimesLogo from "@/assets/dtutimesIcon.js";

function Sidebar() {
  const items = protectedRoutes[0].children;
  return (
    <div className="min-h-[100vh] bg-[#252525] text-white w-[280px]">
      <div className="flex flex-col p-4">
        <div className="m-4 p-4">
          <Link
            to="/"
            className="flex justify-center items-center"
          >
            <TimesLogo className="h-20" />
          </Link>
          <div className="p-2 ml-auto text-center text-xs">
            <span>DTU Times {new Date().getFullYear()}</span>
            <ul className="flex justify-center">
              {/*
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <ChevronDownIcon url={link.url} bgColor={link.bgColor} />
                </li>
              ))}
            */}
            </ul>
            <span className="text-xs">
              Got any issues? Contact the Developers.
            </span>
          </div>
        </div>
        <div className="flex-none w-64 bg-[#252525] overflow-auto">
          {items.map((item, index) => (
            <SidebarItem key={`sidebar-root-${index}`} items={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;