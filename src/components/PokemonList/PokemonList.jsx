import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../hooks/usePokeonList";

function PokemonList() {
  //customhook
  const { pokemonListState, setPokemonListState } = usePokemonList();

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={!pokemonListState.prevUrl}
          onClick={() =>
            setPokemonListState((prevState) => ({
              ...prevState,
              pokedexUrl: prevState.prevUrl,
            }))
          }
        >
          Prev
        </button>
        <button
          disabled={!pokemonListState.nextUrl}
          onClick={() =>
            setPokemonListState((prevState) => ({
              ...prevState,
              pokedexUrl: prevState.nextUrl,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
