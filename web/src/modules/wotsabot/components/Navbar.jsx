import {
  IoCalendarNumberOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ logoSrc, logoName }) => {
  return (
    <nav className="z-20 fixed left-0 top-0 right-0">
      <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-300 shadow-sm h-16">
        <Link to="home" className="flex items-center gap-x-3 ">
          <img
            src={logoSrc}
            alt="Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <h1 className="text-logo text-lg font-bold">{logoName}</h1>
        </Link>
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IoSearchOutline size={20} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-sm px-12 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-[.5px] focus:ring-gray-300"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-neutral-700 hover:border-gray-300 rounded-md border border-gray-200 p-1 cursor-pointer active:bg-gray-100 active:shadow-inner">
            <GoPlus size={24} />
          </div>
          <div className="text-neutral-700 hover:border-gray-300 rounded-md border border-gray-200 p-1 cursor-pointer active:bg-gray-100 active:shadow-inner">
            <IoMdNotificationsOutline size={24} />
          </div>
          <div className="text-neutral-700 hover:border-gray-300 rounded-md border border-gray-200 p-1 cursor-pointer active:bg-gray-100 active:shadow-inner">
            <IoCalendarNumberOutline size={24} />
          </div>
          <div className="text-neutral-700 hover:border-gray-300 rounded-md border border-gray-200 p-1 cursor-pointer active:bg-gray-100 active:shadow-inner">
            <IoSettingsOutline size={24} />
          </div>
          <img
            src="/images/profile.png"
            width={40}
            height={40}
            className="cursor-pointer rounded-full border border-gray-200"
          />
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  logoName: PropTypes.string.isRequired,
};

export default Navbar;
