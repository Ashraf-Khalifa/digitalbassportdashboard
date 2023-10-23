import Dashboard from "views/Dashboard.js";
// import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import About from "views/About";
import Background from "views/Background";
// import Maps from "views/Map.js";
import UserPage from "views/User.js";
import Qr_code from "views/Qr_code";
import Gallery from "views/Gallery";
// import AddAdmin from "views/AddAdmin"
import TankShop from "views/TankShop";
import PrivacyPolicies from "views/PrivacyPolicies";
import Terms from "views/Terms";
import Users from "views/Users";
import SocialMedia from "views/SocialMedia";
import Events from "views/Events";
import Adduser from "views/Adduser";

import { Routes, Route, Navigate } from 'react-router-dom';

// function PrivateRoute({ element }) {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('userRole');

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//    // Check if the user has role "0"
//    if (userRole === '0') {
//     // If the user has role "0," block access to "User Management" and "UserPage"
//     if (element.props.path === '/user-management' || element.props.path === '/UserPage') {
//       return <Navigate to="/" replace />;
//     }
//   }

//   return <Route element={element} />;
// }


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: (
    <Dashboard />
    ),
    layout: "/admin",
  },
  {
    path: "/PrivacyPolicies",
    name: "Privacy Policies",
    icon: "nc-icon nc-diamond",
    component: <PrivacyPolicies />,
    layout: "/admin",

  },
  {
    path: "/Terms",
    name: "Terms",
    icon: "nc-icon nc-diamond",
    component: <Terms />,
    layout: "/admin",

  },
  {
    path: "/user-management",
    name: "User Management",
    icon: "nc-icon nc-diamond",
    component: <Users />,
    layout: "/admin",
  },
  
  
  {
    path: "/SocialMedia",
    name: "Socia lMedia ",
    icon: "nc-icon nc-diamond",
    component: <SocialMedia />,
    layout: "/admin",

  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    layout: "/admin",

  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/admin",
  //   name: "Add Admin",
  //   icon: "nc-icon nc-single-02",
  //   component: <AddAdmin />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-single-02",
  //   component: <Login/>,
  //   layout: "/",
  // },
  {
    path: "/events",
    name: "Events",
    icon: "nc-icon nc-single-02",
    component: <Events />,
    layout: "/admin",

  },
  {
    path: "/Gallery",
    name: "Gallery",
    icon: "nc-icon nc-single-02",
    component: <Gallery />,
    layout: "/admin",

  },
  {
    path: "/TankShop",
    name: "TankShop",
    icon: "nc-icon nc-single-02",
    component: <TankShop />,
    layout: "/admin",

  },
  {
    path: "/Background",
    name: "Backgrounds",
    icon: "nc-icon nc-tile-56",
    component: <Background />,
    layout: "/admin",

  },
  {
    path: "/About",
    name: "About",
    icon: "nc-icon nc-caps-small",
    component: <About />,
    layout: "/admin",

  },
  {
    
    path: "/Qr_code",
    name: "Qr_code",
    icon: "nc-icon nc-spaceship",
    component: <Qr_code />,
    layout: "/admin",

  },
  {
    
    path: "/UserPage",
    name: "Add admin",
    icon: "nc-icon nc-spaceship",
    component: <UserPage />,
    layout: "/admin",

  },
  {
    
    path: "/addUser",
    name: "Add user",
    icon: "nc-icon nc-spaceship",
    component: <Adduser />,
    layout: "/admin",

  },

];

// Check the user's role and filter out restricted routes
const userRole = localStorage.getItem("userRole");
if (userRole === "0") {
  routes = routes.filter(
    (route) =>
      route.path !== "/user-management" && route.path !== "/UserPage"
  );
}

export default routes;
