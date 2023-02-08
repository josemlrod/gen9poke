import React from "react";
import { useLoaderData } from "@remix-run/react";

import { getPaldeaPokemonData, type Pokemon } from "~/services";

import { PokemonCard } from "~/components/pokemonCard";

export async function loader() {
  try {
    const paldeaPokemon = await getPaldeaPokemonData();
    return paldeaPokemon;
  } catch (e) {
    console.log(e);
  }
}

export default function Index() {
  const data = useLoaderData();
  return (
    <React.Fragment>
      <h1>Pokedex</h1>
      <div className="grid grid-cols-2 gap-4">
        {data.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </React.Fragment>
  );
}
