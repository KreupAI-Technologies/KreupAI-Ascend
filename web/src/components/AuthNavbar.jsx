import { Link } from "react-router-dom";
import { logoData } from "../modules/wotsabot/data/CompanyLogo";
import { MdLogout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";

const AuthNavbar = () => {
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between bg-white border-b border-gray-300 py-4 px-8">
        <Link to="home" className="flex items-center gap-x-3 ">
          <img
            src={logoData.logoSrc}
            alt="Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <h1 className="text-logo text-lg font-bold">{logoData.logoName}</h1>
        </Link>

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
    </nav>
  );
};

export default AuthNavbar;
