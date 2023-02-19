import React from "react";
import { useLoaderData } from "@remix-run/react";

import { getAllPokemonData, type Pokemon } from "~/services";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";

import PokemonCard from "~/components/pokemonCard";

// import data from "~/response.json";

export async function loader() {
  const { next, pokemon: allPokemon } = await getAllPokemonData();
  return { next, allPokemon };
}

export default function Index() {
  const { next, allPokemon } = useLoaderData();

  const handlePagination = () => {
    console.log("reached last entry");
    console.log("should fetch now");
  };

  const lastEntryRef = useInfiniteScroll({
    nextPageUrl: next,
    onEntryIntersection: handlePagination,
  });

  return (
    <React.Fragment>
      <h1 className="text-3xl font-bold text-gray-700 my-3">Pokedex</h1>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {allPokemon &&
          allPokemon.map((pokemon: Pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              ref={lastEntryRef}
            />
          ))}
      </div>
    </React.Fragment>
  );
}
