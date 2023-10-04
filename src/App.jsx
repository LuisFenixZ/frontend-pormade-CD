import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './index.css';
import NavBar from "./components/NavBar/NavBar";
import InicialCompra from "./pages/Tela Inicial-Cantina/InicialCompra";
import Login from "./pages/Login/Login";
import InicialAdmin from "./pages/Tela Inicial/InicialAdmin";
import Identificacao from "./pages/Identificacao/Identificacao";
import Valor from "./pages/Pagamento/Valor";
import FormadePagamento from "./pages/Forma de Pagamento/FormadePagamento";
import PagamentoQR from "./pages/Pagamento/PagamentoQR";
import PagamentoCash from "./pages/Pagamento/PagamentoCash";
import Gerencia from "./pages/Gerencia/Gerencia";


function App() {

  return (
   <main>
    <div>
  
      <Router>
        <NavBar>
        </NavBar>
          <Routes>

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/admin" element={<InicialAdmin/>}></Route>
            <Route path="/gerencia" element={<Gerencia/>}></Route>
            <Route path="/inicial-compra" element={<InicialCompra/>}></Route>
            <Route path="/identificacao" element={<Identificacao/>}></Route>
            <Route path="/valor" element={<Valor/>}></Route>
            <Route path="/forma-pagamento" element={<FormadePagamento/>}></Route>
            <Route path="/confirmacao" element={<PagamentoQR/>}></Route>
            <Route path="/confirmacaocash" element={<PagamentoCash/>}></Route>
      
          </Routes>
      </Router>
    
    </div>
  </main>
);
}

export default App;