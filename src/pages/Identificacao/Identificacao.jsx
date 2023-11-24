import React, { useState } from 'react';
import Numpad from '../../components/Keypad/numpad';
import "../../components/Keypad/styles.css";
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
            // Obtenha o token de administrador do localStorage
            const adminToken = localStorage.getItem('adminToken');
    
            // Verifique se o token de administrador existe
            if (!adminToken) {
                console.error('Token de administrador não encontrado.');
                return;
            }
    
            // Faça a solicitação para verificar o CPF
            const response = await api.get(`/customer/cpf=${cpf}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
    
            // Adicione este console.log para verificar os dados retornados
            console.log('CPF:', cpf);
            console.log('Dados retornados:', response.data);
    
            // Verifique se o CPF existe na resposta
            if (response.data.customer) {
                // Crie um objeto de dados do cliente que inclui o CPF
                const customerData = {
                    cpf: cpf,
                    ...response.data.customer,
                };
    
                // Armazene os dados do cliente no localStorage
                console.log('Dados do cliente antes de armazenar:', customerData);
                localStorage.setItem('customerData', JSON.stringify(customerData));

                Swal.fire({title: `Bem vindo ${customerData.name}!`, 
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false});
                // Redirecione para a próxima página (por exemplo, "/valor")
                history('/valor');
            } else {
                // Trate o caso em que o CPF não existe

                console.error('CPF não encontrado.');
                Swal.fire('CPF não existente!', 'Por favor, digite um cpf válido!', 'error')
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
        <main>
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
