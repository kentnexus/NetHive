import React, { useState, setState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import * as navItems from "../misc/navItems";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies([]);
  const _attr =
    cookies.user.role === "admin"
      ? navItems.navAdminItems
      : navItems.navUserItems;

  const [activeTab, setActiveTab] = useState(1);

  const _handleClick = (menuItem) => {
    setState({ active: menuItem });
  };

  const activeStyle = { color: "#ff3333" };

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
            // <<<<<<< HEAD
            <li className="menu-items" key={index} style={{ marginTop: "5px" }}>
              <Link to={menu.url}>
                {/* ======= */}
                {/* <li className="menu-items" key={index} style={{marginTop:'5px'}}>
              <NavLink to={menu.url} 
                  // style={activeTab === menu ? activeStyle : {}} 
                  // onClick={setActiveTab = menu}
                  
                  > */}
                {/* >>>>>>> a3c5b6d155af188a5fff33253813107809428ae6 */}
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
