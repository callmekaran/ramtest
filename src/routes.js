import React from "react";
import Dashboard from "views/Dashboard.js";
import Role from "views/roles/list.js";
import AddRole from "views/roles/role.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import RoutesName from "variables/route";
import CompanyProfileSetup from "views/company_profile_setup/CompanyProfileSetup";
import PostShiftList from "components/PostShift";

const { dashboard, icons, maps, roles, add_role, company_profile_setup, post_shifts } =
  RoutesName;

var routes = [
  {
    path: dashboard,
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    inSidebar: true,
  },
  {
    path: post_shifts,
    name: "Post Shifts",
    icon: "nc-icon nc-bank",
    component: <PostShiftList />,
    inSidebar: true,
  },
  {
    path: roles,
    name: "Role",
    icon: "nc-icon nc-settings",
    component: <Role />,
    inSidebar: true,
  },
  {
    path: add_role,
    name: "Role",
    icon: "nc-icon nc-settings",
    component: <AddRole />,
    inSidebar: false,
  },
  {
    path: icons,
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    inSidebar: true,
  },
  {
    path: maps,
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: <Maps />,
    inSidebar: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <Notifications />,
    inSidebar: true,
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    inSidebar: true,
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    inSidebar: true,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: <Typography />,
    inSidebar: true,
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: <UpgradeToPro />,
    inSidebar: true,
  },
  {
    path: company_profile_setup,
    name: "Profile Setup",
    icon: "nc-icon nc-settings",
    component: <CompanyProfileSetup />,
    inSidebar: true,
  },
];

export default routes;
