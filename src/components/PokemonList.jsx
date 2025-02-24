import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Card, Row, Col, FormControl } from 'react-bootstrap';
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
      <FormControl
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
            onChange={e => setSearchTerm(e.target.value)}
          />
      <Row>
        {pokemons.map((pokemon, index) => (
          <Col key={index} sm={4} md={3} lg={2}>
            <Card className="mb-4">
              <Card.Img 
                variant="top" 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} 
                alt={pokemon.name}
              />
              <Card.Body>
                <Card.Title className="text-center">{pokemon.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PokemonList