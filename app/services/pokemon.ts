type PokemonEntry = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

type PokemonName = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

export async function fetchPaldeaPokemonIds() {
  try {
    const { pokemon_entries: pokemonEntries } = await (
      await fetch("https://pokeapi.co/api/v2/pokedex/paldea/")
    ).json();

    return pokemonEntries.map((pokemonEntry: PokemonEntry) =>
      getPokemonId(pokemonEntry.pokemon_species.url)
    );
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonSpecies(pokemonId: number) {
  try {
    const {
      color: { name: typeColor },
      id,
      names,
    } = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
    ).json();

    const name = getPokemonName(names);

    return {
      id,
      name,
      typeColor,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getPaldeaPokemonData() {
  const ids = await fetchPaldeaPokemonIds();
  const species = ids.map((id: number) => {
    fetchPokemonSpecies(id).then((species) => species);
  });
  return species;
}

function getPokemonName(names: PokemonName[]) {
  const englishName = names.find((name: PokemonName) => {
    return name.language.name === "en";
  });

  return englishName && englishName.name;
}

function getPokemonId(url: string) {
  const id = url.split("/")[6];
  return Number(id);
}
