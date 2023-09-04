import React from "react";
import './../Tela Inicial/inicial.css'
import { useNavigate } from "react-router-dom";

const FormadePagamento = () => {

    const history = useNavigate();

    const avancatelapagamento = () => {
        history('/confirmacao');
    
    };

    const avancatelapagamentodinheiro = () =>{
        history('/confirmacaocash');
    }

        return(
            <div className="align-inicial-admin">
                <button type="submit" className="button-cantina" onClick={avancatelapagamento}>Pix</button>
                <button type="submit"className="button-gerencia" onClick={avancatelapagamentodinheiro}>Dinheiro</button>
            </div>
        )
    }

    export default FormadePagamento;
