
import { Link, NavLink } from 'react-router-dom';
/* import '/styles/navbar.css'; */
/* import myLogo from '../../images/logo2.png'; */

function Navigation() {

  return (
    
        <>
            <Link>
                <img src="src/images/clothes-logo.png" alt="logo" />
            </Link>
            <NavLink as={Link} to="/favorites">
                  Favorites
            </NavLink>
      </>
    
  );
}
 




export default Navigation;