import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Login from "./pages/login-page/Login";
import Payment from './pages/mob-pixqrcode/payment';
import Admin from "./pages/choice/choice";
import Report from "./pages/generate-report/generate-report";
import Idset from "./pages/mob-id-set/id-set";
import Idvalue from "./pages/mob-value-set/value-set"
import Company from "./pages/mob-company/choose-company";



function App() {

  return (
    <Router>
      
      <Routes>

        <Route path="/" element={<Login/>}></Route>

        <Route path="/welcome" element={<Company/>}></Route>

        <Route path="/payment" element={<Payment/>}></Route>

        <Route path="/admin" element={<Admin/>}></Route>

        <Route path="/report" element={<Report/>}></Route>

        <Route path="/idset" element={<Idset/>}></Route>

        <Route path="/idvalue" element={<Idvalue/>}></Route>

      </Routes>
    </Router>
);
}

export default App;
