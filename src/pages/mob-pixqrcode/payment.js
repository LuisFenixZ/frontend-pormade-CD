import React from "react";
import './payment.css';
import QrCodePix from "../../../src/img-source/qrcode-pix/Qr Pix Cantina White.png";

const Payment =() => {
    return(
        <div className="container">
            <h1 className="title">Cantina da Confiança</h1>
                <p className="info_text">Nome:</p>
                <p className="info_text">Crachá:</p>
                <p className="info_text">Valor: R$</p>
                <img src= {QrCodePix} className="pix_qrcode"></img>
                <button className="button_confirm">Confirmar</button>

        </div>
    );
};

export default Payment;