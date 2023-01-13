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
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import Addresses from "./Pages/Addresses";
import Dashboard from "./Pages/Dashboard";
import Orders from "./Pages/Orders";
import Products from "./Pages/Products";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path="/summer" element={<Summer />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/support" element={<Support />}/>
        <Route path="/shipping" element={<Shipping />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/help" element={<Help />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forget" element={<Forgot />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/addresses" element={<Addresses />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/orders" element={<Orders />}/>
        <Route path="/products" element={<Products />}/>
      </Routes>
    </Router>
  );
}
 
export default App;