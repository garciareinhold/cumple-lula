import './App.css';
import { useEffect, useState } from 'react';
import pokeball from './icons8-pokeball-48.png';


function App() {

  const [pokemon, setPokemon] = useState('');

  const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const getRemainingDays = () => {
    const date1 = new Date();
    const date2 = new Date('11/04/2022');
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const getPokemonImg = () => {
    return pokemon?.sprites?.front_default || pokeball;
  }

  useEffect(() => {
    const days = getRemainingDays()
    fetch(`${ pokeApiUrl }${ days }`)
      .then((response) => response.json())
      .then((poke) => {
        setTimeout(() => {
          setPokemon(poke)
        }, 1500);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
       <p> Faltan { getRemainingDays() } dias </p>
        <img src={getPokemonImg()} className="App-logo" alt="logo" />
        <p>{ pokemon?.name?.toUpperCase() || 'Cargando...' }</p>
      </header>
    </div>
  );
}

export default App;