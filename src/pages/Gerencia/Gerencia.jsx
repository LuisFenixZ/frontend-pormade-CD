// import React, { useState } from "react";
// import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
// import "./gerencia.css";
// // Cria um estilo para o documento
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4"
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   },
// });

import Relatorio from "../../components/Relatorio/Relatorio";

// // Componente que representa o documento PDF
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Exemplo de Documento PDF com react-pdf</Text>
//       </View>
//     </Page>
//   </Document>
// );

// function Gerencia() {
//   const [mostrarPDF, setMostrarPDF] = useState(false);

//   const abrirRelatorio = () => {
//     setMostrarPDF(true);
//   };

//   const fecharRelatorio = () => {
//     setMostrarPDF(false);
//   };

//   return (
//     <div>
//       {mostrarPDF ? (
//         <div className="document__pdf">
//           <button className="fechar__relatorio" onClick={fecharRelatorio}>Fechar Relatório</button>
//           <PDFViewer width="70%" height={500}>
//             <MyDocument />
//           </PDFViewer>
//         </div>
//       ) : (
//         <button className="abrir__relatorio" onClick={abrirRelatorio}>Visualizar Relatório</button>
//       )}
//     </div>
//   );
// }

// export default Gerencia;

const Gerencia = () => {

  return (
    <Relatorio/>
  )
}

export default Gerencia;
















