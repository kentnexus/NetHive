import React from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import * as navItems from "../misc/navItems";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies([]);
  const _attr =
    cookies.user.role === "admin"
      ? navItems.navAdminItems
      : navItems.navUserItems;

  return (
    <nav>
      <ul
        className="menus"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {navItems.navAdminItems.map((menu, index) => {
          return (
            <li className="menu-items" key={index} style={{ marginTop: "5px" }}>
              <Link to={menu.url}>
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
