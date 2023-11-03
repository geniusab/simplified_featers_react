/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useQuery } from "./City";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [search, setSearch, query] = useQuery();
  const { lat, lng } = query;

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() =>
          setSearch({
            lat: 24,
            lng: 20,
          })
        }
      >
        Change pos
      </button>
    </div>
  );
}

export default Map;
