import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

const Profile = () => {
  const ong = JSON.parse(localStorage.getItem('ong'));
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const handleDeleteIncident = id => {
    api
      .delete(`/incidents/${id}`, {
        headers: {
          Authorization: ong.id
        }
      })
      .then(() => {
        setIncidents(incidents.filter(incidente => incidente.id !== id));
      })
      .catch(() => {
        alert('Erro ao deletar caso tente novamente.');
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    api
      .get('/profile', {
        headers: {
          Authorization: ong.id
        }
      })
      .then(({ data }) => {
        setIncidents(data);
      });
  }, [ong.id]);

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Bem vinda, {ong.name}</span>
        <Link className='button' to='/incidents/new'>
          Cadastrar novo caso
        </Link>
        <button onClick={() => handleLogout()} type='button'>
          <FiPower size={18} color='#e02041' />
        </button>
      </header>
      <h1>Caso cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO: </strong>
            <p>{incident.title} </p>

            <strong>DESCRIÇÃO: </strong>
            <p>{incident.description} </p>

            <strong>Valor: </strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button type='button'>
              <FiTrash2
                size={20}
                color='#a8a8b3'
                onClick={() => handleDeleteIncident(incident.id)}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
