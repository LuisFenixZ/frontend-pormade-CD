import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
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
import { AuthProvider } from "./contexts/useAuth";
import { PrivateRoute } from "./PrivaterRoutes";

function AppRoutes() {

  const Layout = ({ children }) => (
    <>
      <NavBar/>
      {children}
    </>
  );

  return (
      <Router>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login/>}></Route>

            <Route element={<PrivateRoute/>}>
              <Route path="/admin/*" element={<Layout><InicialAdmin/></Layout>}></Route>
              <Route path="/gerencia/*" element={<Layout><Gerencia/></Layout>}></Route>
              <Route path="/inicial-compra/*" element={<Layout><InicialCompra/></Layout>}></Route>
              <Route path="/identificacao/*" element={<Layout><Identificacao/></Layout>}></Route>
              <Route path="/valor/*" element={<Layout><Valor/></Layout>}></Route>
              <Route path="/forma-pagamento/*" element={<Layout><FormadePagamento/></Layout>}></Route>
              <Route path="/confirmacao/*" element={<Layout><PagamentoQR/></Layout>}></Route>
              <Route path="/confirmacaocash/*" element={<Layout><PagamentoCash/></Layout>}></Route>         
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default AppRoutes;