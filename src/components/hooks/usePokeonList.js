// customhook 
import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
        nextUrl: "",
        prevUrl: "",
      });
      async function downloadPokemons() {
        // Set loading state to true
        setPokemonListState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
    
        try {
          const response = await axios.get(pokemonListState.pokedexUrl);
          const pokemonResults = response.data.results;
          const nextUrl = response.data.next;
          const prevUrl = response.data.previous;
    
          // Fetch detailed data for each pokemon concurrently
          const pokemonData = await axios.all(
            pokemonResults.map((pokemon) => axios.get(pokemon.url))
          );
    
          const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.other
                ? pokemon.sprites.other.dream_world.front_default
                : pokemon.sprites.front_shiny,
              types: pokemon.types,
            };
          });
    
          // Update the state with new pokemon data
          setPokemonListState((prevState) => ({
            ...prevState,
            pokemonList: pokeListResult,
            isLoading: false,
            nextUrl,
            prevUrl,
          }));
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
          setPokemonListState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        }
      }
      useEffect(() => {
        downloadPokemons();
      }, [pokemonListState.pokedexUrl]);

      return{pokemonListState, setPokemonListState

      }
}
export default usePokemonList