/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import RoutesName from "variables/route";
import { useAuth } from "context/AuthContext";

var ps;

function AdminLayout(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  const { companyProfile } = useAuth();
  const { company_profile_setup, dashboard } = RoutesName;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  }, []);

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  // const handleActiveClick = (color) => {
  //   setActiveColor(color);
  // };

  // const handleBgClick = (color) => {
  //   setBackgroundColor(color);
  // };

  useEffect(() => {
    if (!companyProfile) {
      const route = !companyProfile ? company_profile_setup : dashboard;
      navigate(route, { replace: true });
    }
  }, [companyProfile, navigate]);
  return (
    <div className="wrapper">
      {!!companyProfile && (
        <Sidebar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          activeColor={activeColor}
        />
      )}

      <div className={!!companyProfile ? "main-panel" : ""} ref={mainPanel}>
        <DemoNavbar {...props} />
        <Routes>
          {routes.map((prop, key) => (
            <Route
              path={prop.path}
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  {prop.component}
                </React.Suspense>
              }
              key={key}
              exact
            />
          ))}
        </Routes>
        {!!companyProfile && <Footer fluid />}
      </div>
      {/* <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div>
  );
}

export default AdminLayout;
