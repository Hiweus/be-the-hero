import React from "react";

import "./styles.css";

import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import { useState } from "react";
import api from "../../services/api";

export default function NewIncident()
{
    const ongId = localStorage.getItem("ongId");
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [value, setValue] = useState(0.0); 
    const history = useHistory();


    async function handleNewIncident(e)
    {
      e.preventDefault();

      const data = {
        title, description, value
      };

      try {
        await api.post("/incidents", data, {headers:{Authorization:ongId}});
        history.push("/profile");
      } catch (error) {
        alert("Erro ao cadastrar incidente, tente novamente mais tarde.");
        
      }
    }

    return (
        <div className="new-incident-container">
      <div className="content">

        <section>
          <img src={logoImg} />
          <h1>Cadastrar novo caso</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur aspernatur iusto vero?</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        
        
        <form onSubmit={handleNewIncident}>
          <input placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input placeholder="Valor em R$" 
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>


      </div>
    </div>
    );
}