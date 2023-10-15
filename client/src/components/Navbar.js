import React from "react";
import { navItems } from "../misc/navItems";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav>
      <ul className="menus">
        {navItems.map((menu, index) => {
          return <NavItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
