import React from "react";
import "./generate-report.css";
import Cantina from "../../img-source/logo-cantina/Cantina Logo PetimColor WLP 1.png";

const Report =() => {
    return(
        
            <div className="container-report">
                <a className="home-report" href="https://www.figma.com/file/r7MfVKvQXP3fIA1ES0ZwNw/Pormade-CD?type=design&node-id=0-1&mode=design&t=bGd2KrkfEwl4xU0Z-0"><img src="https://cdn.discordapp.com/attachments/1141361461516587098/1143165039143034911/icone-de-la-maison-verte.png"></img></a>
                <img className="img-logo-report" src={Cantina}></img>
                <a className="anchor-report" href="#"><p className="text">Gerar relatório</p></a>
            </div>
        
    );
};

export default Report;  