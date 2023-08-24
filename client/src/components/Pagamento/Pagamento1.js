import Keypad from "../Keypad/Keyboard";
import "./payment.css";

const Pagamento1 = () => {

    return(
        <main>
            
            <h1 className="payment__h1__title">Pagamento</h1>

            <h2 className="payment__h2__title">Digite o Número do seu CPF:</h2>

            <div>

                <Keypad></Keypad>

                <button className="button-continue">Continuar</button>

            </div>
        
        </main>
        
    )

}

export default Pagamento1;