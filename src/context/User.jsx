import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(null);
  const getUserData = () => {
    if (userToken != null) {
      const decode = jwtDecode(userToken);
      setUserName(decode.userName);
    }
  };
  useEffect(() => {
    getUserData();
  }, [userToken]);
  return (
    <UserContext.Provider value={{ userName, setUserName, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
