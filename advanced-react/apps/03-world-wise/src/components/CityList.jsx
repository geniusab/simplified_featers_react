/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import { PropTypes } from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ cities, isLoading }) {
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

CityList.defaultProps = {
  cities: [],
};

CityList.propsType = {
  cities: PropTypes.Array,
};
