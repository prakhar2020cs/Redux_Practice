import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthPage from "./components/AuthPage";
import { Toaster } from "react-hot-toast";
import PublicDashboard from "./components/PublicDashboard";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
          <Toaster position="top-right" reverseOrder={false} />

      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route index element={<PublicDashboard />} />
            <Route path ="/dashboard" element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
              } >
              

                </Route>
            <Route path="/products" element={<Product />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
