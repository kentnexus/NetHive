import React from "react";
import { navItems } from "../misc/navItems";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav>
      <ul className="menus"  
          style={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
        {navItems.map((menu, index) => {
          return (
            <li className="menu-items" key={index} style={{marginTop:'5px'}}>
              <Link to={menu.url} >
                {menu.title}
                {/* <AiFillCaretDown></AiFillCaretDown> */}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
