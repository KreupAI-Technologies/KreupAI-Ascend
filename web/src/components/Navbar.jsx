import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { logoData } from "../modules/wotsabot/data/CompanyLogo";
import { NavItems } from "./NavItems";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between bg-white border-b border-gray-300 py-4 px-8">
        <Link to="/" className="flex items-center gap-x-3 ">
          <img
            src={logoData.logoSrc}
            alt="Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <h1 className="text-logo text-lg font-bold">{logoData.logoName}</h1>
        </Link>
        <NavItems />
        <div className="space-x-2">
          <Button asChild className="bg-gradient-to-t from-blue-600 to-blue-300">
            <Link to="login">Sign In</Link>
          </Button>
          <Button asChild className="text-blue-400 bg-white hover:bg-blue-50 border-2 border-blue-300">
            <Link to="signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
