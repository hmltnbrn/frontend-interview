import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import { AuthController, UserContext } from "./contexts/user";
import AuthenticatedApp from "./components/AuthenticatedApp";

function App() {
  return (
    <Router>
      <AuthController>
        <AuthOrLogin />
      </AuthController>
    </Router>
  );
}

const AuthOrLogin = () => {
  const { user } = React.useContext(UserContext);

  return user.email ? <AuthenticatedApp /> : <Login />;
};

export default App;
