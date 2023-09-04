import React from "react";
import "./inicial.css";
import logoCantina from "../../img/Cantina Logo White WLP.png";
import {useNavigate} from 'react-router-dom';

const InicialAdmin =() => {
    const history = useNavigate();

    const avancaTelaEspera = () => {
        history('/inicial-compra');
    }

    return(
        
            <div className="align-inicial-admin">
                {/* <img className="logoCantinaInicial" src={logoCantina}></img> */}
                <button type="submit" className="button-cantina" onClick={avancaTelaEspera}>Cantina</button>
                <button className="button-gerencia">Gerência</button>
            </div>
        
    );
};

export default InicialAdmin;  