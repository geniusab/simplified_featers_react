import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
// import City from "./components/City";
// import CountryItem from "./components/CountryItem";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:3003";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

    // fetch("http://localhost:3003/cities")
    //   .then(async response => {
    //     const data = await response.json();
    //     setSate(data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     setSate([]);
    //   });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="app" element={<AppLayout />}>
            {/* <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route> */}
            {/* Programmatic navigation */}
            <Route index element={<Navigate replace to="city" />}></Route>
            <Route
              path="city"
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path="city/:id" element={<City />} />

            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="*" element={<div>Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
