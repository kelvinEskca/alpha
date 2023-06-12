import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Summer from "./Pages/Summer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Support from "./Pages/Support";
import Shipping from "./Pages/Shipping";
import Contact from "./Pages/Contact";
import Help from './Pages/Help';
import Login from './Pages/Login';
import Forgot from "./Pages/Forgot";
import Reset from "./Pages/Reset";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import Addresses from "./Pages/Addresses";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders";
import Products from "./Pages/Products";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import PrivateUserRoute from "./Components/PrivateUserRoutes";
import PrivateRoute from "./Components/AdminRoute";
import Success from "./Components/Success";
import NotFound from "./Components/NotFound";
import Category from "./Pages/Category";
import Return from "./Pages/Return";
import Settings from "./Pages/Settings";
import { CartProvider } from "./CartContext";
import Track from "./Pages/Track";
import Details from "./Pages/Details";
import Admin from "./Pages/Admin";
import AdminRegister from "./Pages/AdminRegister";
import PublicRoute from "./Components/PublicRoute";
import Warranty from "./Pages/Warranty";
import CategoryDetails from "./Pages/CategoryDetails";
const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path="/summer" element={<Summer />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/ticket" element={<Support />}/>
          <Route path="/shipping" element={<Shipping />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/help" element={<Help />}/>
          <Route path="/warranty" element={<Warranty />}/>
          <Route path="/return" element={<Return />}/>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path="/admin" element={<PublicRoute><Admin /></PublicRoute>}/>
          <Route path="/forget" element={<Forgot />}/>
          <Route path="/reset/:id" element={<Reset />}/>
          <Route path="/forget" element={<Forgot />}/>
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>
          <Route path="/adminregister" element={<PublicRoute><AdminRegister /></PublicRoute>}/>
          <Route path="/details/:id" element={<Details />}/>
          <Route path="/category/:id" element={<PrivateUserRoute><CategoryDetails /></PrivateUserRoute>}/>
          <Route path="/account" element={<PrivateUserRoute><Account /></PrivateUserRoute>}/>
          <Route path="/addresses" element={<PrivateUserRoute><Addresses /></PrivateUserRoute>}/>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
          <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>}/>
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>}/>
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>}/>
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>}/>
          <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>}/>
          <Route path="/track" element={<Track />}/>
          <Route path="/men" element={<Men />}/>
          <Route path="/women" element={<Women />}/>
          <Route path="/success" element={<Success />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </CartProvider>
  );
}
 
export default App;