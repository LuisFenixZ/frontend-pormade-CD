import React, { Component } from 'react';
import KeypadValue from '../../components/keypad/keyboard-value';
import { Link } from 'react-router-dom';

const Idvalue =() => {
    return(
        <div>
            <Link className="home" to="/welcome"><img src="https://cdn.discordapp.com/attachments/1141361461516587098/1143165039143034911/icone-de-la-maison-verte.png"></img></Link>
                <h1 className='title_id'>Digite o valor a pagar</h1>
                    <div className="container_numpad">
                    <KeypadValue/>
                    </div>
                    <Link to="/payment">
                        <button type="button" className="button_confirm_numpad">Continuar</button>
                    </Link>
        </div>       
    )
};

export default Idvalue;