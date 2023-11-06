import React from "react";
import { navItems } from "../misc/navItems";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="menus">
        {navItems.map((menu, index) => {
          return (
            <li className="menu-items" key={index}>
              <Link to={menu.url} >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
