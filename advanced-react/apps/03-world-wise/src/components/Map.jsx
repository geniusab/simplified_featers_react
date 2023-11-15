import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useQuery } from "./city/City";

import styles from "./Map.module.css";

import { useCities } from "../CityContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./shared/Button";

function Map() {
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPositions,
    getPosition,
  } = useGeolocation();
  const { query } = useQuery();
  const { lat, lng } = query;
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  useGeolocation();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPositions) {
      const { lat, lng } = geoLocationPositions;
      if (lat && lng) setMapPosition([lat, lng]);
    }
  }, [geoLocationPositions]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPositions && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => {
          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                {city.emoji} <br /> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
