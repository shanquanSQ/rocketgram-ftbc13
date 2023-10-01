import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext(null);

// note that AuthProvider = (props) =>{....}
// It is props that are passed in here, for functional react components.
export const AuthProvider = ({ children }) => {
  // maintain user's state
  const [user, setUser] = useState(null);

  // Define Log-in condition
  // function login(user) {
  //   setUser(null);
  // }

  const login = (user) => {
    setUser(user);
  };

  const logout = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
