import * as React from "react";
import { UserContext } from "../contexts/user";

const Home = () => {
  const { user } = React.useContext(UserContext);
  return (
    <main>
      <h1>Welcome {user.name}</h1>
    </main>
  );
};

export default Home;
