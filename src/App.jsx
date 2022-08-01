import { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import Imagen from './components/Imagen'

function App() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    const {moneda, criptomoneda} = monedas;

      const cotizarCriptos = () => {
        setResultado({});
        setError(false);
      if(Object.keys(monedas).length > 0) {
        setCargando(true);
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        fetch(url)
          .then(response => response.json())
          .then(respuesta => {
            setResultado(respuesta.DISPLAY[criptomoneda][moneda]);
            setCargando(false)
          })
          .catch((error) => {
            setResultado({});
            setError(true);
            setMessage("Problema al consultar cotización");
            setTimeout(() => {
              setCargando(false);
            }, 2000);
          })
      }
    }

    cotizarCriptos();
    
  }, [monedas])
  

  return (
    <div className="container mx-auto mt-28 md:flex justify-center">
      <Imagen />
      <Formulario 
        error={error}
        setError={setError}
        message={message}
        setMessage={setMessage}
        setMonedas={setMonedas}
        resultado={resultado}
        setResultado={setResultado}
        cargando={cargando}
        setCargando={setCargando}
      />
    </div>
  )
}

export default App
