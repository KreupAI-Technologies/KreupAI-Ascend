import {
  IoCalendarNumberOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";

const Navbar = ({ logoSrc, logoName }) => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="text-neutral-700 hover:border-gray-300 rounded-md border border-gray-200 p-1 cursor-pointer active:bg-gray-100 active:shadow-inner">
                <IoSettingsOutline size={24} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-lg w-48 py-2">
              <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700">
                Settings
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
              <DropdownMenuItem asChild>
                <Link
                  to="/users"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  Users
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="roles"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  Roles
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src="/images/profile.png"
                width={40}
                height={40}
                className="cursor-pointer rounded-full border border-gray-200 hover:border-gray-400"
                alt="Profile"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-lg w-48 py-2">
              <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
              <DropdownMenuItem asChild>
                <Link
                  to="/account-settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/help-center"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  Help Center
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2 border-t border-gray-200" />
              <DropdownMenuItem asChild>
                <Link
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                >
                  <MdLogout className="mr-2" size={20} />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
