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
        <div className="w-full h-[90vh] flex flex-col justify-center items-center gap-14"> 
            <Clock></Clock>
            <img className="w-[70%] md:w-[70%] xl:w-[20%]" src={logoCantina}></img>
            <button className="w-[70%] h-[150px] md:w-[70%] xl:w-[20%] md:h-[200px] xl:h-[130px] bg-green1 rounded-[15px] text-white text-[30px] font-primary button-animation" onClick={avancaDisplay}>Começar</button>
            
        </div>
    );
};

export default InicialCompra;
