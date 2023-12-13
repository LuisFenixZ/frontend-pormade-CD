import React, { useState, useEffect } from 'react';
import "../../components/Keypad/styles.css";
import Numpad from '../../components/Keypad/numpad';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function formatCurrencyValue(value) {
    return `R$ ${value}`;
}

function KeypadValueComponent() {
    const [cents, setCents] = useState(0);
    const history = useNavigate();

    useEffect(() => {
        localStorage.setItem('value', (cents / 100).toFixed(2));
        console.log('Valor no localStorage:', (cents / 100).toFixed(2));
        if (cents > 0) {
            return;
        } else if (cents !== 0){
            Swal.fire('Valor não informado!', 'Por favor, digite um valor para prosseguir!', 'error');
        }
    }, [cents]);

    const avancaPag = () => {
        if (cents > 0) {
            history('/forma-pagamento');
        } else {
            Swal.fire('Valor não informado!', 'Por favor, digite um valor para prosseguir!', 'error');
        }
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
            <h1 className="payment__h2__title">Digite o valor a pagar:</h1>
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
                <button className="button-continue" onClick={avancaPag}>Continuar</button>
            </div>
        </main>
    );
}

export default KeypadValueComponent;
