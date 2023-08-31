import React from "react";
import './inicial-compra.css';
import logoCantina from "../../img/Cantina Logo White WLP.png";
import Clock from "./clock";
import {useNavigate} from 'react-router-dom';

const InicialCompra = () => {
    const history = useNavigate();

    const avancaDisplay = () => {
        history('/identificacao')
    }

    return(
        <body className="body_animation1">
            <h1 className="company__h1__title animated-heading">Cantina da Confiança</h1>
            <div className="company-align"> 
            
                <Clock></Clock>
                <img className="logoCantinaInicialCompra" src={logoCantina}></img>
                <button className="button-avan" onClick={avancaDisplay}>Começar</button>
                
            </div>
        </body>
    );
};

export default InicialCompra;
