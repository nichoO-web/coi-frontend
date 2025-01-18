import { Link } from "react-router-dom"

const NavBar = ({ user, handleSignout }) => {
    return (
      <>
      <div className="NavBar">
        { user ? (
          <nav>
              <Link to='/'>Home</Link>
              <Link to='' onClick={handleSignout}>Sign Out</Link>
          </nav>
        ) : (
          <nav>
            <div className="nav-links">
              <Link to='/signin'>Sign In</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          </nav>
        )}
      </div>
      </>
    )
}

export default NavBar