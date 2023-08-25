import React from "react";
import './payment.css';
import QrCodePix from "../../../src/img-source/qrcode-pix/Qr Pix Cantina White.png";
import { Link } from "react-router-dom";

const Payment =() => {
    return(
        <div>
            <Link className="home" to="/welcome"><img src="https://cdn.discordapp.com/attachments/1141361461516587098/1143165039143034911/icone-de-la-maison-verte.png"></img></Link>
            <h1 className="cad__h2__title">Cantina da Confiança</h1>
                <div className="container">
                        <p className="info_text">Nome:</p>
                        <p className="info_text">Crachá:</p>
                        <p className="info_text">Valor: R$</p>
                        <img src= {QrCodePix} className="pix_qrcode"></img>
                </div>
                <Link to="/welcome">
                        <button type="button" className="button_confirm_numpad">Confirmar</button>
                </Link>

        </div>
    );
};

export default Payment;