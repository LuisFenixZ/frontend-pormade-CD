import React from "react";
import './styles.css'
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
            <div className="align-inicial-pag">
                <button type="submit" className="button-pix clique" onClick={avancatelapagamento}>Pix</button>
                <button type="submit"className="button-dinheiro clique" onClick={avancatelapagamentodinheiro}>Dinheiro</button>
            </div>
        )
    }

    export default FormadePagamento;
