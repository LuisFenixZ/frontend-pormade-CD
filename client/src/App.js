import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Login from './components/Login/Login';
import Pagamento1 from "./components/Pagamento/Pagamento1";
import Pagamento2 from "./components/Pagamento/Pagamento2";
import NavBar from "./components/NavBar/NavBar";




function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>

        <Route path="/" element={<Login/>}></Route>

        <Route path="/payment" element={<Pagamento1/>}></Route>
        <Route path="/payment" element={<Pagamento2/>}></Route>

      </Routes>
    </Router>
);
}

export default App;
