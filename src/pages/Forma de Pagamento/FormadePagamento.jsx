import React, {useState, useEffect} from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const FormadePagamento = () => {

    const history = useNavigate();
    const id = useState("")
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const adminToken = localStorage.getItem('adminToken');
                if (!adminToken) {
                    console.error('Token de administrador não encontrado.');
                    return;
                }
        
                const response = await api.get("/paymentmethod", {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
        
                console.log('Resposta da API:', response.data); // Adiciona esta linha para imprimir a resposta no console
        
                if (response.data.paymentmethods && Array.isArray(response.data.paymentmethods)) {
                    const data = response.data.paymentmethods.map(method => ({
                        ...method,
                        id: method.id.toString(), // Converte o ID para string, se necessário
                    }));
                    setPaymentMethods(data);
                } else {
                    console.error('Erro ao buscar métodos de pagamento: Formato de resposta inválido.');
                }
            } catch (error) {
                console.error('Erro ao buscar métodos de pagamento:', error);
            }
        };
        

        fetchPaymentMethods();
    }, []);

    const selecionarFormaPagamento = (formaPagamento) => {
        localStorage.setItem('selectedPaymentMethod', JSON.stringify(formaPagamento));
    };

    const avancatelapagamento = () => {
        history('/confirmacao');
    
    };

    const avancatelapagamentodinheiro = () =>{
        history('/confirmacaocash');
    }

    const handleButtonClick = (method) => {
        const storedPaymentMethod = JSON.parse(localStorage.getItem('selectedPaymentMethod'));

        console.log('ID do Método:', method.id);
        console.log('Método armazenado no localStorage:', storedPaymentMethod);
        // Verifica se o valor correspondente está armazenado
        if (storedPaymentMethod && storedPaymentMethod.id === method.id) {
            // O valor correspondente está armazenado, pode avançar para a próxima etapa
            if (method.method.toLowerCase() === 'pix') {
                avancatelapagamento();
            } else if (method.method.toLowerCase() === 'dinheiro') {
                avancatelapagamentodinheiro();
            }
        } else {
            // Valor não correspondente, você pode mostrar uma mensagem ou tomar outra ação
            console.log('Valor correspondente não encontrado.');
        }
    };

        return(
            <div className="align-inicial-pag">
                {paymentMethods.map((method) => (
                <button
                    key={method.id}
                    type="button"
                    className={`clique button-${method.method.toLowerCase()}`}
                    onClick={() => {
                        selecionarFormaPagamento({ id: method.id, nome: method.method });
                        handleButtonClick(method);
                    }}
                >
                    {method.method}
                </button>
                ))}
            </div>
        )
    }

    export default FormadePagamento;
