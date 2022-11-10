import { useState } from "react"

const Sobre = () => {

    const [contador, setContador] = useState(0)

    return(
        <div>
            Página Sobre ({contador})<br></br>
            
            <ul>
                <li><a href="/sobre/well">Wellington</a></li>
                <li><a href="/sobre/nanda">Nanda Lira</a></li>
            </ul>
            
            <br></br>

            <button onClick={() => setContador(contador + 1)}>Aumentar</button>
        </div>
    )
}

export default Sobre