import * as React from "react";
import { UserContext } from "../contexts/user";

/**
 * This should update the user context with the new values for email and name
 */
const Profile = () => {
  const { user, setUserContext } = React.useContext(UserContext);
  const [ formName, setFormName ] = React.useState(user.name);
  const [ formEmail, setFormEmail ] = React.useState(user.email);
  const [ userConfirm, setUserConfirm ] = React.useState(false);
  const [ userError, setUserError ] = React.useState(false);

  return (
    <div>
      <h1>Edit your profile</h1>
      {userConfirm && <p style={{ color: 'green' }}>User updated</p>}
      {userError && <p style={{ color: 'red' }}>Input incorrect</p>}
      <form
        onSubmit={e => {
          e.preventDefault();
          if(
            formEmail &&
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formEmail) &&
            formName
          ) {
            setUserContext({
              ...user,
              email: formEmail,
              name: formName
            });
            setUserConfirm(true);
            setUserError(false);
          }
          else {
            setUserConfirm(false);
            setUserError(true);
          }
        }}
      >
        <input
          name="email"
          value={formEmail}
          onChange={e => setFormEmail(e.target.value)}
        />
        <input
          name="name"
          value={formName}
          onChange={e => setFormName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
