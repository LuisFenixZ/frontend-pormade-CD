import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import Login from '../src/pages/Login/Login';
import NavBar from "./components/NavBar/NavBar";
import InicialAdmin from "../src/pages/Tela Inicial/InicialAdmin";
import Company from "../src/pages/Tela Inicial-Cantina/InicialCompra";
import Identificacao from "../src/pages/Identificacao/Identificacao";
import Valor from "../src/pages/Pagamento/Valor";
import PagamentoQR from "../src/pages/Pagamento/PagamentoQR";

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>

        <Route path="/" element={<Login/>}></Route>
        <Route path="/admin" element={<InicialAdmin/>}></Route>
        <Route path="/inicial-compra" element={<Company/>}></Route>
        <Route path="/identificacao" element={<Identificacao/>}></Route>
        <Route path="/valor" element={<Valor/>}></Route>
        <Route path="/confirmacao" element={<PagamentoQR/>}></Route>
  
      </Routes>
    </Router>
);
}

export default App;
