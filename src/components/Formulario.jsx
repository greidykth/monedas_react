import { useEffect, useState } from "react";
import useSelectMonedas from "../hooks/useSelectMonedas";
import Cotizacion from "./Cotizacion";
import Error from "./Error";
import Spinner from "./Spinner";

const monedas = [
    {id: "USD", nombre: "Dolar de Estados Unidos"},
    {id: 'MXN', nombre: 'Peso Mexicano'},
    {id: 'EUR', nombre: 'Euro'},
    {id: 'GBP', nombre: 'Libra Esterlina'}
]

const Formulario = ({
    error, 
    setError, 
    message, 
    setMessage, 
    setMonedas, 
    resultado, 
    setResultado,
    cargando,
    setCargando
    }) => {

    const [criptomonedas, setCriptomonedas] = useState([]);
    const [moneda, SelectMoneda] = useSelectMonedas("Elige tu moneda", monedas);
    const [criptomoneda, SelectCripto] = useSelectMonedas("Elige tu criptomoneda", criptomonedas);

    useEffect(() => {
        setCargando(false);
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        fetch(url)
          .then(response => response.json())
          .then(resultado => {
                const arrayCriptos = resultado.Data.map((cripto) => {
                return {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,

                }
              })
              setCriptomonedas(arrayCriptos)
              })
          .catch((error) => {
              setError(true);
              setMessage("Problema al cargar lista de criptomonedas")
          }) 
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        if([moneda, criptomoneda].includes("")){
            setError(true);
            setMessage("Todos los campos son obligatorios");
            setResultado({});
            return;
        }
        setError(false);
        setMessage("");
        setMonedas({moneda, criptomoneda});

      }

  return (
    <div className="md:w-2/5 m-5">
      <h2 className="text-white font-bold text-4xl text-center mb-20">
        Cotiza Criptomonedas {""}
        <span className="py-1 px-2 after: bg-indigo-400">al instante</span>
      </h2>
      {error && 
        <Error message={message}/>
      }
      <form onSubmit={handleSubmit}>
        <SelectMoneda />
        <SelectCripto />
        <input 
            type="submit" 
            value="COTIZAR"
            className="w-full text-white rounded bg-indigo-400 font-bold text-center mt-2 cursor-pointer p-2 text-lg hover:bg-indigo-500 transition-colors" />
      </form>
      {cargando && <Spinner />}
      {resultado.PRICE &&
      <Cotizacion 
      resultado={resultado}
      />
    }
    </div>
  );
};

export default Formulario;
