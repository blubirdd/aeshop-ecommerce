import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-client";

export const UserContext = createContext({
  currentUser: null,
  token: null,
  // notification: null,
  userRole: null,
  setUser: () => {},
  setToken: () => {},
});


function UserContextProvider({ children }) {

  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [isLoading, setIsLoading] = useState(true);
  // const [notifications, setNotifications] = useState([]);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  //load user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(token){
          const { data } = await axiosClient.get("/user");
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const contextValue = {
    user,
    setUser,
    token,
    setToken,
    userRole: null,
    isLoading,
    // notifications,
    // setNotification,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
