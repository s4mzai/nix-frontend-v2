import React, { useState } from 'react';
// import dtutimesIcon from '../../assets/dtutimesIcon.svg';
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

const SidebarLink = ({ to, label, isOpen, onClick }) => {
  return (
    <div
      className="mb-2 p-2 rounded transition hover:bg-[#404040] flex justify-between items-center"
      onClick={onClick}
    >
      <span>{label}</span>
      {isOpen ? <FaAngleDown /> : <FaAngleRight />}
    </div>
  );
};

const SubMenu = ({ items, isOpen }) => {
  return isOpen ? (
    <div className="ml-4 flex flex-col">
      {items.map((item) => (
        <Link
          to={item.to}
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
    <div className="flex flex-col h-screen w-[280px] bg-[#252525] text-white p-4">
      <div className="m-4 p-4">
        <a
          href="https://nix.dtutimes.com"
          className="flex justify-center items-center"
        >
          <img
            className="h-20 pr-4"
            src="https://nix.dtutimes.com/logo-light.png"
            // src={dtutimesIcon}
            alt="dtutimesIcon"
          />
        </a>
        <div className="p-2 ml-auto text-center text-xs">
          <span>DTU Times </span>
          <span>2024</span>
          <ul className="flex justify-center">
            <li>
              <SocialIcon url="mailto:dtutimes@dtu.ac.in" bgColor="#252525" />
            </li>
            <li>
              <SocialIcon
                url="https://twitter.com/dtutimes"
                bgColor="#252525"
              />
            </li>
            <li>
              <SocialIcon
                url="https://www.facebook.com/dtutimes/"
                bgColor="#252525"
              />
            </li>
            <li>
              <SocialIcon
                url="https://www.instagram.com/dtu_times/"
                bgColor="#252525"
              />
            </li>
          </ul>
          <span className="text-xs">
            Got any issues? Contact the Developers.
          </span>
        </div>
      </div>

      <Link
        to="/profile"
        className="mb-2 p-2 rounded transition hover:bg-[#404040]"
      >
        Profile
      </Link>

      <Link
        to="/login"
        className="mb-2 p-2 rounded transition hover:bg-[#404040]"
      >
        Logout
      </Link>
      <Link
        to="/dashboard"
        className="mb-2 p-2 rounded transition hover:bg-[#404040]"
      >
        Dashboard
      </Link>

      <SidebarLink
        to="/story"
        label="Story"
        isOpen={openMenu === 1}
        onClick={() => handleMenuClick(1)}
      />
      <SubMenu
        isOpen={openMenu === 1}
        items={[{ to: '/new-story', label: 'New Story' }]}
      />

      <SidebarLink
        to="/role"
        label="Role"
        isOpen={openMenu === 2}
        onClick={() => handleMenuClick(2)}
      />
      <SubMenu
        isOpen={openMenu === 2}
        items={[
          { to: '/all-roles', label: 'All Roles' },
          { to: '/new-role', label: 'New Role' },
        ]}
      />

      <SidebarLink
        to="/member"
        label="Member"
        isOpen={openMenu === 3}
        onClick={() => handleMenuClick(3)}
      />
      <SubMenu
        isOpen={openMenu === 3}
        items={[{ to: '/all-members', label: 'All Members' }]}
      />
    </div>
  );
};

export default SideNavigation;
