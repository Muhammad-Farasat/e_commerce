import React from "react";
import { Link } from "react-router-dom";

const MenuLinks = ({ menu, setMenu, isMobile }) => {

  const linkClasses = "block w-full";
 
  const links = [
    { label: "Mens", path: "/mens" },
    { label: "Womens", path: "/womens" },
    { label: "Kids", path: "/kids" },
  ];

  return (
    <ul className={`${isMobile ? "flex flex-col text-[#111] gap-y-5 text-lg" : "flex gap-x-20 text-[18px]"} font-Rajdhani-Medium cursor-pointer`}>
      {links.map(({ label, path }) => (
        <li key={label}>
          <Link
            to={path}
            className={linkClasses}
            onClick={() => setMenu(label.toLowerCase())}
          >
            {label}
          </Link>
          {menu === label.toLowerCase() && (
            <hr className="border-blue-500 border-[1px]" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
