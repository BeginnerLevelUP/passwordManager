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
    <nav>
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
 
          <Link to='/settings'>
            <button>
              Settings
            </button>
          </Link>         
          <a onClick={logout} href='/'>
            Logout
          </a>
        </>
      )}
    </nav>
  );
}



export default Nav