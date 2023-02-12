import React from "react";
import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { type LoaderArgs } from "@remix-run/node";

import { getPokemonData } from "~/services";

export async function loader({ params }: LoaderArgs) {
  const { pokemon: pokemonName } = params;
  const pokemonData = pokemonName && (await getPokemonData(pokemonName));
  return {
    pokemon: pokemonData,
  };
}

export default function PokemonScreen() {
  const data = useLoaderData();
  console.log(data);
  return (
    <main style={{ height: `calc(100vh - 68px)` }}>
      <p>Welcome to the pokemon screen</p>
      <Outlet />
    </main>
  );
}
