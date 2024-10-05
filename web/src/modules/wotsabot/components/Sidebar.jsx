import {
  IoHomeOutline,
  IoPersonOutline,
  IoBriefcaseOutline,
  IoDocumentTextOutline,
  IoAnalyticsOutline,
  IoFolderOpenOutline,
} from "react-icons/io5";
import { FaRegCalendarAlt, FaTasks } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Tooltip from "./ui/Tooltip";

const sections = [
  {
    items: [
      {
        name: "Home",
        icon: <IoHomeOutline size={20} />,
        path: "/wotsabot/home",
      },
      {
        name: "Leads",
        icon: <IoPersonOutline size={20} />,
        path: "/wotsabot/leads",
      },
      {
        name: "Contacts",
        icon: <IoPersonOutline size={20} />,
        path: "/wotsabot/contacts",
      },
      {
        name: "Accounts",
        icon: <IoBriefcaseOutline size={20} />,
        path: "/wotsabot/accounts",
      },
      {
        name: "Deals",
        icon: <IoBriefcaseOutline size={20} />,
        path: "/wotsabot/deals",
      },
      { name: "Tasks", icon: <FaTasks size={20} />, path: "/wotsabot/tasks" },
      {
        name: "Meetings",
        icon: <FaRegCalendarAlt size={20} />,
        path: "/wotsabot/meetings",
      },
      { name: "Calls", icon: <FiPhone size={20} />, path: "/wotsabot/calls" },
      {
        name: "Reports",
        icon: <IoDocumentTextOutline size={20} />,
        path: "/wotsabot/reports",
      },
      {
        name: "Analytics",
        icon: <IoAnalyticsOutline size={20} />,
        path: "/wotsabot/analytics",
      },
      {
        name: "Products",
        icon: <IoFolderOpenOutline size={20} />,
        path: "/wotsabot/products",
      },
      {
        name: "Services",
        icon: <IoFolderOpenOutline size={20} />,
        path: "/wotsabot/services",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <nav className="z-20 fixed top-16">
      <div className="flex flex-col items-center h-screen bg-white border-r border-gray-300 w-16">
        <div className="">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-2">
              {section.items.map((item, itemIndex) => (
                <Tooltip key={itemIndex} text={item.name}>
                  <NavLink
                    key={itemIndex}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center mb-1 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${
                        isActive
                          ? "bg-blue-50 text-blue-500 hover:bg-blue-50"
                          : "text-neutral-800"
                      }`
                    }
                  >
                    <span className="px-3 py-3">{item.icon}</span>
                  </NavLink>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
