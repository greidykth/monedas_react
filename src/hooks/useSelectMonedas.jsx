import { useState } from "react";

const useSelectMonedas = (label, opciones) => {
  
    const [state, setState] = useState("");

    const SelectMoneda = () => (
    <>
      <label className="text-white text-2xl font-bold block mb-2">{label}</label>
      <select 
        className="w-full text-xl rounded p-2 mb-2"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option value="">--Seleccionar--</option>
        {opciones.map((opcion) => (
        <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
        ))}
      </select>
    </>
    );

  return [state, SelectMoneda];
};

export default useSelectMonedas;
