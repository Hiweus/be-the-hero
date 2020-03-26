import React from 'react';
import "./styles.css";
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();
  

  async function handleRegister(e)
  {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post("/ongs", data);
      alert(`Seu ID de acesso é ${response.data.id}`);
      history.push("/");
    } catch (error) {
      alert("Ocorreu um erro");
    }
  }


  return (
    <div className="register-container">
      <div className="content">

        <section>
          <img src={logoImg} />
          <h1>Cadastro</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur aspernatur iusto vero?</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o Logon
          </Link>
        </section>
        
        
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          
          <input type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
                    
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          
          <div className="input-group">
            <input 
            placeholder="Cidade" 
            value={city}
            onChange={e => setCity(e.target.value)}/>
            
            <input 
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{width:80}}
            />

          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>


      </div>
    </div>
  );
}
