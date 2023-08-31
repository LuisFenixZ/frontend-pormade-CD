import React from "react";
import './pagamentoqr.css';
import QrCodePix from "../../img/qrCodeCantina.png";
import { useNavigate } from "react-router-dom";

const PagamentoQR = () => {

    const history = useNavigate();

    const voltaInicio = () => {
        history('/inicial-compra');
    }

    return(
        <div>
            <h1 className="cad__h2__title">Informações de Pagamento</h1>
                <div className="container">
                    <div className="p-text">
                        
                        <p className="info_text">Nome:</p>
                        <p className="info_text">Crachá:</p>
                        <p className="info_text">Valor: R$</p>

                    </div>
                        
                        <img src= {QrCodePix} alt="qr code cantina" className="pix_qrcode"></img>
                </div>
                <button type="button"
                className="button_confirm" onClick={voltaInicio}
                >Confirmar
                </button>

        </div>
    );
};

export default PagamentoQR;