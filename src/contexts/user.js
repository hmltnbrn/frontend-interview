import * as React from "react";

export const UserContext = React.createContext(null);

export const useUserContext = () => {
  const [user, setUser] = React.useState({
    name: "Test user"
  });
  const setUserContext = (values) => {
    setUser({...user, ...values});
  };
  return {
    user,
    setUserContext
  }
};

export const AuthController = ({ children }) => {
  const user = useUserContext();

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
