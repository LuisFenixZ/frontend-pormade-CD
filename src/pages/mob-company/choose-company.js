import React from "react";
import './choose-company.css';
import Cantina from "../../img-source/logo-cantina/Cantina Logo PetimColor WLP 1.png";
import Clock from "./clock";

const Company =() => {
    return(
        <div className="container-box borda-animada">
        <h1 className="title">Cantina da 
            Confiança</h1>
            <h3 id="hora" className="clock"></h3>
            <a className="anchor" href="#"><p className="text-play">Começar</p></a>
            <img className="img-logo" src={Cantina}></img>
        </div>
    );
};





export default Company;  