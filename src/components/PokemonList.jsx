import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Card, Row, Col, FormControl, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [squad, setSquad] = useState([]); // State for selected squad

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  // Function to add Pokémon to squad (max 6, no duplicates)
  const addToSquad = (pokemon) => {
    if (squad.length < 6 && !squad.some((p) => p.name === pokemon.name)) {
      setSquad([...squad, pokemon]);
    }
  };

  // Function to remove Pokémon from squad
  const removeFromSquad = (pokemon) => {
    setSquad(squad.filter((p) => p.name !== pokemon.name));
  };

  // Filter Pokémon based on search input
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Navbar with Battle Button */}
      <Navbar expand="lg" className="bg-body-tertiary mb-3">
        <Container>
          <Navbar.Brand href="#">Pokeverse</Navbar.Brand>
          <Nav className="ml-auto">
            <Button 
              variant={squad.length >= 2 ? "success" : "secondary"} 
              disabled={squad.length < 2}
            >
              Battle
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search..."
        className="my-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Pokémon List */}
      <Row>
        {filteredPokemons.map((pokemon, index) => (
          <Col key={index} sm={4} md={3} lg={2}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                alt={pokemon.name}
              />
              <Card.Body>
                <Card.Title className="text-center text-capitalize">
                  {pokemon.name}
                </Card.Title>
                <Button 
                  variant={squad.some((p) => p.name === pokemon.name) ? "danger" : "primary"} 
                  onClick={() => 
                    squad.some((p) => p.name === pokemon.name) ? removeFromSquad(pokemon) : addToSquad(pokemon)
                  }
                  className="w-100"
                >
                  {squad.some((p) => p.name === pokemon.name) ? "Remove" : "Add to Squad"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PokemonList;




