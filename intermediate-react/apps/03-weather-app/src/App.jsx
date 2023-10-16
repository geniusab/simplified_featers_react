import { useState, useEffect } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find(key => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function App() {
  const [loading, setLoading] = useState(false);
  // const [location, setLocation] = useState("Lisbon");
  const [location, setLocation] = useState("Ukraine");
  const [weatherData, setWeatherData] = useState({});
  const [displayLocation, setDisplayLocation] = useState();

  function handleChangeLocation(e) {
    setLocation(e.target.value);
  }

  async function getWeather(location) {
    try {
      setLoading(true);
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      console.log({ geoData });

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, name, country_code } = geoData.results.at(0);
      let timezone = geoData.results.at(0).timezone;
      if (!timezone) {
        timezone = geoData.results.at(1).timezone;
      }
      setDisplayLocation(`${name} ${convertToFlag(country_code)}`);
      console.log(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log({ daily: weatherData.daily });
      setWeatherData(weatherData.daily);
    } catch (err) {
      console.err(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="app">
        <h1>Weather</h1>
        <SearchLocation
          location={location}
          onChangeLocation={handleChangeLocation}
        />
        <button onClick={async () => getWeather(location)}>Get Weather</button>
        <h2>Weather for {displayLocation}</h2>
        {loading && <p className="loader">Loading...</p>}
        {weatherData.weathercode && (
          <Weather location={location} weather={weatherData} />
        )}
      </div>
    </>
  );
}

export function Day({ date, max, min, code }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{formatDay(date)}</p>
      <p>
        {min}&deg; &mdash;
        <strong>{max}</strong>&deg;
      </p>
    </li>
  );
}

export function SearchLocation({ location, onChangeLocation }) {
  return (
    <input
      type="text"
      value={location}
      placeholder="Search from location..."
      onChange={onChangeLocation}
    />
  );
}

export function Weather({ location, weather }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
