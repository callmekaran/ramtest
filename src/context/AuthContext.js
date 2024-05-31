import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext(null);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );
  const [companyProfile, setCompanyProfile] = useState(
    JSON.parse(localStorage.getItem("company_profile")) ?? null
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (data) => {
    const { tokens, user, companyProfile: company_profile } = data;
    localStorage.setItem("access_token", tokens.access.token);
    localStorage.setItem("refresh_token", tokens.refresh.token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("company_profile", JSON.stringify(company_profile) ?? null);

    setIsAuthenticated(true);
    setUserData(user);
    setCompanyProfile(company_profile);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("company_profile");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userData, companyProfile, setCompanyProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
