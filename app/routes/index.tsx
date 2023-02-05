import { useLoaderData } from "@remix-run/react";

export async function loader() {
  try {
    const { pokemon_entries: pokemonEntries } = await (
      await fetch("https://pokeapi.co/api/v2/pokedex/paldea/")
    ).json();
    return pokemonEntries;
  } catch (e) {
    console.log(e);
  }
}

export default function Index() {
  const data = useLoaderData();
  // console.log(data);
  return <div></div>;
}
