/* eslint-disable no-unused-vars */
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  Link,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Product from "./pages/Product";
import ErrorPage from "./pages/error-page";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
// import PageNav from "./components/PageNav";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div>Welcome</div>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/product",
    element: <Product />,
  },
]);

function App() {
  return (
    <div className="app">
      {/* <RouterProvider router={router}></RouterProvider> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="app" element={<AppLayout />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="*" element={<div>Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
