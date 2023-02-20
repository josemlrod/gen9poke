import React, { useState } from "react";
import { useLoaderData } from "@remix-run/react";

import { getAllPokemonData, type Pokemon } from "~/services";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";

import PokemonCard from "~/components/pokemonCard";

export async function loader() {
  const { next, pokemon: allPokemon } = await getAllPokemonData();
  return { next, allPokemon };
}

export default function Index() {
  const { next, allPokemon } = useLoaderData();
  const [pokemon, setPokemon] = useState(allPokemon);
  const [nextPageQuery, setNextPageQuery] = useState(next);

  const handlePagination = async () => {
    const { next, pokemon } = await getAllPokemonData(nextPageQuery);
    setPokemon((prevPokemon) => [...prevPokemon, ...pokemon]);
    setNextPageQuery(next);
  };

  const lastEntryRef = useInfiniteScroll({
    nextPageUrl: next,
    onEntryIntersection: handlePagination,
  });

  return (
    <React.Fragment>
      <h1 className="text-3xl font-bold text-gray-700 my-3">Pokedex</h1>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {pokemon &&
          pokemon.map((p: Pokemon, index: number) => {
            const isLastListItem = pokemon.length - 1 === index;
            return (
              <PokemonCard
                key={p.id}
                pokemon={p}
                ref={isLastListItem ? lastEntryRef : undefined}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
}
