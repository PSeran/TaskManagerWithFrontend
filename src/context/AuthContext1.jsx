import { createContext, useContext, useState } from "react";
import { getData, saveData } from "../localstroge/storage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getData("currentUser"));

  const register = (email, password) => {
    const users = getData("users") || [];
    if (users.find(u => u.email === email)) return false;
    const newUser = { id: Date.now(), email, password };
    users.push(newUser);
    saveData("users", users);
    saveData("currentUser", newUser);
    setUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const users = getData("users") || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      saveData("currentUser", found);
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};