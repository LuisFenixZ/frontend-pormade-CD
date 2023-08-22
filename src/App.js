import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Login from "./pages/login-page/Login";
import Payment from './pages/mob-pixqrcode/payment';
import Company from "./pages/mob-company/choose-company";
import Choice from "./pages/choice/choice";
import Report from "./pages/generate-report/generate-report";



function App() {

  return (
    <Router>
      
      <Routes>

        <Route path="/" element={<Login/>}></Route>

        <Route path="/company" element={<Company/>}></Route>

        <Route path="/payment" element={<Payment/>}></Route>

        <Route path="/choice" element={<Choice/>}></Route>

        <Route path="/report" element={<Report/>}></Route>

      </Routes>
    </Router>
);
}

export default App;
