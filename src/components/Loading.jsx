import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TrooperContext from '../context/TrooperContext';
import './styles/Loading.css';
import BouncingBalls from './BouncingBalls';

function Loading() {
  const [phraseShow, setPhraseShow] = useState(0);
  const { loadLevel } = useContext(TrooperContext);
  const location = useLocation();

  useEffect(() => {
    setPhraseShow(Math.floor(Math.random() * 9));
  }, [loadLevel]);

  const loadPhrases = [
    'Extraindo o cristal Kyber da caverna',
    'Acumulando a Força',
    'Falando Roger Roger',
    'Cantando tantanram enquanto o chefe vader passa no corredor',
    'Bebendo no bar dos Hutts',
    'Caçando alguma recompensa',
    'Falando mal da republica',
    'Correndo de Jedi',
    'Patrulhando sistema imperial',
  ];

  if (location.pathname !== '/') {
    return <BouncingBalls />;
  }

  return (
    <section className="loading">
      <span className="phrase">{loadPhrases[phraseShow]}</span>
      <div className="load-bar">
        <div className="load" style={{ width: loadLevel }} />
      </div>
    </section>
  );
}

export default Loading;
