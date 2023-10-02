/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import About from "views/About";
import Background from "views/Background";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Gallery from "views/Gallery";
import AddAdmin from "views/AddAdmin"
import TankShop from "views/TankShop";
import Login from "views/Login";
import PrivacyPolicies from "views/PrivacyPolicies";
import Terms from "views/Terms";
import Users from "views/Users";
import SocialMedia from "views/SocialMedia";
import Events from "views/Events";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
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
    path: "/banners",
    name: "Users",
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
  {
    path: "/admin",
    name: "Add Admin",
    icon: "nc-icon nc-single-02",
    component: <AddAdmin />,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-single-02",
  //   component: <Login/>,
  //   layout: "/admin",
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
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
