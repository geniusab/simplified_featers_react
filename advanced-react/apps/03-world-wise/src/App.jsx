import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/FakeContextAuth";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Login from "./pages/Login";
// import Product from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";

const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

import CityList from "./components/city/CityList";
import CountryList from "./components/country/CountryList";
import City from "./components/city/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// dist/assets/index-cfdc5164.css   31.34 kB │ gzip:   5.25 kB
// dist/assets/index-05a56007.js   528.26 kB │ gzip: 149.66 kB │ map: 2,199.39 kB

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <div className="app">
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="Login" element={<Login />}></Route>
                <Route path="product" element={<Product />}></Route>
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
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
            </Suspense>
          </BrowserRouter>
        </div>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
