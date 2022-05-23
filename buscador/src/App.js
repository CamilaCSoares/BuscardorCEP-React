import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import {FaMapMarkedAlt} from 'react-icons/fa';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('') // colocando o que está no input dentro da const
  const [cep,setCep] = useState({});

  async function handleSearch(){
    // numerodocep/json  
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    try{ //o que quero que aconteça
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    
    }catch{ // caso de algo de errado
      alert("Ops erro ao buscar");
      setInput("") // fazer com que o input fique com nada (limpo)
    }

  }

  return (
    <div className="container">

      <h1 className="title">Buscador CEP</h1>

      <div className='Map'>
        <FaMapMarkedAlt size={85} color="#FFF"/>
      </div>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        
        <button className='buttonSearch' onClick={handleSearch}> 
          <FiSearch size={25} color="#FFF"/>
        </button>

      </div>

      
      {Object.keys(cep).length > 0 && (
        // se tiver algo dentro o objeto aí sim vai aparecer isso
        <main className='main'>
        <h2>CEP: {cep.cep} </h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>

      </main>
      )}
    
    </div>
  );
}

export default App;
