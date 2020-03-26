import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

const NewIncident = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();
  const ong = JSON.parse(localStorage.getItem('ong'));

  const handleNewIncident = e => {
    e.preventDefault();
    const data = { title, description, value };
    api
      .post('/incidents', data, {
        headers: {
          Authorization: ong.id
        }
      })
      .then(() => {
        history.push('/profile');
      })
      .catch(() => {
        alert('Erro ao efetuar o cadastro tente novamente. ');
      });
  };

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />
          <h1>Cadastro novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className='back-link' to='/profile'>
            <FiArrowLeft size={16} color='#e02041' />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder='Titulo do caso'
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
          <textarea
            placeholder='Descrição'
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input
            placeholder='Valor em reais'
            value={value}
            onChange={e => setValue(e.target.value)}
          ></input>

          <button type='submit' className='button'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
