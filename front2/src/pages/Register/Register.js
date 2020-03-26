import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  const handleRegistert = e => {
    e.preventDefault();
    const data = { name, email, whatsapp, city, uf };
    api
      .post('/ongs', data)
      .then(({ data }) => {
        alert(`Sou ID é ${data.id}`);
        history.push('/');
      })
      .catch(() => {
        console.log('Erro ao efetuar o cadastro');
      });
  };
  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#e02041' />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegistert}>
          <input
            placeholder='Nome ONG'
            value={name}
            onChange={e => setName(e.target.value)}
          ></input>
          <input
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></input>
          <input
            placeholder='WhatsApp'
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          ></input>
          <div className='input-group'>
            <input
              placeholder='Cidade'
              value={city}
              onChange={e => setCity(e.target.value)}
            ></input>
            <input
              placeholder='UF'
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            ></input>
          </div>
          <button type='submit' className='button'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
