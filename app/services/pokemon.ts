import type {
  AllPokemonResponse,
  Pokemon,
  PokemonEntry,
  PokemonName,
} from "./index";

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

export async function fetchAllPokemon(
  nextFetchUrl?: string
): Promise<AllPokemonResponse> {
  try {
    const { next, results } = await (
      await fetch(nextFetchUrl || "https://pokeapi.co/api/v2/pokemon")
    ).json();
    return {
      next,
      pokemon: results,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonDataById(pokemonId: number) {
  try {
    const { abilities, height, moves, stats, types, weight } = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    ).json();

    return {
      abilities,
      height,
      moves,
      stats,
      types,
      weight,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonDataByName(pokemonName: string) {
  // lycanroc is not found
  try {
    const { abilities, height, moves, stats, types, weight } = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    ).json();

    const formatHeight = (height: number) => {
      const stringHeight = height.toString();
      const formattedHeight = stringHeight.split("").map((str, index) => {
        if (stringHeight.length - 1 === index) {
          if (stringHeight.length === 1) {
            return `0.${str} m`;
          }

          return `.${str} m`;
        }
        return str;
      });

      return formattedHeight;
    };

    const formatWeight = (weight: number) => {
      const stringWeight = weight.toString();
      const formattedWeight = stringWeight
        .split("")
        .map((str, index) => {
          if (stringWeight.length - 1 === index) {
            return `.${str} kg`;
          }
          return str;
        })
        .join("");

      return formattedWeight;
    };

    return {
      abilities,
      height: formatHeight(height),
      moves,
      stats,
      types,
      weight: formatWeight(weight),
    };
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonSpeciesById(pokemonId: number) {
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

export async function fetchPokemonSpeciesByName(pokemonName: string) {
  try {
    const {
      color: { name: typeColor },
      id,
      names,
    } = (await (
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
    ).json()) || {};

    const name = getPokemonName(names);
    const formattedId = id.toString().padStart(3, "0");

    return {
      id: formattedId,
      name,
      typeColor,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getPaldeaPokemonData() {
  const ids = await fetchPaldeaPokemonIds();
  const species = Promise.all(
    ids.map(async (id: number) => {
      return {
        ...(await fetchPokemonSpeciesById(id)),
        ...(await fetchPokemonDataById(id)),
      };
    })
  );

  return species;
}

export async function getPokemonData(pokemonName: string) {
  return {
    ...(await fetchPokemonSpeciesByName(pokemonName)),
    ...(await fetchPokemonDataByName(pokemonName)),
  };
}

export async function getAllPokemonData(nextPageQuery?: string): Promise<{
  next: string;
  pokemon: Pokemon[];
}> {
  const { next, pokemon } = await fetchAllPokemon(nextPageQuery || "");
  const pokemonData = await Promise.all(
    pokemon.map(async ({ name }) => {
      return {
        ...(await getPokemonData(name)),
      };
    })
  );

  return {
    next,
    pokemon: pokemonData,
  };
  // const pokemonData = Promise.all(
  // allPokemon.map(async ({ name }) => {
  //   return {
  //     ...(await getPokemonData(name)),
  //   };
  // });
  // );

  // const pokemonData = Promise.all(
  //   response.result.map(async (response.pokemon) => {
  //     return {
  //       ...(await getPokemonData(pokemon.name))
  //     }
  //   })
  // )

  // return {
  //   next,
  //   pokemon: pokemonData,
  // };
}

function getPokemonName(names: PokemonName[]) {
  const { name } =
    names.find((name: PokemonName) => {
      return name.language.name === "en";
    }) || {};

  return name;
}

function getPokemonId(url: string) {
  const id = url.split("/")[6];
  return Number(id);
}
