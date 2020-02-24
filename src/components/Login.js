import * as React from "react";
import { UserContext } from "../contexts/user";

const Login = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setError(null);
  }, [user.email, user.password]);

  const { setUserContext } = React.useContext(UserContext);
  return (
    <>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form
        onSubmit={e => {
          setError(null);
          e.preventDefault();
          if (
            user.email &&
            user.password &&
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email) &&
            user.password.trim() === "password"
          ) {
            setUserContext({
              ...user,
              name: "Test User"
            });
          } else {
            setError("Invalid email or password");
          }
        }}
      >
        <input
          name="email"
          value={user.email}
          onChange={event => {
            setUser({...user, email: event.target.value})
          }}
        />
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={event => {
            setUser({...user, password: event.target.value})
          }}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
