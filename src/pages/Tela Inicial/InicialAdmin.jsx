import React from "react";
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
        
            <div className="w-fulll h-[90vh] flex flex-col justify-center items-center gap-10 mx-auto my-auto">
                {/* <img className="logoCantinaInicial" src={logoCantina}></img> */}
                <button className="bg-green1 w-[450px] h-[120px] text-white text-[25px] rounded-[15px] font-primary" onClick={avancaTelaEspera}>Cantina</button>
                <button className="bg-green1 w-[450px] h-[120px] text-white text-[25px] rounded-[15px] font-primary" onClick={avancaTelaGerencia}>Gerência</button>
            </div>
        
    );
};

export default InicialAdmin;  