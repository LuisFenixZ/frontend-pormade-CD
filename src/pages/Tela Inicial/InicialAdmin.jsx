import React from "react";
import "./styles.css";
import logoCantina from "../../img/logo preta folha branca.png";
import {useNavigate} from 'react-router-dom';

const InicialAdmin =() => {
    const history = useNavigate();

    const avancaTelaEspera = () => {
        history('/inicial-compra');
    }

    const avancaTelaGerencia = () => {
        history('/gerencia');
    }
    return(
        
            <div className="align-inicial-admin">
                {/* <img className="logoCantinaInicial" src={logoCantina}></img> */}
                <button type="submit" className="button-cantina" onClick={avancaTelaEspera}>Cantina</button>
                <button className="button-gerencia" onClick={avancaTelaGerencia}>Gerência</button>
            </div>
        
    );
};

export default InicialAdmin;  