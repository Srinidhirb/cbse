import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const ADMIN_EMAILS = ["srinidhirbharadwaj@gmail.com"]; 

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || null;
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const login = (email) => {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  const isAdmin = ADMIN_EMAILS.includes(userEmail);

  return (
    <AuthContext.Provider value={{ userEmail, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
