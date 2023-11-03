import styles from "./Sidebar.module.css";
import Logo from "./logo/Logo";
import AppNav from "./shared/AppNav";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* main */}
      <Outlet></Outlet>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}
          WorldWide Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
