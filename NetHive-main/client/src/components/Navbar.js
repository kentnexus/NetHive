import React from "react";
import { navItems } from "../misc/navItems";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import { AiFillCaretDown } from "react-icons/ai";
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa

const Navbar = () => {
  return (
    <nav>
      <ul className="menus">
        {navItems.map((menu, index) => {
          return (
            <li className="menu-items" key={index}>
              <Link to={menu.url} >
                {menu.title}
<<<<<<< HEAD
=======
                {/* <AiFillCaretDown></AiFillCaretDown> */}
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
