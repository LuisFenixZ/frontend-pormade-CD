import React from "react";
import './payment.css';
import QrCodePix from "../../../src/img-source/qrcode-pix/Qr Pix Cantina White.png";

const Payment =() => {
    return(
        <div className="container">
            <a className="home" href="https://www.figma.com/file/r7MfVKvQXP3fIA1ES0ZwNw/Pormade-CD?type=design&node-id=0-1&mode=design&t=bGd2KrkfEwl4xU0Z-0"><img src="https://cdn.discordapp.com/attachments/1141361461516587098/1143165039143034911/icone-de-la-maison-verte.png"></img></a>
            <h1 className="title">Cantina da Confiança</h1>
                <p className="info_text">Nome:</p>
                <p className="info_text">Crachá:</p>
                <p className="info_text">Valor: R$</p>
                <img src= {QrCodePix} className="pix_qrcode"></img>

        </div>
    );
};

export default Payment;