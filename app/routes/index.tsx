import React, { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";

import { getAllPokemonData, type Pokemon } from "~/services";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";

import PokemonCard from "~/components/pokemonCard";
import type { LoaderArgs } from "@remix-run/node";

export async function loader({ params, request }: LoaderArgs) {
  const url = new URL(request.url);
  const nextPageQuery = url.searchParams.get("n") || "";

  const { next, pokemon: allPokemon } = await getAllPokemonData(nextPageQuery);
  return { next, allPokemon };
}

export default function Index() {
  const { next, allPokemon } = useLoaderData<{
    next: string;
    allPokemon: Pokemon[];
  }>();
  const fetcher = useFetcher();

  const [pokemon, setPokemon] = useState<Pokemon[]>(allPokemon);
  const [nextPageQuery, setNextPageQuery] = useState<string>(next);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") {
      return;
    }

    if (fetcher.data) {
      setPokemon((prevPokemon) => [...prevPokemon, ...fetcher.data.allPokemon]);
      setNextPageQuery(fetcher.data.next);
    }
  }, [fetcher.data]);

  const loadNext = () => {
    if (fetcher.state === "loading") {
      return;
    }

    const pageQuery = `?index&n=${
      fetcher.data ? fetcher.data.next : nextPageQuery
    }`;
    fetcher.load(pageQuery);
  };

  const lastEntryRef = useInfiniteScroll({
    nextPageUrl: next,
    onEntryIntersection: loadNext,
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
