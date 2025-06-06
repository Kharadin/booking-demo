import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

import './navbar.css'

const Navbar = () => {
    const navigate = useNavigate();

  const {user} = useContext(AuthContext);

  const  gotoLogin =(e)=> {
    e.preventDefault();
    console.log ('goto login')

      navigate("/login")
  }

  return (
    <div  className='navbar'>
     <div className='navContainer'>
          <Link to="/" style={{color:'inherit', textDecoration: "none"}}>
          <span className="logo">KharadinBook</span>
          </Link>
          {user ? user.username : (
          <div className="navItems">
               <button className="navButton">Register</button>
               <button className="navButton" 
                onClick={(e)=>gotoLogin(e)}
                >Login</button>
          </div>
          )}
     </div>
     
    </div>
  )
}

export default Navbar
