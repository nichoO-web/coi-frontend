import { Link } from "react-router-dom"

const NavBar = ({ user, handleSignout }) => {
    return (
      <>
      <div className="NavBar">
        { user ? (
          <nav className="signout">
              <Link to='' onClick={handleSignout}><button>Sign Out</button></Link>
          </nav>
        ) : (
          <nav>
            <div className="nav-links">
              <Link to='/signin' className="signin-link"><button>Sign in</button></Link>
              <Link to='/signup' className="signup-link"><button>Sign Up</button></Link>
            </div>
          </nav>
        )}
      </div>
      </>
    )
}

export default NavBar