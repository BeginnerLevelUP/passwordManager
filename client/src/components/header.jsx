import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import LoginOrSignUp from "./login";
function Header() {
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
          <h1>
            Password <span>Generator</span>
          </h1>

          <h2>Meant to generate the password of your dreams!!!</h2>

          <Link to='/'>
            <button>
              Home
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



export default Header