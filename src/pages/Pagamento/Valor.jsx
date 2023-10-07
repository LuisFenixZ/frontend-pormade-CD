import React, { useState, useEffect } from 'react';
import './value.css';
import Numpad from '../../components/Keypad/numpad';
import { useNavigate } from 'react-router-dom';

function formatCurrencyValue(value) {
    return `R$ ${value}`;
}

function KeypadValueComponent() {
    const [cents, setCents] = useState(0);
    const history = useNavigate();

    // Esta função useEffect observará a variável 'cents' e atualizará o valor no localStorage sempre que 'cents' mudar.
    useEffect(() => {
        // Converte centavos em reais (R$) e armazena no localStorage
        localStorage.setItem('value', (cents / 100).toFixed(2));
        console.log('Valor no localStorage:', (cents / 100).toFixed(2));
    }, [cents]);

    const avancaPag = () => {
        history('/forma-pagamento');
    }

    const changeValue = (numText) => {
        let updatedCents = cents;

        if (numText === '<') {
            updatedCents = Math.floor(updatedCents / 10);
        } else if (numText >= '0' && numText <= '9') {
            updatedCents = updatedCents * 10 + parseInt(numText, 10);
        }

        setCents(updatedCents);
    };

    const formattedValue = formatCurrencyValue((cents / 100).toFixed(2));

    return (
        <main>
            <h1 className="value__h1__title">Digite o valor a pagar:</h1>
            <div>
                <div className='display-keyboard'>
                    <div className='align-display'>
                        <div className='result'>
                            {formattedValue}
                        </div>
                        <div>
                            <Numpad onKeyPress={changeValue} />
                        </div>
                    </div>
                </div>
                <button className="payment-continue" onClick={avancaPag}>Continuar</button>
            </div>
        </main>
    );
}

export default KeypadValueComponent;
