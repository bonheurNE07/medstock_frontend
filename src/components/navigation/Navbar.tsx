import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { navLinks } from "../../constants/navLinks";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-[#202124]/30 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Upemba Logo" className="h-8" />
          <span className="text-lg font-semibold dark:text-white">
            Upemba Medical Stock
          </span>
        </Link>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-600 dark:text-white hover:text-blue-600"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`${
            open
              ? "block absolute left-0 top-full w-full bg-white dark:bg-[#181818] shadow-md z-40"
              : "hidden"
          } md:flex md:static md:w-auto md:space-x-6 items-center px-4 py-4 md:p-0`}
        >
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "text-white bg-blue-700"
                    : "text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <Button
              variant="destructive"
              size="sm"
              className="ml-2"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="ml-2"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
