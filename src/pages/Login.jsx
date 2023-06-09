import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import requester from '../helpers/requester';
import './styles/Login.css';
import TrooperContext from '../context/TrooperContext';
import Loading from '../components/Loading';

function Login() {
  const [loginInputs, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const [showError, setShowError] = useState(false);
  const { loading, setLoading } = useContext(TrooperContext);
  const navigate = useNavigate();

  const handleChangeLogin = (event) => {
    const { id, value } = event.target;
    setLoginInput({
      ...loginInputs,
      [id]: value,
    });

    if (showError) setShowError(false);
  };

  const handleClickLogin = async () => {
    setLoading(true);

    const response = await requester('authorization', 'login', {
      email: loginInputs.email,
      password: loginInputs.password,
    });

    if (response === 400) {
      setShowError(true);
      return;
    }

    const userData = response.data;
    const userToken = response.headers.authorization;

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);

    setLoading(false);
    navigate('/');
  };

  const handleClickToGoBack = () => navigate('/');

  return (
    <section className="login-section">
      <button
        type="button"
        onClick={handleClickToGoBack}
        className="login-back-button"
      >
        <span className="material-icons-outlined arrow-back">arrow_back_ios</span>
      </button>
      <div className="login-header">
        <h2>Login</h2>
        <div>
          <span>Novo neste site?</span>
          <a href="/register">Registre-se</a>
        </div>
      </div>
      {showError && <span className="error-msg">* Algo deu errado, verifique as informações abaixo !</span>}
      <form className="login-body">
        <label htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            type="text"
            onChange={handleChangeLogin}
            value={loginInputs.email}
          />
        </label>
        <label htmlFor="password" className="password-field">
          <span>Senha</span>
          <span className="password-help">
            Minimo de 8 caracteres, ao menos uma letra minuscula e maiuscula, e um numero.
          </span>
          <div>
            <input
              id="password"
              className="password-field-input"
              type="password"
              onChange={handleChangeLogin}
              value={loginInputs.password}
            />
          </div>
        </label>
      </form>
      <button
        type="button"
        onClick={handleClickLogin}
      >
        {loading ? <Loading /> : 'Login'}
      </button>
    </section>
  );
}

export default Login;
