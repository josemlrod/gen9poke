import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { type LoaderArgs } from "@remix-run/node";

import PokemonTypes from "~/components/pokemonTypes";

import {
  formatPokemonId,
  getPokemonCardBgColor,
  getPokemonData,
} from "~/services";
import PokemonDetailsTab from "~/components/pokemonDetailsTab";

export async function loader({ params }: LoaderArgs) {
  // const { pokemon: pokemonName } = params;
  console.log(params);
  // const pokemonData = pokemonName && (await getPokemonData(pokemonName));
  return { something: true };
}

export default function PokemonScreen() {
  const data = useLoaderData();
  const { id, name, types } = data;

  const topSectionBgColor =
    types && types.length && getPokemonCardBgColor(types[0].type.name);

  return (
    <main
      style={{
        backgroundColor: topSectionBgColor,
        height: `calc(100vh - 68px)`,
      }}
    >
      {/* <section
        className="w-full"
        style={{ backgroundColor: topSectionBgColor, height: "45%" }}
      >
        <div className="flex flex-row justify-between">
          <p className="text-3xl font-bold text-gray-100">{name}</p>
          <p className="font-bold text-gray-100">#{id}</p>
        </div>
        <div className="flex flex-row gap-1">
          {types && types.length && <PokemonTypes types={types} />}
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
        <PokemonDetailsTab pokemonName={name} />
        <Outlet />
      </section> */}
      PokemonScreen
    </main>
  );
}
