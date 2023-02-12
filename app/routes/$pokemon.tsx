import React from "react";
import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { type LoaderArgs } from "@remix-run/node";

import PokemonTypes from "~/components/pokemonTypes";

import {
  formatPokemonId,
  getPokemonCardBgColor,
  getPokemonData,
} from "~/services";

export async function loader({ params }: LoaderArgs) {
  const { pokemon: pokemonName } = params;
  const pokemonData = pokemonName && (await getPokemonData(pokemonName));
  return pokemonData;
}

export default function PokemonScreen() {
  const data = useLoaderData();
  console.log(data);
  const { id, name, types } = data;
  const [
    {
      type: { name: pokemonMainTypeName },
    },
  ] = types;
  const topSectionBgColor = getPokemonCardBgColor(pokemonMainTypeName);

  return (
    <main style={{ height: `calc(100vh - 68px)` }}>
      <section
        className="w-full h-2/5"
        style={{ backgroundColor: topSectionBgColor }}
      >
        <div className="flex flex-row justify-between">
          <p className="text-3xl font-bold text-gray-100">{name}</p>
          <p className="font-bold text-gray-100">#{id}</p>
        </div>
        <div className="flex flex-row gap-1">
          <PokemonTypes types={types} />
        </div>
        <div className="flex justify-center">
          <img
            alt="pokemon"
            className="w-96 h-96"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatPokemonId(
              id
            )}.png`}
          />
        </div>
      </section>
      <section className="w-full h-3/5 border border-red-600"></section>
      <Outlet />
    </main>
  );
}
