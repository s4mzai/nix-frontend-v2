import { protectedRoutes } from "@/router/routeMap";
import SidebarItem from "./sideNavItems.jsx";

function Sidebar() {
  const items = protectedRoutes[0].children;
  return (
    <div className="min-h-[100vh] bg-[#252525] text-white w-[280px]">
      <div className="flex flex-col p-4">
        <div className="m-4 p-4">
          <a
            href="https://nix.dtutimes.com"
            className="flex justify-center items-center"
          >
            <img
              className="h-20 pr-4"
              src="https://nix.dtutimes.com/logo-light.png"
              alt="dtutimesIcon"
            />
          </a>
          <div className="p-2 ml-auto text-center text-xs">
            <span>DTU Times</span>
            <span>2024</span>
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