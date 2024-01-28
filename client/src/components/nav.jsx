import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import LoginOrSignUp from "./login";
function Nav() {
  // Logout User
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      {!Auth.loggedIn() ? (
        <>

        <LoginOrSignUp></LoginOrSignUp>
        </>
      ) : (
        <>
          <Link to='/'>
            <button>
              Home
            </button>
          </Link>

          <Link to='/me'>
            <button>
              Profile
            </button>
          </Link>
          <a onClick={logout} href='/'>
            Logout
          </a>
        </>
      )}
    </header>
  );
}



export default Nav