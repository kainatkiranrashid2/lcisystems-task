import { useState } from "react";
import {
  FaUserCircle,
  FaBook,
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaBars,
} from "react-icons/fa";
import { MdSupervisorAccount, MdSchedule } from "react-icons/md";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Sidebar item component
const SidebarItem = ({
  icon: Icon,
  text,
  isActive = false,
  onClick,
  children,
}) => {
  return (
    <li className={`py-2 flex flex-col`}>
      <div className="mx-4 flex items-center cursor-pointer" onClick={onClick}>
        <Icon className="w-5 h-5 mr-3" />
        <Link to="/home" className="text-sm flex-1">
          {text}
        </Link>

        {children && isActive && <FaChevronCircleDown className="text-lg" />}
        {children && !isActive && <FaChevronCircleUp className="text-lg" />}
      </div>
      {children && isActive && <div className="mt-2">{children}</div>}
    </li>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

// Main Sidebar component
const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <div className="lg:hidden flex items-center p-4 bg-blue-700 text-white">
        <FaBars className="w-6 h-6 " onClick={toggleSidebar} />
      </div>

      <div
        className={`fixed lg:static top-0 left-0 h-full bg-blue-700 text-white flex flex-col transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 z-50`}>
        <div className="p-4 border-b border-blue-800">
          <FaUserCircle className="w-32 h-32 mx-auto" />
        </div>
        <nav className="flex-grow">
          <ul>
            <SidebarItem icon={FaBook} text="Overview" />
            <SidebarItem
              icon={FaUserCircle}
              text="User Management"
              onClick={() => toggleMenu("User Management")}
              isActive={activeMenu === "User Management"}>
              <ul className="bg-blue-800 pl-4 flex flex-col">
                <Link to="/home" className="py-1 text-sm px-4 my-2">
                  Add User
                </Link>
                <Link to="/home" className="py-1 text-sm px-4 my-2">
                  Remove User
                </Link>
              </ul>
            </SidebarItem>
            <SidebarItem
              icon={MdSupervisorAccount}
              text="Supervisor"
              onClick={() => toggleMenu("Supervisor")}
              isActive={activeMenu === "Supervisor"}>
              <ul className="bg-blue-800 pl-4 flex flex-col">
                <Link
                  to="/facility-schedule"
                  className="py-1 text-sm px-4 my-2">
                  Facility Schedule
                </Link>
                <Link to="/home" className="py-1 text-sm px-4 my-2">
                  Manage Custodians
                </Link>
                <Link to="/home" className="py-1 text-sm px-4 my-2">
                  Manual Work Record
                </Link>
                <Link to="/home" className="py-1 text-sm px-4 my-2">
                  My Facilities
                </Link>
                <Link to="/home" className="py-1 text-sm px-4 my-2">
                  Work Certification
                </Link>
                <Link to="/home" className="py-1 text-sm px-4 my-2">
                  4776 notes
                </Link>
              </ul>
            </SidebarItem>
            <SidebarItem icon={MdSchedule} text="Reports" />
            {/* Add more items with respective icons and optional children */}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Sidebar;
