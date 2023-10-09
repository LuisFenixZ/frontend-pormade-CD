import React, { useState, useEffect } from 'react';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import './relatorio.css';
import api from '../../services/api';

import Calendario from './Calendario'; // Importe o componente Calendario aqui

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
};

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Relatorio = () => {

  const [purchases, setPurchases] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mês atual como valor padrão
  const [year, setYear] = useState(new Date().getFullYear()); // Ano atual como valor padrão
  const [pdfSrc, setPdfSrc] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

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
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Valor', 'Nome do Colaborador', 'CPF do Colaborador', 'Crachá', 'Data - Hora'],
              ...purchases.map((purchase) => [
                purchase.id,
                purchase.value ? (
                  parseFloat(purchase.value.replace('$', '').replace(',', '.')).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                ) : '',
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
              ) : '', '', '', '', '']
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

  const viewPdf = () => {
    const docDefinition = {
      content: [
        {
          text: `Relatório de Compras do mês de ${months.find(m => m.value === month)?.name}`,
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Valor', 'Nome do Colaborador', 'CPF do Colaborador', 'Crachá', 'Data - Hora'],
              ...purchases.map((purchase) => [
                purchase.id,
                purchase.value ? (
                  parseFloat(purchase.value.replace('$', '').replace(',', '.')).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                ) : '',
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
              ) : '', '', '', '', '']
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

    const pdfDoc = pdfMake.createPdf(docDefinition);

    if (isPdfOpen) {
      closePdf();
    } else {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBlob((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setPdfSrc(objectURL);
        setIsPdfOpen(true);
      });
    }

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
      const response = await api.get(`/purchases/sheet/month=${month}/year=${year}`, {
        responseType: 'blob', // Indica que a resposta é um blob (arquivo)
        headers: {
          Authorization: `Bearer ${adminToken}`, // Inclua o token de administração no cabeçalho
        },
      });
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatórioCantina${months.find(m => m.value === month)?.name}.xlsx`; // Especifique o nome do arquivo aqui
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
    <div className='container2'>
      <h1 className="h1_table_title">Registro de compras {months.find(m => m.value === month)?.name} de {year}</h1>
      <hr className='hr_line2'></hr>
      <div className='date_select'>
        <div>
          <Calendario onChange={handleCalendarChange} />
        </div>
        <div>
          {/* <button className="relatorio" onClick={viewPdf}>{isPdfOpen ? 'Fechar Visualização' : 'Visualizar PDF'}</button> */}
          <button className="download" onClick={generatePdf}>Download PDF</button>
          <button className="download2" onClick={downloadExcelSheet}>Download Excel</button>
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
              <th className="th_title">Data - Hora</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr className='tr_title2' key={purchase.id}>
                <td className='td_title1'>{purchase.id}</td>
                <td className='td_title2'>
                  {purchase.value ? (
                    parseFloat(purchase.value.replace('$', '').replace(',', '.')).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  ) : ''}
                </td>
                <td className='td_title3'>{purchase.customerName}</td>
                <td className='td_title4'>{purchase.customerCpf}</td>
                <td className='td_title4'>{purchase.customerBadge}</td>
                <td className='td_title5'>{formatDateTime(purchase.date)}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr className='tr_title_total'>
            <th className='th_title'>Total</th>
              <th className='th_total'>
                {/* {purchases.length > 0 && purchases[0].totalValue ? (
                  purchases[0].totalValue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                ) : ''} */}
                {purchases.length > 0 && purchases[0].totalValue ? (
                    parseFloat(purchases[0].totalValue.replace('$', '').replace(',', '.')).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  ) : ''}
                <hr className='hr_line'></hr>
              </th>
              <th className='th_total'></th>
              <th className='th_total'></th>
              <th className='th_total'></th>
              <th className='th_total'></th>
            </tr>
          </thead>
        </table>
      </div>
      {/* {pdfSrc && <iframe src={pdfSrc} title="PDF Viewer" className='pdf_iframe'></iframe>} */}
    </div>
  );
};

export default Relatorio;
