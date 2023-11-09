import styles from "./CountryList.module.css";
import Spinner from "./shared/Spinner";
import Message from "./shared/Message";
import CountryItem from "./CountryItem";
import { useCities } from "../CityContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city of the map"}
      />
    );

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map(el => el.country).includes(cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji, id: cur.id }];
    } else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {Array.isArray(cities) &&
        countries.map(country => {
          return <CountryItem key={country.id} country={country} />;
        })}
    </ul>
  );
}

export default CountryList;
