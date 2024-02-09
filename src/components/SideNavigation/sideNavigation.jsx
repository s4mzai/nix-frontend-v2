import { useState } from 'react';
// import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
// import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import ChevronDownIcon from '../../assets/ChevronDownIcon';

/* const socialLinks = [
  { url: 'mailto:dtutimes@dtu.ac.in', bgColor: '#252525' },
  { url: 'https://twitter.com/dtutimes', bgColor: '#252525' },
  { url: 'https://www.facebook.com/dtutimes/', bgColor: '#252525' },
  { url: 'https://www.instagram.com/dtu_times/', bgColor: '#252525' },
]; */

const sideItems = [
  { to: '/profile', label: 'Profile' },
  { to: '/login', label: 'Logout' },
  { to: '/dashboard', label: 'Dashboard' },
  {
    to: '/story',
    label: 'Story',
    submenuItems: [{ to: '/new-story', label: 'New Story' }],
  },
  {
    to: '/role',
    label: 'Role',
    submenuItems: [
      { to: '/all-roles', label: 'All Roles' },
      { to: '/new-role', label: 'New Role' },
    ],
  },
  {
    to: '/member',
    label: 'Member',
    submenuItems: [{ to: '/all-members', label: 'All Members' }],
  },
];

const SidebarLink = ({ label, isOpen, onClick }) => {
  return (
    <div
      className="flex justify-between items-center"
      onClick={onClick}
      key={label}
    >
      <span>{label}</span>
      {isOpen ? <ChevronDownIcon /> : <ChevronDownIcon />}
    </div>
  );
};

const SubMenu = ({ items, isOpen, to }) => {
  return isOpen ? (
    <div className="ml-4 flex flex-col mt-2">
      {items.map((item) => (
        <Link
          to={to + item.to}
          key={item.label}
          className="mb-2 p-2 rounded transition hover:bg-[#404040]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  ) : null;
};

const SideNavigation = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (value) => {
    setOpenMenu((prev) => (prev === value ? null : value));
  };

  return (
    <div className="flex flex-col min-h-screen w-[280px] bg-[#252525] text-white p-4">
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
          <span>DTU Times </span>
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

      {sideItems.map((item, index) => (
        <div key={item.label} className='mb-2 p-2 rounded transition hover:bg-[#404040]'>
          {item.submenuItems ? (
            <div key={item.label + "submenu"}>
              <SidebarLink
                label={item.label}
                isOpen={openMenu === index + 1}
                onClick={() => handleMenuClick(index + 1)}
              />
              <SubMenu
                isOpen={openMenu === index + 1}
                items={item.submenuItems}
                to={item.to}
              />
            </div>
          ) : (
            <Link
              to={item.to}
              key={item.label}
              className="mb-2 p-2 rounded transition hover:bg-[#404040]"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideNavigation;
