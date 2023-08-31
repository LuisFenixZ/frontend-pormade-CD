import React, { useState } from 'react';
import Numpad from '../../components/Keypad/numpad';
import "./identificacao.css";
import { useNavigate } from 'react-router-dom';

function IdentificacaoComponent() {
    const [cpf, setCPF] = useState('');
    const history = useNavigate();

    const avancaValor = () => {
        history('/valor');
    }

    const changeCPF = (numText) => {
        let updatedCPF = cpf;

        if (numText === '<') {
            updatedCPF = updatedCPF.slice(0, -1);
        } else if (numText >= '0' && numText <= '9') {
            updatedCPF += numText;
        }

        if (updatedCPF.length > 11) {
            updatedCPF = updatedCPF.slice(0, 11);
        }

        setCPF(updatedCPF);
    };

    const formattedCPF = cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return (
        <main>
            <h1 className="payment__h1__title">Identificação</h1>
            <h2 className="payment__h2__title">Digite o Número do seu CPF:</h2>
            <div>
                <div className='display-keyboard'>
                    <div className='align-display'>
                        <div className='result'>
                            {formattedCPF || '0'}
                        </div>
                        <div>
                            <Numpad onKeyPress={changeCPF} />
                        </div>
                    </div>
                </div>
                <button className="button-continue" onClick={avancaValor}>Continuar</button>
            </div>
        </main>
    );
}

export default IdentificacaoComponent;
