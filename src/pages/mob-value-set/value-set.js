import React, { Component } from 'react';
import KeypadValue from '../../components/keypad/keyboard-value';
import { Link } from 'react-router-dom';

const Idvalue =() => {
    return(
        <div>
            <a className="home" href="https://www.figma.com/file/r7MfVKvQXP3fIA1ES0ZwNw/Pormade-CD?type=design&node-id=0-1&mode=design&t=bGd2KrkfEwl4xU0Z-0"><img src="https://cdn.discordapp.com/attachments/1141361461516587098/1143165039143034911/icone-de-la-maison-verte.png"></img></a>
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