import React, { useState, useEffect } from "react";
import './styles.css';
import Swal from "sweetalert2";
import QrCodePix from "../../img/qrCodeCantina.png";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const PagamentoQR = () => {
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
            console.log('Customer Data from localStorage:', storedCustomerData);
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
    
    const voltaInicio = () => {
        history('/inicial-compra');
    }

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
        
            const { value, paymentMethod, cpf } = customerData;
        
            if (!value || !paymentMethod || !cpf) {
                console.error('Dados do cliente incompletos.');
                return;
            }
            console.log('CPF do cliente:', cpf);
            console.log('Valor da compra:', value);
            console.log('Método de pagamento:', paymentMethod);

            await api.post("/purchase", {
                customerCpf: cpf, 
                value: value,
                paymentMethod: paymentMethod
            }, {
                headers: {
                    Authorization: `Bearer ${customerToken}`, 
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
    
    
    return (
        <div>
            <h1 className="cad__h2__title">Informações de Pagamento</h1>
            <div className="container-pix">
                <div className="p-text-pix">
                    <p className="info_text">Nome: {customerData.name}</p>
                    <p className="info_text">Crachá: {customerData.badge}</p>
                    <p className="info_text">Valor: {parseFloat(customerData.value).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        })}
                    </p>
                    <p className="info_text">Método de Pagamento: {customerData.paymentMethod}</p>
                </div>
                <img src={QrCodePix} alt="qr code cantina" className="pix_qrcode"></img>
            </div>
            <button type="button" className="button_confirm clique" onClick={confirmarCompra}>Confirmar</button>
        </div>
    );
};

export default PagamentoQR;
