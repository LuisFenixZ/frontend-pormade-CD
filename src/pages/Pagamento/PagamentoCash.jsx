import React from "react";
import { useState, useEffect } from "react";
import './styles.css';
import Swal from "sweetalert2";
import Logo from "../../img/logo preta folha branca.png";
import api from '../../services/api';
import { useNavigate } from "react-router-dom";

const PagamentoCash = () => {

    const history = useNavigate();

    const [customerData, setCustomerData] = useState({
        name: "",
        badge: "",
        value: 0,
        cpf: "",
        paymentMethod: null
    });

    useEffect(() => {
        const storedCustomerData = JSON.parse(localStorage.getItem('customerData'));
    
        if (storedCustomerData) {
            setCustomerData(storedCustomerData);
            const storedValue = parseFloat(localStorage.getItem('value')) || 0;
            setCustomerData(prevCustomerData => ({
                ...prevCustomerData,
                value: storedValue,
            }));
        } else {
            console.error('Dados do cliente não encontrados no localStorage.');
            Swal.fire({
                title: 'Não foi possível fazer a compra!',
                text: 'Nenhum dado encontrado!',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false,
            });
            history('/inicial-compra');
        }

        const storedPaymentMethod = JSON.parse(localStorage.getItem('selectedPaymentMethod'));
        setCustomerData(prevCustomerData => ({
            ...prevCustomerData,
            paymentMethod: storedPaymentMethod?.nome || null,
        }));
    }, []);

    const confirmarCompra = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
        
            if (!adminToken) {
                console.error('Token de administrador não encontrado.');
                return;
            }
        
            const response = await api.post("/canteen/customer", {}, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        
            const { customerToken } = response.data;
        
            // Obtenha o CPF e o valor do cliente a partir dos dados do cliente
            const { value, paymentMethod, cpf } = customerData;
        
            if (!value || !paymentMethod || !cpf) {
                console.error('Dados do cliente incompletos.');
                return;
            }
            console.log('CPF do cliente:', cpf);
            console.log('Valor da compra:', value);
            console.log('Método de pagamento:', paymentMethod);
            // Faça a solicitação para registrar a compra usando o token de consumidor
            await api.post("/purchase", {
                customerCpf: cpf, // Use o CPF do cliente
                value: value,
                paymentMethod: paymentMethod

            }, {
                headers: {
                    Authorization: `Bearer ${customerToken}`, // Adicione o token de consumidor
                },
            });
        
            console.log('Compra registrada com sucesso.');
            console.log('CPF do cliente:', cpf);
            console.log('Valor da compra:', value);
            console.log('Método de pagamento:', paymentMethod);

            await Swal.fire({
                title: 'Compra Realizada',
                text: 'Pagamento registrado com sucesso!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
            });

            localStorage.removeItem('customerData');

            localStorage.removeItem(customerToken);
        
            history('/inicial-compra');
        } catch (error) {
            console.error('Erro ao registrar a compra:', error);
        }
    }

    // const handleConfirmCompra = async () => {
    //     const result = await Swal.fire({
    //         title: 'Confirmar Compra',
    //         text: 'Deseja realmente confirmar pagamento?',
    //         icon: 'question',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Sim',
    //         cancelButtonText: 'Não',
    //     });
    
    //     if (result.isConfirmed) {
    //         confirmarCompra();
    //     }
    // };

    return(
        <div>
            <h1 className="cad__h2__title">Informações de Pagamento</h1>

                <div className="container">

                    <div className="p-text">
                        
                        <p className="info_text">Nome: {customerData.name}</p>
                        <p className="info_text">Crachá: {customerData.badge}</p>
                        <p className="info_text">Valor: {parseFloat(customerData.value).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        })}
                        </p>
                        <p className="info_text">Método de Pagamento: {customerData.paymentMethod}</p>
                    </div>
                    <img src= {Logo} alt="qr code cantina" className="pix_qrcode"></img>
                </div>

                <button type="button"
                    className="button_confirm clique" onClick={confirmarCompra}
                        >Confirmar
                </button>

        </div>
    );
};

export default PagamentoCash;