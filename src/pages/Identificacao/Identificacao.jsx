import React, { useState } from 'react';
import Numpad from '../../components/Keypad/numpad';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function IdentificacaoComponent() {
    const [cpf, setCPF] = useState('');
    const history = useNavigate();

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

    const avancaValor = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
    
            if (!adminToken) {
                console.error('Token de administrador não encontrado.');
                return;
            }
    
            const response = await api.get(`/customer/cpf=${cpf}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
    
            console.log('CPF:', cpf);
            console.log('Dados retornados:', response.data);
    
            if (response.data) {
                const { name, badge } = response.data;
            
                const customerData = {
                    cpf: cpf,
                    name: name,
                    badge: badge,
                    ...response.data.customer,
                };
            
                console.log('Dados do cliente antes de armazenar:', customerData);
                localStorage.setItem('customerData', JSON.stringify(customerData));
            
                const welcomeMessage = name ? `Bem vindo ${name}!` : 'Bem vindo!';
                
                Swal.fire({
                    title: welcomeMessage,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            
                history('/valor');
            } else {
                console.error('CPF não encontrado.');
                Swal.fire('CPF não existente!', 'Por favor, digite um cpf válido!', 'error');
            }
            
        } catch (error) {
            console.error('Erro ao verificar CPF:', error);
            Swal.fire('CPF não existente!', 'Por favor, digite um CPF válido!', 'error')
        }
    };
    

    const formattedCPF = cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return (
        <div className='flex flex-col justify-center items-center gap-6'>
            <h2 className="text-white text-[35px] text-center font-primary mt-10">Digite o Número do seu CPF:</h2>
            <div className='flex flex-col justify-center items-center w-[80%] border-2 border-green2 rounded-[10px]'>
                <div className='w-[90%] flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center w-[90%] h-[80px] text-white text-[50px] border-2 border-green2 rounded-[10px] mt-5'>
                        {formattedCPF || '0'}
                    </div>
                    <div className='flex justify-center items-center'>
                        <Numpad onKeyPress={changeCPF} />
                    </div>
                </div>
            </div>
            <button className="flex justify-center items-center w-[80%] h-[120px] text-white text-[30px] font-primary bg-green2 rounded-[10px]" onClick={avancaValor}>Continuar</button>
        </div>
    );
}

export default IdentificacaoComponent;
