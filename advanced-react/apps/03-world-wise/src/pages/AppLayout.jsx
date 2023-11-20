// csm - command snippet
import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";
import { useAuth } from "../contexts/FakeContextAuth";

function AppLayout() {
  const { user } = useAuth();

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {user && <User />}
    </div>
  );
}

export default AppLayout;
