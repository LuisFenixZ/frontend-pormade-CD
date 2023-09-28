import React, { useState, useEffect } from 'react';
import './relatorio.css';
import api from '../../services/api';

const Relatorio = () => {

  const [purchases, setPurchases] = useState([]);
  const [month, setMonth] = useState(9); 
  const [year, setYear] = useState(2023); 

  useEffect(() => {
    async function fetchData() {
      try {
        
        const adminToken = localStorage.getItem('adminToken'); 
        console.log('Token de Administrador:', adminToken);

        if (!adminToken) {
          console.error('Token de administrador não encontrado.');
          return;
        }

        const headers = {
          Authorization: `Bearer ${adminToken}`,
        };

        const response = await api.get(`/purchases/month=${month}/year=${year}`, {
          headers,
        });

        const responseData = response.data;

        if (responseData && responseData.purchases) {
          setPurchases(responseData.purchases);
        } else {
          console.error('Dados de compras não encontrados na resposta.');
        }

        console.log(responseData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchData();
  }, [month, year]);

  function formatDateTime(dateTime) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
  
    const utcDate = new Date(dateTime);
    utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
  
    return utcDate.toLocaleString(undefined, options);
  }

  return (
    <div>
      <h1 className="h1_table_title">Registro de Compras</h1>
      <div className="table_style">
        <table className='table_align'>
          <thead>
            <tr className='tr_title'>
              <th className="th_title">ID</th>
              <th className="th_title">Valor</th>
              <th className="th_title">Nome da Cantina</th>
              <th className="th_title">CPF do Cliente</th>
              <th className="th_title">Data</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr className='tr_title2' key={purchase.id}>
                <td className='td_title1'>{purchase.id}</td>
                <td className='td_title2'>{purchase.value}</td>
                <td className='td_title3'>{purchase.customerName}</td>
                <td className='td_title4'>{purchase.customerCpf}</td>
                <td className='td_title5'>{formatDateTime(purchase.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Relatorio;
