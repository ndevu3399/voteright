import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved  = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = ({ access_token, username, role }) => {
    const data = { username, role };
    localStorage.setItem("user",  JSON.stringify(data));
    localStorage.setItem("token", access_token);
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
