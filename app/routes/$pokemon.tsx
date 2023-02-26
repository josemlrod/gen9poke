import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { type LoaderArgs } from "@remix-run/node";

import PokemonTypes from "~/components/pokemonTypes";
import PokemonDetailsTab from "~/components/pokemonDetailsTab";

import {
  formatPokemonId,
  getPokemonCardBgColor,
  getPokemonData,
} from "~/services";
import { PokemonDetailsTabs } from "~/components/pokemonDetailsTab";

export async function loader({ params }: LoaderArgs) {
  const { pokemon: pokemonName } = params;
  const pokemonData = pokemonName && (await getPokemonData(pokemonName));
  return pokemonData;
}

export default function PokemonScreen() {
  const data = useLoaderData();
  const { abilities, height, id, name, types, weight } = data;

  const [activeTab, setActiveTab] = useState<string>(PokemonDetailsTabs.ABOUT);

  console.log(data);

  function handleOnActiveTabChange(tabName: string) {
    return function () {
      setActiveTab(tabName);
    };
  }

  const topSectionBgColor =
    types && types.length && getPokemonCardBgColor(types[0].type.name);

  return (
    <main
      style={{
        backgroundColor: topSectionBgColor,
        height: "100vh",
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
        <PokemonDetailsTab
          activeTab={activeTab}
          onTabChange={handleOnActiveTabChange}
        />
      </section>
    </main>
  );
}
