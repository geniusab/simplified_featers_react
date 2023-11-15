/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./shared/Button";
import ButtonBack from "./shared/ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./shared/Message";
import Spinner from "./shared/Spinner";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);

  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
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
  if (geocodingError) return <Message message={geocodingError}></Message>;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={e => setDate(e.target.value)} value={date} />
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
