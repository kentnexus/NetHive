import React, {useState, setState} from "react";
import { navItems } from "../misc/navItems";
import { Link, NavLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

const Navbar = () => {

  const [activeTab, setActiveTab] = useState(1);

  const _handleClick = (menuItem) => { 
    setState({ active: menuItem });
  }
  
  const activeStyle = { color: '#ff3333' };

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
              <NavLink to={menu.url} 
                  // style={activeTab === menu ? activeStyle : {}} 
                  // onClick={setActiveTab = menu}
                  activeStyle={{ color: 'black' }}
                  >
                {menu.title}
                {/* <AiFillCaretDown></AiFillCaretDown> */}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
