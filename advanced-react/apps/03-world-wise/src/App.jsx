import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
// import City from "./components/City";
// import CountryItem from "./components/CountryItem";

import CityList from "./components/city/CityList";
import CountryList from "./components/CountryList";
import City from "./components/city/City";
import Form from "./components/Form";
import { CityProvider } from "./CityContext";

function App() {
  return (
    <CityProvider>
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
              <Route path="city" element={<CityList />}></Route>
              <Route path="city/:id" element={<City />} />

              <Route path="countries" element={<CountryList />}></Route>
              <Route path="form" element={<Form />}></Route>
            </Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route path="*" element={<div>Not Found</div>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </CityProvider>
  );
}

export default App;
