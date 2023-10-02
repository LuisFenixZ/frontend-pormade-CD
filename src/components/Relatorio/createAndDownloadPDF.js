import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export async function createAndDownloadPDFReport({ title = "", data = [] }) {

  /* 
  ** FORMATO DOS DADOS DA TABELA DEVE SER: **

  ** CHAMAR A FUNÇÃO NO REACT**
  import { createAndDownloadPDFReport } from '../caminho-funcao'

  const [pdfDtaUrl, setPdfDtaUrl] = useState()

  setPdfDtaUrl(await createAndDownloadPDFReport({
     title = "Título do relatório",
     data = data
  }))

  <iframe
    src={pdfDtaUrl}
    className="h-screen w-full mt-10"
  ></iframe>

  */

  const dados = [
    ["ID", id],
    ["Valor", value],
    ["Nome do Colaborador", customerName],
    ["CPF do Colaborador", customerCpf],
    ["Crachá", customerBadge],
    ["Data", date],
  ] 

  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const header = [{
    text: `Relatório ${title}`,
    fontSize: 18,
    bold: true,
    margin: [15, 20, 0, 45]
  }]

  const body = [
    {
      text: "Exemplo texto simple.\n'\\n' é utilidao para quebrar linha \n\n => quebra de linha",
    },
    {
      text: [
        'Estilizar texto em um único objeto: ',
        { text: 'Vermelho', color: 'red' },
      ],
    },

    {
      text: 'Link',
      link: 'http://192.168.92.170:4173',
      color: 'blue',
      decoration: 'underline',
    },

    { text: `${new Date().toLocaleString('pt-BR')}`, style: 'subHeader' },

    // ** DADOS DA DA TABELA **
    dados.length > 0 ?
      {
        table: {
          layout: 'headerLineOnly',
          widths: ['*', '*'],
          style: 'dataTable',
          body: dados
        }
      } : null,


  ]

  const footer = [{ text: 'Pormade Portas', style: 'footer' }]

  const styles = {
    ...customStyles, header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 2]
    },
    subHeader: {
      fontSize: 12,
      bold: false,
      margin: [0, 0, 0, 15]
    },
    footer: {
      fontSize: 10,
      bold: false,
      alignment: 'right',
      margin: [15, 0, 15, 0]
    }
  }

  const docConfigs = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [header],
    content: [body],
    footer: [footer],
    styles: styles
  }



  const pdfDocGenerator = pdfMake.createPdf(docConfigs);


  pdfDocGenerator.download(docName);


  // ** RETORNA O BASEURL PARA INSERIR NO src={useState} DO IFRAME **
  return new Promise((resolve) => {
    pdfDocGenerator.getDataUrl(async data => {
      resolve(data)
    })
  })

}

/*

     https://pdfmake.github.io/docs/
     http://pdfmake.org/playground.html
     https://pdfmake.github.io/docs/0.1/document-definition-object/styling/

     font: string: name of the font

     fontSize: number: size of the font in pt

     fontFeatures: string[]: array of advanced typographic features supported in TTF fonts (supported features depend on font file)

     lineHeight: number: the line height (default: 1)

     bold: boolean: whether to use bold text (default: false)

     italics: boolean: whether to use italic text (default: false)

     alignment: string: (‘left’ or ‘center’ or ‘right’ or ‘justify’) the alignment of the text

     characterSpacing: number: size of the letter spacing in pt

     color: string: the color of the text (color name e.g., ‘blue’ or hexadecimal color e.g., ‘#ff5500’)

     background: string the background color of the text

     markerColor: string: the color of the bullets in a buletted list

     decoration: string: the text decoration to apply (‘underline’ or ‘lineThrough’ or ‘overline’)

     decorationStyle: string: the style of the text decoration (‘dashed’ or ‘dotted’ or ‘double’ or ‘wavy’)

     decorationColor: string: the color of the text decoration, see color

*/