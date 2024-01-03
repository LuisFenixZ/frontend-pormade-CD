import React, { useState, useEffect } from 'react';
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
        <div className='flex flex-col justify-center items-center gap-6'>
            <h1 className="text-white text-[35px] text-center font-primary mt-2 md:mt-10 xl:mt-10">Digite o valor a pagar:</h1>
            <div className='flex flex-col justify-center items-center w-[70%] border-2 border-green2 rounded-[10px] mt-[-14px]'>
                <div className='w-[100%] flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center w-[90%] h-[80px] text-white text-[50px] border-2 border-green2 rounded-[10px] mt-3 md:mt-5 xl:mt-5'>
                        {formattedValue}
                    </div>
                    <div className='flex justify-center items-center'>
                        <Numpad onKeyPress={changeValue} />
                    </div>
                </div>
            </div>
            <button className="flex justify-center items-center w-[70%] h-[100px] md:w-[70%] md:h-[120px] xl:w-[70%] xl:h-[120px] text-white text-[30px] font-primary bg-green2 rounded-[10px]" onClick={avancaPag}>Continuar</button>
        </div>
    );
}

export default KeypadValueComponent;
