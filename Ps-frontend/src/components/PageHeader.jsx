import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const PageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/what-we-do", label: "What We Do" },
    { path: "/impact", label: "Impact" },
    { path: "/news", label: "News" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-teal-50/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
        >
          <img
            src=""
            alt="Pleroma Springs Foundation Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="text-xl font-bold text-teal-800">PLEROMA</div>
            <div className="text-xs font-medium text-gold-600">
              SPRINGS FOUNDATION
            </div>
          </div>
        </Link>
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium ${
                isScrolled ? "text-teal-800" : "text-white"
              } hover:text-gold-500 ${
                location.pathname === item.path ? "text-gold-500" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button className="bg-white-500 text-gold px-4 py-2 rounded-full border-2 border-gold-500 hover:bg-gold-600 hover:border-gold-600 transition">
            Support
          </button>{" "}
        </div>
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X
              size={24}
              className={isScrolled ? "text-teal-800" : "text-white"}
            />
          ) : (
            <Menu
              size={24}
              className={isScrolled ? "text-teal-800" : "text-white"}
            />
          )}
        </button>
        {isMenuOpen && (
          <div className="lg:hidden bg-teal-50/95 backdrop-blur-md p-4 absolute top-20 w-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 text-teal-800 hover:text-gold-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full mt-2 bg-gold-500 text-white px-4 py-2 rounded-full border-2 border-gold-500 hover:bg-gold-600 hover:border-gold-600 transition">
              Support
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageHeader;
