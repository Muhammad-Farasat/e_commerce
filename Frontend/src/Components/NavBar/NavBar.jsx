import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import MenuLinks from "./MenuLinks";
import CartIcon from "./CartIcon";
import AuthButton from "./AuthButton";

const NavBar = () => {
  const [menu, setMenu] = useState("shop");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Update menu based on route
  useEffect(() => {
    if (location.pathname === "/") {
      setMenu("");
    }
  }, [location.pathname]);

  // Text color based on page
  const textColor = isHomePage ? "text-white" : "text-[#111]";
  const hoverColor = "hover:text-[#00d4ff]";

  return (
    <>
      {/* Main Navbar - Always shows just logo and hamburger */}
      <nav
        className={`fixed w-full z-50 py-4 px-6 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? "bg-white/90 backdrop-blur-sm shadow-sm text-[#111]"
            : "bg-transparent text-[#fff] "
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className={`text-4xl font-bold max-sm:text-lg  ${hoverColor} transition-colors`}
          >
            URBANFABRIC
          </Link>

          {/* Hamburger Menu Button - Always visible */}
          <button
            onClick={() => setIsOpen(true)}
            className={`text-3xl max-sm:text-xl  ${hoverColor} transition-colors`}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </nav>

      {/* Sidebar - Works for both mobile and desktop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Sidebar Panel - Wider on desktop */}
        <div
          className={`absolute right-0 top-0 h-full ${
            window.innerWidth >= 1024 ? "w-1/3" : "w-3/4"
          } bg-white text-[#111] shadow-lg transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className={`absolute top-4 right-4 text-2xl ${
               "text-[#111]"
            } hover:text-[#00d4ff]`}
          >
            <RxCross1 />
          </button>

          {/* Sidebar Content */}
          <div className="pt-16 px-6 space-y-8">
            <MenuLinks menu={menu} setMenu={setMenu} isMobile={true} />
            <div className="flex flex-col items-start gap-y-8">
              <CartIcon isMobile={true} />
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;