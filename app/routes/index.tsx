import { useLoaderData } from "@remix-run/react";

import { getPaldeaPokemonData } from "~/services";

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
  console.log(data);
  return (
    <>
      <h1>Pokedex</h1>
      <div>Pokemon cards go here</div>
      <PokemonCard pokemon={data[0]} />
    </>
  );
}
