import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.svg";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebar = React.useRef();
  const userRole = localStorage.getItem("userRole");
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        {/* <a
          href="https://www.creative-tim.com"
          className="simple-text logo-mini"
        > */}
          <div className="logo-img">
            <img src={require('../../assets/img/RTM Logo Final Jan 2018.png')} alt="react-logo"style={{height:"30%",width:"80%", paddingLeft:"45px"}}/>
          </div>
        {/* </a> */}
        {/* <a
         
          className="simple-text logo-normal"
        >
         iSystem
        </a> */}
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (prop.name === 'User Management' && userRole !== 'admin') {
              // Skip rendering the "User Management" link for roles other than "1"
              return null;
            }

            if (prop.name === 'Add user' && userRole !== 'admin') {
              // Skip rendering the "Add Admin" link for roles other than "1"
              return null;
            }

            return (
              <li className={activeRoute(prop.path) + (prop.pro ? ' active-pro' : '')} key={key}>
                <NavLink to={prop.layout + prop.path} className="nav-NavLink">
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
