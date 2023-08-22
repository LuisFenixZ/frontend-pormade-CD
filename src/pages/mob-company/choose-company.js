import React from "react";
import './choose-company.css';
import Cantina from "../../img-source/logo-cantina/Cantina Logo PetimColor WLP 1.png";



const Company =() => {
    return(
        <div className="container">
        <h1 className="title">Cantina da 
            Confiança</h1>
            <h3 className="subtitle">Selecione a empresa</h3>
            <a className="anchor" href="#"><p className="text">Pormade</p></a>
            <a className="anchor" href="#"><p className="text">DRZ</p></a>
            <img className="img-logo" src={Cantina}></img>
        </div>
    );
};

export default Company;  