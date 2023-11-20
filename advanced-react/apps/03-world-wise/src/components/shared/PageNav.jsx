import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "../../contexts/FakeContextAuth";
import Button from "./Button";

function PageNav() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {!isAuthenticated ? (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          ) : (
            <Button type="primary" onClick={logout}>
              Logout
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
