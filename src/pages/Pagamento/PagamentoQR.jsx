import React, { useState, useEffect } from "react";
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
        <div className="md:w-[90%] md:h-[90vh] xl:w-[20%] xl:h-[90vh] flex flex-col justify-center items-center gap-10 mx-auto my-auto md:mt-4 xl:mt-1">
            <h1 className="text-white md:text-[30px] xl:text-[25px] md:mt-4 font-primary">Informações de Pagamento</h1>
            <div className="w-[100%] flex flex-col justify-center items-center border-2 border-green2 rounded-[10px] p-4">
                <div className="md:w-[90%] xl:w-[70%] flex flex-col float-left">
                    <p className="text-white md:text-[20px] xl:text-[18px] font-primary">Nome: {customerData.name}</p>
                    <p className="text-white md:text-[20px] xl:text-[18px] font-primary">Crachá: {customerData.badge}</p>
                    <p className="text-white md:text-[20px] xl:text-[18px] font-primary">Valor: {parseFloat(customerData.value).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        })}
                    </p>
                    <p className="text-white text-[20px] xl:text-[18px] font-primary">Método de Pagamento: {customerData.paymentMethod}</p>
                </div>
                <img src={QrCodePix} alt="qr code cantina" className="md:w-[90%] xl:w-[70%] md:m-4 xl:m-2"></img>
            </div>
            <button type="button" className="md:w-[100%] xl:w-[100%] md:h-[150px] xl:h-[100px] rounded-[10px] bg-green1 text-white text-[30px] font-primary" onClick={confirmarCompra}>Confirmar</button>
        </div>
    );
};

export default PagamentoQR;
