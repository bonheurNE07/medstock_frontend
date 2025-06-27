import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { navLinks } from "../../constants/navLinks";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#212121] border-t shadow-sm mt-16 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} className="h-8" alt="Upemba Logo" />
          <span className="text-base font-semibold text-gray-800 dark:text-white">
            Upemba Medical Stock
          </span>
        </Link>

        <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <Link to={path} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} Upemba National Park — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
