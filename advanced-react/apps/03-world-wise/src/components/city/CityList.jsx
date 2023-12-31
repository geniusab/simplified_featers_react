import CityItem from "./CityItem";
import styles from "./CityList.module.css";

import Spinner from "../shared/Spinner";
import Message from "../shared/Message";
import { useCities } from "../../contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city of the map"}
      />
    );

  return (
    <ul className={styles.cityList}>
      {Array.isArray(cities) &&
        cities.map(city => {
          return <CityItem key={city.id} city={city} />;
        })}
    </ul>
  );
}

export default CityList;
