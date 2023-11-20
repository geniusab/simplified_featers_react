/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./shared/Button";
import ButtonBack from "./shared/ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./shared/Message";
import Spinner from "./shared/Spinner";
import { useCities } from "../CityContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
//  <input id="date" onChange={e => setDate(e.target.value)} value={date} />;
function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { isLoading, createCities } = useCities();

  const [cityName, setCityName] = useState("");
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);

  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setGeocodingError("");
        setIsGeocodingLoading(true);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode) {
          throw new Error("Invalid country code, click somewhere else");
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countyName);
        setEmoji(() => convertToEmoji(data.countryCode));
      } catch (e) {
        setGeocodingError(e.message);
      } finally {
        setIsGeocodingLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isGeocodingLoading) return <Spinner></Spinner>;

  if (!lat && lng)
    return <Message message="Start by clicking on the map"></Message>;
  if (geocodingError) return <Message message={geocodingError}></Message>;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCities(newCity);
    navigate("/app/city");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          htmlFor="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={date => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        ></DatePicker>
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
