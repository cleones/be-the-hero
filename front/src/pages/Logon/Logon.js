import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

const Logon = () => {
  const [id, setId] = useState('');
  const history = useHistory();
  const handleLogin = e => {
    e.preventDefault();
    api
      .post('/login', { id })
      .then(({ data }) => {
        localStorage.setItem('ong', JSON.stringify(data));
        history.push('/profile');
      })
      .catch(e => {
        alert('Falha no login, tente novamente.');
      });
  };
  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder='Sua ID'
            onInput={e => setId(e.target.value)}
          ></input>
          <button className='button' type='submit'>
            Entar
          </button>
          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#e02041' />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt='heroes' />
    </div>
  );
};

export default Logon;
