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
  console.log("params: ", params);
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
    <main
      style={{
        backgroundColor: topSectionBgColor,
        height: `calc(100vh - 68px)`,
      }}
    >
      <section
        className="w-full"
        style={{ backgroundColor: topSectionBgColor, height: "45%" }}
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
            className="w-80 lg:w-96 h-80 lg:h-96"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatPokemonId(
              id
            )}.png`}
          />
        </div>
      </section>
      <section
        className="w-full rounded-t-3xl bg-white pt-2"
        style={{ height: "55%" }}
      >
        <nav class="flex border-b border-gray-100 text-sm font-medium justify-center">
          <a href="" class="-mb-px border-b border-current p-4 text-cyan-500">
            About
          </a>

          <a
            href=""
            class="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          >
            Base Stats
          </a>

          <a
            href=""
            class="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          >
            Evolution
          </a>

          <a
            href=""
            class="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          >
            Moves
          </a>
        </nav>

        <p>Second section starts here</p>
        <p>Second section starts here</p>
        <p>Second section starts here</p>
        <p>Second section starts here</p>
        <p>Second section starts here</p>
        <p>Second section starts here</p>
        <p>Second section starts here</p>
        <p>Second section starts here</p>
      </section>
      <Outlet />
    </main>
  );
}
