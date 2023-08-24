import "./payment.css";
import qrCode from "../../img/qrCodeCantina.png";

const Pagamento2 = () => {

    return(
        <main>
            
            <h1 className="payment__h__title">Pagamento</h1>

            <h2 className="payment__h__title">Digite o Número do seu CPF:</h2>

            <div>

                <img src={qrCode} alt="Qr Code Cantina"></img>

            </div>
        
        </main>
        
    )

}

export default Pagamento2;