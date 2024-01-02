import { Link } from "react-router-dom"

function Header(){
    return(
        <>
        <header>
  <h1>
    Password 
    <span>Generator</span>
  </h1>

  <h2>Meant to generate the password of your dreams!!!</h2>

  <button>
      <Link to='/'>Home</Link>
  </button>

  <button>
      <Link to='/login'>Login</Link>
  </button>

  <button>
      <Link to='/login'>Signup</Link>
  </button>
</header>
        </>
    )
}

export default Header