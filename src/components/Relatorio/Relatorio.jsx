import React, { useState, useEffect } from 'react';
import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import './relatorio.css';
import api from '../../services/api';
pdfMake.vfs = pdfMake.vfs;
import Calendario from './Calendario'; // Importe o componente Calendario aqui


const Relatorio = () => {

  const [purchases, setPurchases] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mês atual como valor padrão
  const [year, setYear] = useState(new Date().getFullYear()); // Ano atual como valor padrão

  useEffect(() => {
    async function fetchData() {
      try {
        if (month !== null && year !== null) { // Verifica se month e year não são nulos
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
            setPurchases([]);
            console.warn('Nenhum registro encontrado para o mês selecionado.');
          }

          console.log(responseData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setPurchases([]);
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

  const generatePdf = () => {
    const docDefinition = {
      content: [
        {
          text: 'Relatório de Compras',
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Valor', 'Nome do Colaborador', 'CPF do Colaborador', 'Crachá', 'Data'],
              ...purchases.map((purchase) => [
                purchase.id,
                purchase.value,
                purchase.customerName,
                purchase.customerCpf,
                purchase.customerBadge,
                formatDateTime(purchase.date),
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
      },
    };
  
    pdfMake.createPdf(docDefinition).open(); // Abre o PDF em uma nova guia
    // pdfMake.createPdf(docDefinition).download('relatorio.pdf'); // Faz o download do PDF com o nome "relatorio.pdf"
  };
  
  const handleCalendarChange = (selectedMonth, selectedYear) => {
    setMonth(selectedMonth);
    setYear(selectedYear);
  };

  const months = [
    { value: 1, name: 'Janeiro' },
    { value: 2, name: 'Fevereiro' },
    { value: 3, name: 'Março' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Maio' },
    { value: 6, name: 'Junho' },
    { value: 7, name: 'Julho' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Setembro' },
    { value: 10, name: 'Outubro' },
    { value: 11, name: 'Novembro' },
    { value: 12, name: 'Dezembro' },
  ];

  return (
    <div className='container2'>
      <h1 className="h1_table_title">Registro de Compras do mês: {months.find(m => m.value === month)?.name}</h1>
      <div className='date_select'>
        <div>
          <Calendario onChange={handleCalendarChange} />
        </div>
        <div>
          <button onClick={generatePdf}>Gerar PDF</button>
        </div>

      </div>
      <div className='table_style'>
        <table className="table_align">
          <thead>
            <tr className='tr_title'>
              <th className="th_title">ID</th>
              <th className="th_title">Valor</th>
              <th className="th_title">Nome da Colaborador</th>
              <th className="th_title">CPF do Colaborador</th>
              <th className="th_title">Crachá</th>
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
                <td className='td_title4'>{purchase.customerBadge}</td>
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