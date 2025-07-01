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
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
        >
          <img
            src="/src/assets/PSF-Logo.jpg"
            alt="Pleroma Springs Foundation Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="text-xl font-bold text-gray-900">PLEROMA</div>
            <div className="text-xs font-medium text-amber-600">
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
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-amber-600 ${
                location.pathname === item.path ? "text-amber-600" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition">
            Support
          </button>
        </div>
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md p-4 absolute top-20 w-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full mt-2 bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600">
              Support
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageHeader;
