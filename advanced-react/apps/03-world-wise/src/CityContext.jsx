import React, { useContext, useEffect, useState } from "react";

const CityContext = React.createContext(null);
const BASE_URL = "http://localhost:3003";

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.log(err);
        alert("Error fetching cities");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCities(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      console.log(data);
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
      alert("Error fetching cities");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCities(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCities(prev => [...prev, data]);
    } catch (err) {
      alert("There was an error creating city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(city) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${city.id}`, {
        method: "DELETE",
      });

      setCities(prev => prev.filter(c => c.id !== city.id));
    } catch (err) {
      alert("There was an error deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCities,
        createCities,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export function useCities() {
  const context = useContext(CityContext);
  if (context) return context;
  return new Error("no city context");
}
