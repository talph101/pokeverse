import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';


const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokeman data:", error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="container">
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Pokeverse</Navbar.Brand>
      </Container>
    </Navbar>
      <ul className="list-group">
        {pokemons.map((pokemon, index) => (
          <li key={index} className="list-group-item">
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList