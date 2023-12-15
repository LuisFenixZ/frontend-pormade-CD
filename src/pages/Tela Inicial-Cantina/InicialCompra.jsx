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
        <div className="flex flex-col justify-center items-center"> 
            <Clock></Clock>
            <img className="logoCantinaInicialCompra" src={logoCantina}></img>
            <button className="button-avan" onClick={avancaDisplay}>Começar</button>
            
        </div>
    );
};

export default InicialCompra;
