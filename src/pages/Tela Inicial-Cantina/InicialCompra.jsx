import React from "react";
import './styles.css';
import logoCantina from "../../img/logo preta folha branca.png";
import Clock from "./clock";
import {useNavigate} from 'react-router-dom';

const InicialCompra = () => {
    const history = useNavigate();

    const avancaDisplay = () => {
        history('/identificacao')
    }

    return(       
        <div className="company-align"> 
            {/* <h1 className="company__h1__title animated-heading">Cantina da Confiança</h1> */}
            <Clock></Clock>
            <img className="logoCantinaInicialCompra" src={logoCantina}></img>
            <button className="button-avan" onClick={avancaDisplay}>Começar</button>
            
        </div>
    );
};

export default InicialCompra;
