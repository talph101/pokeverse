import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try{
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");

                setPokemons(response.data.results);
            } catch (error) {
                console.error("Error fetching Pokeman data:", error);

            }

            };

            fetchPokemon();
        }, []);

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <ul className="list-group">
        {pokemons.map((pokemon, index) => (
          <li key={index} className="list-group-item">
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList