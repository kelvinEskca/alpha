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
      </Routes>
    </Router>
  );
}
 
export default App;