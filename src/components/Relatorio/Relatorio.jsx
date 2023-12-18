import React, { useState, useEffect } from 'react';
import pdfMake from '../PdfConfig/pdfmakeConfig';
import api from '../../services/api';

import Calendario from './Calendario'; 

const Relatorio = () => {

  const [purchases, setPurchases] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); 
  const [year, setYear] = useState(new Date().getFullYear()); 
  const [pdfSrc, setPdfSrc] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  async function fetchData() {
    try {
      if (month !== null && year !== null) {
        console.log('Month:', month);
        console.log('Year:', year);
 
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

        if (responseData) {
          setPurchases(responseData);

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

  useEffect(() => {
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
          text: `Relatório de Compras do mês de ${months.find(m => m.value === month)?.name}`,
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Valor', 'Método de Pagamento', 'Nome do Colaborador', 'CPF do Colaborador', 'Crachá', 'Data - Hora'],
              ...purchases.map((purchase) => [
                purchase.id,
                purchase.value ? (
                  parseFloat(purchase.value.replace('$', '').replace(',', '.')).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                ) : '',
                purchase.paymentMethod,
                purchase.customerName,
                purchase.customerCpf,
                purchase.customerBadge,
                formatDateTime(purchase.date),
              ]),
              ['Total', purchases.length > 0 && purchases[0].totalValue ? (
                purchases[0].totalValue.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              ) : '', '', '', '', '', '']
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
  
    pdfMake.createPdf(docDefinition).open(''); // Abre o PDF em uma nova guia
    pdfMake.createPdf(docDefinition).download(`relatórioCantina${months.find(m => m.value === month)?.name}`);
    // pdfMake.createPdf(docDefinition).download('relatorio.pdf'); // Faz o download do PDF com o nome "relatorio.pdf"
  };

  const closePdf = () => {
    setPdfSrc(null);
    setIsPdfOpen(false);
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

  const downloadExcelSheet = async () => {
    const adminToken = localStorage.getItem('adminToken');

    try {
      const response = await api.get(`/purchases/sheet?month=${month}&year=${year}`, {
        responseType: 'blob', 
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatórioCantina${months.find(m => m.value === month)?.name}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Falha ao baixar a planilha.');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  };
  

  return (
    <div className='flex flex-col justify-center items-center w-[100%] p-2'>
      <h1 className="text-white text-center text-[30px] font-primary">Registro de compras {months.find(m => m.value === month)?.name} de {year}</h1>
      <hr className='w-[35%] h-[1px] bg-green2 mt-4 mb-4 border-none'></hr>
      <div className='flex flex-row justify-between items-center w-[95%] h-[40px] gap-14'>
        <div>
          <Calendario onChange={handleCalendarChange} />
        </div>
        <div>
          <button className="w-[175px] h-[40px] text-white text-[15px] font-primary bg-green1 border-2 border-green2 rounded-[5px]" onClick={generatePdf}>Download PDF</button>
          <button className="w-[175px] h-[40px] text-white text-[15px] font-primary bg-green1 border-2 border-green2 rounded-[5px] ml-[25px]" onClick={downloadExcelSheet}>Download Excel</button>
        </div>

      </div>
      <div className='w-[95%] h-[600px] m-8'>
        <table className="w-[100%]">
          <thead>
            <tr className='inherit top-0 z-10'>
              <th className="bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2">ID</th>
              <th className="bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2">Valor</th>
              <th className="bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2">Método de Pagamento</th>
              <th className="bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2">Nome da Colaborador</th>
              <th className="bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2">CPF do Colaborador</th>
              <th className="bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2">Crachá</th>
              <th className="bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2">Data - Hora</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr className='tr_title2' key={purchase.id}>
                <td className='bg-grey5 text-white text-center font-primary p-3 border-b-[1px] border-grey3'>{purchase.id}</td>
                <td className='bg-grey5 text-white text-center font-primary p-3 border-b-[1px] border-grey3'>
                  {purchase.value ? (
                    parseFloat(purchase.value.replace('$', '').replace(',', '.')).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  ) : ''}
                </td>
                <td className='bg-grey5 text-white text-center font-primary p-3 border-b-[1px] border-grey3'>{purchase.paymentMethod}</td>
                <td className='bg-grey5 text-white text-center font-primary p-3 border-b-[1px] border-grey3'>{purchase.customerName}</td>
                <td className='bg-grey5 text-white text-center font-primary p-3 border-b-[1px] border-grey3'>{purchase.customerCpf}</td>
                <td className='bg-grey5 text-white text-center font-primary p-3 border-b-[1px] border-grey3'>{purchase.customerBadge}</td>
                <td className='bg-grey5 text-white text-center font-primary p-3 border-b-[1px] border-grey3'>{formatDateTime(purchase.date)}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr className='inherit bottom-0 z-100 border-t-3 bg-grey3'>
            <th className='bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2'>Total</th>
              <th className='bg-grey5 text-white text-[20px] font-primary'>
                {purchases.length > 0 && purchases[0].totalValue ? (
                    parseFloat(purchases[0].totalValue.replace('$', '').replace(',', '.')).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  ) : ''}
                <hr className='w-[70%] h-[1px] bg-green2 mt-1 ml-auto mb-1 mr-auto border-none'></hr>
              </th>
              <th className='bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2'></th>
              <th className='bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2'></th>
              <th className='bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2'></th>
              <th className='bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2'></th>
              <th className='bg-grey3 bg-opacity-100 text-white text-[20px] font-primary p-2'></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Relatorio;
