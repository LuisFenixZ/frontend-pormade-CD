import React from "react";
import "./choice.css";
import Cantina from "../../img-source/logo-cantina/Cantina Logo PetimColor WLP 1.png";

const Admin =() => {
    return(
        
            <div className="container-choice">
                <a className="home-choice" href="https://www.figma.com/file/r7MfVKvQXP3fIA1ES0ZwNw/Pormade-CD?type=design&node-id=0-1&mode=design&t=bGd2KrkfEwl4xU0Z-0"><img src="https://cdn.discordapp.com/attachments/1141361461516587098/1143165039143034911/icone-de-la-maison-verte.png"></img></a>
                <img className="img-logo-choice" src={Cantina}></img>
                <a className="anchor-choice" href="#"><p className="text">Cantina</p></a>
                <a className="anchor-choice" href="#"><p className="text">Gerencia</p></a>
            </div>
        
    );
};

export default Admin;  