import React,{Fragment,useState,useEffect} from "react";
import Header from "./Components/Header";
import Formulario from "./Components/Formulario";
import ListadoNoticias from "./Components/ListadoNoticias";

function App() {
    //definir la categoria y noticias
    const[categoria,setCategoria]=useState("");
    const[noticias,setNoticias]=useState([]);

    useEffect(()=> {
        const consultarAPI = async() => {
            const url =  `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=ad1d744ddcbb4610bde87af11c5e57d7`

            const respuesta = await fetch(url);
            const noticias = await respuesta.json();

            setNoticias(noticias.articles);
        }
        consultarAPI();
    },[categoria])

  return (
    <Fragment>
        <Header titulo="buscador noticias"/>
        <div className="container white">
            <Formulario
                setCategoria={setCategoria}
            />
            <ListadoNoticias noticias={noticias}/>
        </div>
    </Fragment>
  );
}

export default App;
