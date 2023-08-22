import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Login from "./pages/login-page/Login";
import Payment from './pages/mob-pixqrcode/payment';
import Company from "./pages/mob-company/choose-company";



function App() {

  return (
    <Router>
      
      <Routes>

        <Route path="/" element={<Login/>}></Route>

        {/* <Route path="/company" element={<Company/>}></Route> */}

        <Route path="/payments" element={<Payment/>}></Route>

      </Routes>
    </Router>
);
}

export default App;
