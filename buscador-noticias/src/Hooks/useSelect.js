import React,{useState} from "react";

const useSelect = (stateInicial,opciones) => {
    const [state,actualizarState]=useState(stateInicial);


    const SelectNoticias = () => {
        return(
        <select className="browser-default" value={state} onChange={(event) => {
            actualizarState(event.target.value);
        }}>
            {opciones.map((opcion) => {
                return(
                    <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                );
            })}
        </select>
        );
    }

    return [state,SelectNoticias];
}

export default useSelect;
