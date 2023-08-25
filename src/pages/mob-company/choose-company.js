import React from "react";
import './choose-company.css';
import Cantina from "../../img-source/logo-cantina/Cantina Logo PetimColor WLP 1.png";
import Clock from "./clock";
import { Link } from "react-router-dom";

const Company =() => {
    return(
        <div className="container-box borda-animada">
        <h1 className="title">Cantina da 
            Confiança</h1>
            <h3 id="hora" className="clock"></h3>
            <Link className="anchor" to="/idset"><p className="text-play">Começar</p></Link>
            <img className="img-logo" src={Cantina}></img>
        </div>
    );
};





export default Company;  