import React, { Component } from 'react';
import Keypad from '../../components/keypad/keyboard';
import { Link } from 'react-router-dom';

const Idset =() => {
    return(
        <div>
            <Link className="home" to="/welcome"><img src="https://cdn.discordapp.com/attachments/1141361461516587098/1143165039143034911/icone-de-la-maison-verte.png"></img></Link>
                <h1 className='title_id'>Digite seu CPF</h1>
                    <div className="container_numpad">
                    <Keypad/>
                    </div>
                    <Link to="/idvalue">
                        <button type="button" className="button_confirm_numpad">Continuar</button>
                    </Link>
                
        </div>       
    )
};  

export default Idset;