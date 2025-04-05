import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Define admin email(s)
const ADMIN_EMAILS = ["srinidhirbharadwaj@gmail.com"]; // Replace with your actual admin email(s)

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

  const isAdmin = ADMIN_EMAILS.includes(userEmail); // ✅ check against allowed admin emails

  return (
    <AuthContext.Provider value={{ userEmail, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
