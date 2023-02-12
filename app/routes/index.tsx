import React from "react";
import { useLoaderData } from "@remix-run/react";

import { getPaldeaPokemonData, type Pokemon } from "~/services";

import { PokemonCard } from "~/components/pokemonCard";

import data from "~/response.json";

export async function loader() {
  // try {
  //   const paldeaPokemon = await getPaldeaPokemonData();
  //   return paldeaPokemon;
  // } catch (e) {
  //   console.log(e);
  // }
  return null;
}

export default function Index() {
  // const data = useLoaderData();
  // console.log(data);
  return (
    <React.Fragment>
      <h1 className="text-3xl font-bold text-gray-700 my-3">Pokedex</h1>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {data &&
          data.map((pokemon: Pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
    </React.Fragment>
  );
}
