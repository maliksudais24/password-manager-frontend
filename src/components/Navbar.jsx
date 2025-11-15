import React, { useState } from "react";
import { Link } from "react-router-dom"; // use Link for routing
import { useAuth } from "../contexts/AuthContext";
import Logout from "./Logout";
import Introduction from "./Introduction";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define navigation items based on authentication status
  const navItems = user
    ? [
        { name: "Home", path: "/home" },
        { name: "Show Passwords", path: "/Showpasswords" },
        { name: "Profile", path: "/profile" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Login", path: "/Login" },
      ];

  return (
    <nav className="flex justify-between items-center bg-[#FEFAE0] text-black h-16 shadow-md px-4 sm:px-6 md:px-10 font-['Times_New_Roman'] relative">
      {/* Logo */}
      <div className="font-['Times_New_Roman'] text-xl sm:text-2xl font-semibold tracking-wide flex items-center">
        <span className="text-[#9A3412]"></span>
        <span className="text-[#111827]">Pass</span>
        <span className="text-[#D97706]">Protect</span>
        <span className="text-[#9A3412]"></span>
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-4 sm:gap-6 text-base sm:text-lg items-center">
        {navItems.map((item) => (
          <li
            key={item.name}
            className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#e7dfb5] hover:shadow-md hover:scale-105"
          >
            <Link to={item.path} className="hover:text-[#9A3412]">
              {item.name}
            </Link>
          </li>
        ))}
        {user && <Logout />}
      </ul>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <lord-icon
          src="https://cdn.lordicon.com/bsdkzyjd.json"
          trigger="hover"
          colors="primary:#e88c30,secondary:#000000"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={toggleMenu}
        ></lord-icon>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#FEFAE0] shadow-md md:hidden z-10">
          <ul className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#e7dfb5] hover:shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to={item.path} className="hover:text-[#9A3412]">
                  {item.name}
                </Link>
              </li>
            ))}
            {user && (
              <li className="px-4 py-2">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
