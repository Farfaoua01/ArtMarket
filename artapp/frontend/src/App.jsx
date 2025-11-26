import Navbar from "./components/header/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/home";
import Shop from "./components/pages/shop/shop";
import Contact from "./components/pages/contact/contact";
import Admin from "./components/pages/adminpage/admin";
import Productpage from "./components/pages/shop/product-page";

import Adminpage from "./components/pages/adminpage/admin";
import './App.css';
import Cart from "./components/pages/shop/cart";
import { useEffect, useState } from "react";
import Profile from "./components/pages/profile/profile";
import Checkout from "./components/pages/shop/checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ResetPassword from "./components/header/resetPassword";
import About from "./components/pages/about/about";
import Logingoogle from "./components/header/logingoogle";
function App() {
  return (
    <PayPalScriptProvider options={{ clientId: 'EHugaPQDEbIpC5vZ66HdPUD4FuBrgzx0NxlwOqAnULGzoPtd2rgpEytlUwCdlvCCiRDO3gYma16OjyLl' }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/shop' Component={Shop} />
            <Route path='/contact' Component={Contact} />
            <Route path='/login' Component={Logingoogle} />
            <Route path='/reset-password' Component={ResetPassword} />
            <Route path='/about' Component={About} />
            <Route path='/artworks-page/:artworkId' Component={Productpage} />
            <Route path='/:userid' Component={Home} />
            <Route path='/account' Component={Admin} />
            <Route path='/cart' Component={Cart} />
            <Route path='/profile' Component={Profile} />
            <Route path='/checkout' Component={Checkout} />
            <Route path='/resetPassword' Component={ResetPassword} />
            <Route path='/resetPassword' Component={ResetPassword} />
            <Route path='/admin' Component={Adminpage} />
          </Routes>
        </Router>
      </div>
    </PayPalScriptProvider>
  );
}
export default App;
