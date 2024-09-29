import { useState, createContext, useEffect } from "react";
import { getInSession } from "./sessionData.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});
  useEffect(() => {
    let userInSession = getInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ token: null });
      //when i dont define token null then after logout website crashes
  }, []);
  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
